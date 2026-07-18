/**
 * Arte de fondo del hero: carta natal védica (estilo norte-indio, el rombo
 * clásico) dentro de anillos de astrolabio con graduaciones — línea fina,
 * dibujado a mano en SVG. Se usa a ~4% de opacidad: se siente antes de verse.
 * Decorativo puro (aria-hidden), hereda currentColor.
 */
export default function KundaliArt({ className = "" }: { className?: string }) {
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const a = (i * 5 * Math.PI) / 180;
    const r1 = i % 6 === 0 ? 355 : 362;
    return (
      <line
        key={i}
        x1={400 + r1 * Math.cos(a)}
        y1={400 + r1 * Math.sin(a)}
        x2={400 + 370 * Math.cos(a)}
        y2={400 + 370 * Math.sin(a)}
      />
    );
  });
  return (
    <svg
      viewBox="0 0 800 800"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <defs>
        <filter id="hand-drafted" x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="11" result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="1.35" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#hand-drafted)">
      {/* Anillos del astrolabio */}
      <circle cx="400" cy="400" r="370" />
      <circle cx="400" cy="400" r="345" />
      <circle cx="400" cy="400" r="300" strokeDasharray="2 7" />
      {ticks}
      {/* Kundali norte-indio: cuadrado + diagonales + rombo interior */}
      <rect x="190" y="190" width="420" height="420" />
      <path d="M190 190 L610 610 M610 190 L190 610" />
      <path d="M400 190 L610 400 L400 610 L190 400 Z" />
      {/* Marcas de grado en los vértices del rombo */}
      <circle cx="400" cy="190" r="4" />
      <circle cx="610" cy="400" r="4" />
      <circle cx="400" cy="610" r="4" />
      <circle cx="190" cy="400" r="4" />
      {/* Constelación trazada a mano (esquina superior) */}
      <g strokeWidth="0.9">
        <path d="M120 96 L168 122 L214 104 L258 132" />
        <circle cx="120" cy="96" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="168" cy="122" r="3.5" fill="currentColor" stroke="none" />
        <circle cx="214" cy="104" r="2" fill="currentColor" stroke="none" />
        <circle cx="258" cy="132" r="3" fill="currentColor" stroke="none" />
      </g>
      {/* Arco de Jantar Mantar (cuadrante inferior) */}
      <path d="M 640 700 A 240 240 0 0 0 700 640" strokeWidth="0.9" />
      <path d="M 620 716 A 260 260 0 0 0 716 620" strokeWidth="0.9" strokeDasharray="1 6" />
      {/* Marcas marginales inspiradas en láminas astronómicas manuscritas. */}
      <path d="M74 398 C96 386 105 386 124 398 C105 410 96 410 74 398Z" strokeWidth="0.75" />
      <path d="M676 398 C695 386 704 386 726 398 C704 410 695 410 676 398Z" strokeWidth="0.75" />
      <path d="M397 72 C385 94 385 103 397 122 C409 103 409 94 397 72Z" strokeWidth="0.75" />
      <path d="M397 678 C385 697 385 706 397 728 C409 706 409 697 397 678Z" strokeWidth="0.75" />
      </g>
    </svg>
  );
}
