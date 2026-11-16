import { ImageOff } from "lucide-react";
import {
  catalogImageUrl,
  catalogProductPath,
  formatPriceRange,
  groupAvailabilityLabel,
} from "@/lib/teileklar-catalog";
import type { CatalogGroupItem } from "@/lib/teileklar-catalog.functions";

const COUNT = new Intl.NumberFormat("de-DE");

export function CatalogImage({
  id,
  path,
  cutout = "",
  alt,
  eager = false,
}: {
  id: string;
  path: string;
  /** Freigestellte Fassung; ohne sie wird das Original auf der hellen Studiofläche gezeigt. */
  cutout?: string;
  alt: string;
  eager?: boolean;
}) {
  const url = catalogImageUrl(id, cutout || path);
  if (!url)
    return (
      <div className="tkc-image is-empty" aria-hidden="true">
        <ImageOff size={28} strokeWidth={1.5} />
        <span>Kein Produktfoto</span>
      </div>
    );
  return (
    <div className="tkc-image" data-cutout={cutout ? "" : undefined}>
      <img
        src={url}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        width={400}
        height={300}
      />
    </div>
  );
}

export function CatalogCard({ item }: { item: CatalogGroupItem }) {
  const price = formatPriceRange(item.min_price, item.max_price);
  return (
    <article className="tkc-card">
      <a className="tkc-card-link" href={catalogProductPath(item.id)}>
        <CatalogImage
          id={item.id}
          path={item.image_path}
          cutout={item.image_cutout}
          alt={item.image_alt}
        />
        <span className="tkc-card-brand">{item.brand || item.category}</span>
        <h3 className="tkc-card-name">{item.name}</h3>
      </a>
      <p className="tkc-card-price">
        {price ?? "Preis auf Anfrage"}
        {price ? <small>inkl. MwSt., zzgl. Versand</small> : null}
      </p>
      {item.variant_count > 1 ? (
        <p className="tkc-card-variants">{COUNT.format(item.variant_count)} Ausführungen</p>
      ) : null}
      <p className="tkc-card-stock" data-available={item.stock > 0 || item.in_stock || undefined}>
        {groupAvailabilityLabel(item)}
      </p>
    </article>
  );
}
