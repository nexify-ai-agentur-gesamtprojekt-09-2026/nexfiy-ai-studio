"""TEILEKLAR: Produktfotos mit weißem Grund freistellen und als getrennte WebP-Fassung hochladen.

Die Originale bleiben unverändert. Ein Foto wird nur freigestellt, wenn der Bildrand zu mindestens
90 % weiß ist und der Grundanteil plausibel ist (12–97 %); alles andere wird ausgelassen und im
Bericht begründet. Es ist eine konservative Flutfüllung vom Rand, keine KI-Freistellung.

Ablauf:
  1. orig/<artikel>.jpg ablegen (aktuelle Originale) und list.json mit {"rows":[{"id","image_path"}]}
     erzeugen; image_path bindet die Freistellung an genau dieses Original.
  2. python3 scripts/teileklar_cutout.py freistellen        -> out/<artikel>.webp, report.json
  3. NEXIFY_ADMIN_TOKEN=<Sitzung eines Admin-Kontos> \
     python3 scripts/teileklar_cutout.py hochladen https://nexifyai.de
     Die Route /api/public/shop/cutout prüft Anmeldung und Admin-Rolle selbst.
"""

import glob, json, sys, numpy as np
from PIL import Image
from scipy import ndimage

SEED = 236      # ab dieser Helligkeit (kleinster Kanal) gilt ein Randpixel als Grund
CLEAR = 250     # ab hier vollständig durchsichtig
SOFT = 205      # unterhalb: vollständig deckend
MAX_SIDE = 900

def cutout(path):
    rgb = np.asarray(Image.open(path).convert("RGB"), dtype=np.float32)
    h, w, _ = rgb.shape
    lum = rgb.min(axis=2)
    border = np.concatenate([lum[0], lum[-1], lum[:, 0], lum[:, -1]])
    border_white = float((border >= SEED).mean())
    cand = lum >= SEED
    lab, _ = ndimage.label(cand)
    edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    edge = edge[edge > 0]
    region = np.isin(lab, edge)
    # Eingeschlossene Weißflächen (z. B. Ring-Innenraum) nur, wenn sie groß und fast reinweiß sind
    inner_lab, n_inner = ndimage.label((lum >= 249) & ~region)
    if n_inner:
        sizes = ndimage.sum(np.ones_like(lum), inner_lab, index=np.arange(1, n_inner + 1))
        big = np.where(sizes >= 0.0012 * h * w)[0] + 1
        if len(big):
            region |= np.isin(inner_lab, big)
    bg_share = float(region.mean())
    # Übergangszone: 3 px um den Grund herum dürfen weich auslaufen
    band = ndimage.binary_dilation(region, iterations=3)
    soft = np.clip((CLEAR - lum) / (CLEAR - SOFT), 0, 1)
    alpha = np.where(band, soft, 1.0)
    alpha = np.where(region & (lum >= CLEAR), 0.0, alpha)
    alpha = ndimage.gaussian_filter(alpha, 0.6)
    alpha = np.where(band, alpha, 1.0)
    a = alpha[..., None]
    safe = np.maximum(a, 0.05)
    color = np.clip((rgb - 255.0 * (1 - safe)) / safe, 0, 255)
    color = np.where(a > 0.98, rgb, color)
    rgba = np.dstack([color, alpha * 255]).astype(np.uint8)
    ys, xs = np.where(alpha > 0.04)
    if len(xs) == 0:
        return None, dict(border_white=border_white, bg_share=bg_share, ok=False, reason="leer")
    pad = int(0.04 * max(h, w))
    x0, x1 = max(0, xs.min() - pad), min(w, xs.max() + pad + 1)
    y0, y1 = max(0, ys.min() - pad), min(h, ys.max() + pad + 1)
    img = Image.fromarray(rgba, "RGBA").crop((x0, y0, x1, y1))
    scale = min(1.0, MAX_SIDE / max(img.size))
    if scale < 1:
        img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    ok = border_white >= 0.9 and 0.12 <= bg_share <= 0.97
    reason = "" if ok else ("Rand nicht weiß" if border_white < 0.9 else "Grundanteil untypisch")
    return img, dict(border_white=round(border_white, 3), bg_share=round(bg_share, 3), ok=ok, reason=reason)

def work(f):
    art = f.split("/")[-1][:-4]
    img, info = cutout(f)
    if img is not None and info["ok"]:
        img.save(f"out/{art}.webp", "WEBP", quality=84, method=4)
    return art, info


def hochladen(base_url, ids):
    import concurrent.futures, os, urllib.error, urllib.parse, urllib.request
    token = os.environ["NEXIFY_ADMIN_TOKEN"]
    rows = {r["id"]: r["image_path"] for r in json.load(open("list.json"))["rows"]}

    def send(art):
        data = open(f"out/{art}.webp", "rb").read()
        q = urllib.parse.urlencode({"artikel": art, "quelle": rows[art]})
        req = urllib.request.Request(f"{base_url.rstrip('/')}/api/public/shop/cutout?{q}", data=data,
                                     method="POST", headers={"Authorization": "Bearer " + token,
                                                             "Content-Type": "image/webp"})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return art, r.status
        except urllib.error.HTTPError as e:
            return art, e.code

    with concurrent.futures.ThreadPoolExecutor(6) as ex:
        res = list(ex.map(send, ids))
    failed = [r for r in res if r[1] != 200]
    print("hochgeladen:", len(res) - len(failed), "von", len(res), "| fehlgeschlagen:", failed[:10])
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    import os
    from multiprocessing import Pool
    mode = sys.argv[1] if len(sys.argv) > 1 else ""
    if mode == "freistellen":
        files = sorted(glob.glob("orig/*.jpg"))
        with Pool(os.cpu_count() or 4) as pool:
            report = dict(pool.map(work, files, chunksize=4))
        json.dump(report, open("report.json", "w"), indent=1)
        ok = sum(1 for v in report.values() if v["ok"])
        print("freigestellt:", ok, "von", len(report), "| ausgelassen:",
              {k: v["reason"] for k, v in report.items() if not v["ok"]})
    elif mode == "hochladen" and len(sys.argv) > 2:
        hochladen(sys.argv[2], sorted(f[:-5] for f in os.listdir("out")))
    else:
        sys.exit("Aufruf: teileklar_cutout.py freistellen | hochladen <basis-url>")
