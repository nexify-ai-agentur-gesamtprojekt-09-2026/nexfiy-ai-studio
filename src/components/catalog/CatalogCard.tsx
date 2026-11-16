import { availabilityLabel, catalogImageUrl, catalogProductPath, formatPrice } from "@/lib/teileklar-catalog";
import type { CatalogListItem } from "@/lib/teileklar-catalog.functions";

export function CatalogImage({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  const url = catalogImageUrl(src);
  if (!url) return <div className="tkc-image is-empty" aria-hidden="true"><span>Kein Bild</span></div>;
  return <div className="tkc-image"><img src={url} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" width={400} height={300} /></div>;
}

export function CatalogCard({ item }: { item: CatalogListItem }) {
  const price = formatPrice(item.price_value);
  return (
    <article className="tkc-card">
      <a className="tkc-card-link" href={catalogProductPath(item.id)}>
        <CatalogImage src={item.image_src} alt={item.image_alt} />
        <span className="tkc-card-brand">{item.brand || item.category}</span>
        <h3 className="tkc-card-name">{item.name}</h3>
      </a>
      <p className="tkc-card-price">{price ?? "Preis auf Anfrage"}{price ? <small>inkl. MwSt., zzgl. Versand</small> : null}</p>
      <p className="tkc-card-stock" data-available={item.stock > 0 || undefined}>{availabilityLabel(item)}</p>
    </article>
  );
}
