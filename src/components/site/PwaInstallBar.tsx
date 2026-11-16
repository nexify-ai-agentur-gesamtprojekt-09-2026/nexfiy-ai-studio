import { useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Download, Monitor, Smartphone, Tablet, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePwaInstall } from "@/lib/use-pwa-install";

export function PwaInstallBar() {
  const { device, installed, installing, canPrompt, dismissed, install, dismiss, restore } =
    usePwaInstall();
  const [helpOpen, setHelpOpen] = useState(false);
  const installButtonRef = useRef<HTMLButtonElement>(null);
  const [notice, setNotice] = useState<"accepted" | "dismissed" | "error" | null>(null);

  const startInstall = async () => {
    setNotice(null);
    if (!canPrompt) {
      setHelpOpen(true);
      return;
    }
    const outcome = await install();
    if (outcome === "unavailable") {
      setHelpOpen(true);
      return;
    }
    setNotice(outcome);
    if (outcome === "error") setHelpOpen(true);
  };

  if (installed) return null;
  return (
    <section className="pwa-install-band" aria-label="NeXify als App installieren">
      {dismissed ? (
        <div className="pwa-install-collapsed">
          <Button variant="ghost" className="pwa-install-secondary" onClick={restore}>
            <Download aria-hidden="true" />
            App installieren
          </Button>
        </div>
      ) : (
        <div className="pwa-install-bar">
          <img
            className="pwa-install-mark"
            src="/site-assets/9176c58a16ff634a.png"
            alt=""
            width="56"
            height="56"
            loading="lazy"
            decoding="async"
          />
          <div className="pwa-install-copy">
            <h2>NeXify AI als App installieren</h2>
            <p>Direkt vom Startbildschirm öffnen. Die Nutzung benötigt eine Internetverbindung.</p>
            <div className="pwa-install-devices" role="group" aria-label="Geräte">
              <span>
                <Smartphone aria-hidden="true" />
                Smartphone
              </span>
              <span>
                <Tablet aria-hidden="true" />
                Tablet
              </span>
              <span>
                <Monitor aria-hidden="true" />
                Computer
              </span>
            </div>
            {notice && (
              <p
                className="pwa-install-note"
                role="status"
                data-tone={notice === "error" ? "error" : undefined}
              >
                {notice === "accepted"
                  ? "Installation im Browser bestätigt."
                  : notice === "dismissed"
                    ? "Installation abgebrochen. Sie können es später über das Browsermenü erneut versuchen."
                    : "Die Installation konnte nicht geöffnet werden. Nutzen Sie die Hinweise für Ihr Gerät."}
              </p>
            )}
          </div>
          <div className="pwa-install-actions">
            <Button
              ref={installButtonRef}
              variant="brand"
              size="xl"
              onClick={startInstall}
              disabled={installing}
            >
              <Download aria-hidden="true" />
              {installing
                ? "Browser geöffnet …"
                : canPrompt
                  ? "Installieren"
                  : device === "ios"
                    ? "Zum Startbildschirm"
                    : "App installieren"}
            </Button>
            <Button variant="ghost" className="pwa-install-secondary" onClick={dismiss}>
              Nicht jetzt
            </Button>
          </div>
        </div>
      )}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogPortal>
          <DialogOverlay className="pwa-install-overlay" />
          <DialogPrimitive.Content
            className="pwa-install-dialog"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              installButtonRef.current?.focus({ preventScroll: true });
            }}
          >
            <div className="pwa-install-dialog-header">
              <div>
                <DialogTitle>NeXify auf Ihrem Gerät</DialogTitle>
                <DialogDescription>
                  Installation und Verfügbarkeit hängen von Ihrem Browser ab.
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="pwa-install-close"
                  aria-label="Installationshinweise schließen"
                  title="Schließen"
                >
                  <X aria-hidden="true" />
                </Button>
              </DialogClose>
            </div>
            <Tabs defaultValue={device}>
              <TabsList className="pwa-install-tabs" aria-label="Gerät auswählen">
                <TabsTrigger value="ios">iPhone / iPad</TabsTrigger>
                <TabsTrigger value="android">Android</TabsTrigger>
                <TabsTrigger value="desktop">Computer</TabsTrigger>
              </TabsList>
              <TabsContent value="ios">
                <ol className="pwa-install-steps">
                  <li>
                    Öffnen Sie NeXify in Safari, nicht in der eingebetteten Vorschau oder einem
                    anderen App-Fenster.
                  </li>
                  <li>Öffnen Sie das Teilen-Menü und wählen Sie „Zum Home-Bildschirm“.</li>
                  <li>
                    Falls angeboten, aktivieren Sie „Als Web-App öffnen“. Bestätigen Sie mit
                    „Hinzufügen“.
                  </li>
                </ol>
              </TabsContent>
              <TabsContent value="android">
                <ol className="pwa-install-steps">
                  <li>
                    Öffnen Sie NeXify direkt in Chrome oder einem Browser mit App-Installation.
                  </li>
                  <li>
                    Wählen Sie im Browsermenü „App installieren“ oder „Zum Startbildschirm
                    hinzufügen“.
                  </li>
                  <li>
                    Bestätigen Sie die Auswahl. Je nach Browser wird eine App oder eine Verknüpfung
                    hinzugefügt.
                  </li>
                </ol>
              </TabsContent>
              <TabsContent value="desktop">
                <ol className="pwa-install-steps">
                  <li>Öffnen Sie NeXify direkt in Chrome oder Edge.</li>
                  <li>
                    Wählen Sie das Installationssymbol in der Adressleiste oder „Diese Seite als App
                    installieren“ im Browsermenü.
                  </li>
                  <li>
                    Auf dem Mac mit Safari können Sie stattdessen „Ablage“ → „Zum Dock hinzufügen“
                    wählen, sofern verfügbar.
                  </li>
                </ol>
                <p className="pwa-install-note">
                  Wenn Ihr Browser keine App-Installation anbietet, bleibt NeXify als Website und
                  Lesezeichen nutzbar.
                </p>
              </TabsContent>
            </Tabs>
            <p className="pwa-install-note">
              In der eingebetteten Vorschau ist keine direkte Installation möglich. Installieren Sie
              über die veröffentlichte Website. Chat und andere Online-Funktionen benötigen
              Internet.
            </p>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </section>
  );
}
