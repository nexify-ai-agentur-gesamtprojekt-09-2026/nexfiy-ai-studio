/**
 * Sortimentsbereiche für den TEILEKLAR-Katalog.
 * Die Kategorien des Lieferanten-Feeds sind nachweislich falsch zugeordnet (z. B. Luftfilter unter „Sicherheitswesten“),
 * deshalb wird der Bereich aus dem Artikelnamen abgeleitet. Die Lieferantenkategorie bleibt unverändert als Quelle gespeichert.
 * Reihenfolge zählt: spezifische Muster (Werkzeug, Reiniger) stehen vor allgemeinen (Filter, Bremsen).
 */
export const CATALOG_AREAS = [
  "Werkstatt & Pannenhilfe",
  "Pflege & Reinigung",
  "Öle & Additive",
  "Lack, Folien & Reparatur",
  "Filter & Ansaugung",
  "Bremsen",
  "Fahrwerk, Räder & Tuning",
  "Motorsport",
  "Bekleidung & Handschuhe",
  "Beleuchtung & Elektrik",
  "Innenraum & Komfort",
  "Karosserie & Sicht",
  "Anhänger & Transport",
] as const;
export type CatalogArea = (typeof CATALOG_AREAS)[number] | typeof FALLBACK_AREA;
export const FALLBACK_AREA = "Weiteres Zubehör";

const RULES: ReadonlyArray<readonly [CatalogArea, RegExp]> = [
  ["Werkstatt & Pannenhilfe", /schlüssel|auszieher|abzieher|gewindereparatur|mechanikerspiegel|ölpumpe|werkzeug|hydraulisch|wagenheber|unterstellbock|batterieladeger|ladegerät|starthilfe|^starter\b|booster|druckmesser|reifendruck|kompressor|notfall|warndreieck|warnleuchte|feuerlöscher|abschlepp|ersatzklinge|cutter|zange|ratsche|drehmoment|magnet|werkstatt|montage|bremsscheiben-schloss|lenkradschloss|tastensperre|feuerlösch|reifen|pannen|trichter|feile|staubsauger/],
  ["Pflege & Reinigung", /reinig|wachs|politur|polier|shampoo|mikrofaser|versiegel|entfett|schaum|duftspray|lufterfrischer|insektenvernichter|tuch|schwamm|bürste|waschhandschuh|pflege|geruch|seife|keramik-paste/],
  ["Öle & Additive", /motoröl|getriebeöl|(?:^|[\s(])öl(?:$|[\s,)])|ölleck|harnstoff|adblue|additiv|frostschutz|kühlmittel|kühlerschutz|bremsflüssigkeit|gleitmittel|schmier|fett\b|benzin\b|diesel(?!-injektor)/],
  ["Lack, Folien & Reparatur", /sprühfarbe|(?<![a-zäöüß])lack|malerei|zierstreifen|flüssiggummi|flüssiges|folie|kratzer|klebstoff|kleber|klebeband|spachtel|grundierung|vinyl|aufkleber|sticker|neon-draht/],
  ["Filter & Ansaugung", /filter|ansaug|konusförmig|luftfiltergehäuse/],
  ["Bremsen", /brems/],
  ["Fahrwerk, Räder & Tuning", /silentblock|distanz|verstärkungsleiste|domstrebe|schraubensatz|radschraube|radmutter|radbolzen|radkappe|felge|auspuff|endrohr|trennsatz|feder|stoßdämpfer|fahrwerk|kugelgelenk|lagergehäuse|querlenker|stabilisator|ventil|stöpsel|schnellverschl|motorhaubenhalter|gerader|konkave|rohr|kupplung(?!.*anhänger)|turbo|ladeluft|zündkerze|mutter|stehbolzen|schrauben|bolzen|schalldämpfer/],
  ["Motorsport", /renn|racing|helm|visier|sotocasco|sturmhaube|\bhans\b|karting|kart|punkt-gurt|gurt\b|rippenschutz|nackenschutz|sitzgestell|seitenstütze|schutzkörper|unterwäsche|lenkrad(?!abdeckung)|schnellkupplung|pedale|fahrhandschuh|griffband|airbag/],
  ["Bekleidung & Handschuhe", /handschuh|t-shirt|shirt|socken|hausschuhe|herren|damen|kinder|overall|arbeitsanzug|hose|jacke|kappe|mütze|weste|kurze|pullover|sweatshirt|polo|schuhe|stiefel/],
  ["Beleuchtung & Elektrik", /glühbirne|lampe|led\b|led-|halogen|xenon|scheinwerfer|leuchte|licht|leuchtturm|kabel|usb|schalter|ein\/aus|antenne|kamera|videoüberwachung|ladegerät|ladeadapter|steckdose|sicherung|batterie|radio|lautsprecher|kopfhörer|freisprech|gps|dashcam|bluetooth|wallbox|adapter|widerstand|telefon|elektronisch/],
  ["Innenraum & Komfort", /armlehne|lenkradabdeckung|fußmatte|sitzbezug|sitzauflage|schalthebel|schaltknauf|sicherheitsgurt-polster|gurtpolster|rückenlehne|kissen|kofferraum|organizer|handyhalter|halterung|getränkehalter|aschenbecher|knopf|nackenstütze|sonnenblende|innenraum|tech\b|kühlend|anti-rauch|sitzschutz|haustier/],
  ["Karosserie & Sicht", /windabweiser|scheibenwischer|wischer|motorhaube|spoiler|rückspiegel|spiegel|fenster-netz|sonnenschutz|sonnenschirm|autoabdeckung|abdeckplane|schmutzfänger|kotflügel|stoßstange|scheibe|türschutz|kantenschutz|schwelle|hülle|abdeckung|aleron/],
  ["Anhänger & Transport", /anhänger|dachbox|dachträger|fahrradträger|octopus|spanngurt|zurrgurt|gepäck|transport|netz/],
];

export function catalogArea(name: string): CatalogArea {
  const normalized = name.toLocaleLowerCase("de-DE");
  for (const [area, pattern] of RULES) if (pattern.test(normalized)) return area;
  return FALLBACK_AREA;
}
