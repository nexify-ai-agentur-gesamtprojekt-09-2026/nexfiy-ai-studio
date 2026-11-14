/** SVG displacement filters behind the "glass" surfaces of the imported pages (referenced by url(#as-linse…)). */
export function GlassLensFilters() {
  return (
    <svg className="glass-lens-filter" width="0" height="0" aria-hidden="true" focusable="false">
      <filter id="as-linse" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" href="/glass/linse.svg" />
        <feDisplacementMap in="SourceGraphic" in2="karte" scale={36} xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="as-linse-leiste" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" href="/glass/linse-leiste.svg" />
        <feDisplacementMap in="SourceGraphic" in2="karte" scale={30} xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="as-linse-front" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" href="/glass/linse-front.svg" />
        <feDisplacementMap in="SourceGraphic" in2="karte" scale={44} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
