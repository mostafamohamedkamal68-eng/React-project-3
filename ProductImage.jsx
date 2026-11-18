import { useId, useState } from "react";

function getGarmentType(product) {
  const value = `${product.category || ""} ${product.name || ""}`.toLowerCase();
  if (value.includes("short")) return "shorts";
  if (value.includes("jean") || value.includes("pant") || value.includes("chino")) return "pants";
  if (value.includes("jacket") || value.includes("hoodie")) return "jacket";
  if (value.includes("checkered") || value.includes("vertical striped") || value.includes("polo")) return "shirt";
  if (value.includes("shirt") || value.includes("tee")) return "tshirt";
  return "shirt";
}

export default function ProductImage({ product, className = "product-image" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const safeId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const garmentType = getGarmentType(product);
  const firstColor = product.colors?.[0];
  const garmentColor = typeof firstColor === "string"
    ? firstColor
    : firstColor?.hex || (garmentType === "tshirt" ? "#f0ece3" : "#ad927c");
  const patternId = `garment-pattern-${safeId}`;
  const isCheckered = product.name?.toLowerCase().includes("checkered");

  if (product.image && !imageFailed) {
    return (
      <img
        className={className}
        src={product.image}
        alt={product.name}
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <div className={`${className} product-artwork`} role="img" aria-label={`${product.name} illustration`}>
      <svg viewBox="0 0 240 260" aria-hidden="true">
        <defs>
          <linearGradient id={`fabric-${safeId}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={garmentColor} />
            <stop offset="1" stopColor="#111" stopOpacity=".16" />
          </linearGradient>
          <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill={garmentColor} />
            <path d="M0 5h24M0 17h24M6 0v24M18 0v24" stroke="#f2d9d4" strokeOpacity=".75" strokeWidth="4" />
            <path d="M12 0v24M0 12h24" stroke="#f7f1e8" strokeOpacity=".55" strokeWidth="2" />
          </pattern>
          <filter id={`garment-shadow-${safeId}`} x="-30%" y="-20%" width="160%" height="160%">
            <feDropShadow dx="0" dy="9" stdDeviation="8" floodColor="#5d554d" floodOpacity=".2" />
          </filter>
        </defs>
        <g filter={`url(#garment-shadow-${safeId})`} stroke="#222" strokeOpacity=".17" strokeWidth="3" strokeLinejoin="round">
          {garmentType === "pants" ? (
            <>
              <path d="M55 30h130l13 75-30 126h-47l-3-109-10 109H61L42 105Z" fill={`url(#fabric-${safeId})`} />
              <path d="M58 47h124M120 34v87M72 66v26M169 66v26" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="4" />
            </>
          ) : garmentType === "shorts" ? (
            <>
              <path d="M52 32h136l9 103-32 93h-45l-3-77-11 77H65l-32-93Z" fill={`url(#fabric-${safeId})`} />
              <path d="M54 49h132M120 35v115M69 72l35 5m64-5-35 5" fill="none" stroke="#fff" strokeOpacity=".42" strokeWidth="4" />
            </>
          ) : garmentType === "tshirt" ? (
            <>
              <path d="m81 34 39 17 39-17 43 22 32 58-39 18-19-34v134H64V98l-19 34-39-18 32-58Z" fill={`url(#fabric-${safeId})`} />
              <path d="M102 42q18 24 36 0M64 232h112M64 98l19 9m74-9-19 9" fill="none" stroke="#f5f1ea" strokeOpacity=".82" strokeWidth="5" />
              <rect x="83" y="91" width="74" height="78" rx="3" fill="#f5f0e5" stroke="#214f9a" strokeWidth="6" />
              <rect x="90" y="98" width="60" height="51" fill="none" stroke="#214f9a" strokeWidth="3" />
              <path d="m95 142 12-19 11 12 8-10 16 17Z" fill="#214f9a" />
              <circle cx="119" cy="111" r="5" fill="#214f9a" />
              <text x="120" y="163" fill="#214f9a" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">URBAN</text>
            </>
          ) : (
            <>
              <path d="m78 34 42 18 42-18 47 24 27 68-39 17-16-36v122H59V107l-16 36-39-17 27-68Z" fill={isCheckered ? `url(#${patternId})` : `url(#fabric-${safeId})`} />
              <path d="m78 34 42 30 42-30m-42 30v165m-15-157 15 20 15-20" fill="none" stroke="#f5f1ea" strokeOpacity=".82" strokeWidth="5" />
              <path d="M75 125h25v34H75zm65 0h25v34h-25z" fill="#111" fillOpacity=".08" stroke="#f5f1ea" strokeOpacity=".5" strokeWidth="3" />
              {garmentType === "jacket" && <path d="m95 65 25 24 25-24M61 202h118" fill="none" stroke="#f5f1ea" strokeOpacity=".7" strokeWidth="4" />}
              {!isCheckered && [94, 112, 130, 148].map((y) => <circle key={y} cx="120" cy={y} r="2.8" fill="#f5f1ea" stroke="none" />)}
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
