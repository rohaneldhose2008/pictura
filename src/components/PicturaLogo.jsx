import './PicturaLogo.css';

export default function PicturaLogo({ variant = 'horizontal', height = 44 }) {
  if (variant === 'full') {
    return (
      <div className="pictura-logo-wrap pictura-full-card-logo">
        <svg viewBox="0 0 400 360" width="100%" height={height * 3} fill="none" className="pictura-logo-svg" xmlns="http://www.w3.org/2000/svg">
          {/* Top-left Orange Corner Bracket */}
          <path d="M 130 30 H 168 V 44 H 144 V 72 H 130 Z" fill="#FF5500" />

          {/* Master 'P' Stem and Loop */}
          <path
            d="M 148 48 H 215 C 248 48 275 75 275 108 C 275 141 248 168 215 168 H 188 V 230 H 148 V 48 Z"
            fill="#FFFFFF"
          />

          {/* Black Outer Aperture Ring */}
          <circle cx="212" cy="108" r="42" fill="#0A0B0E" stroke="#FFFFFF" strokeWidth="4" />

          {/* Shutter Blades Mechanism with Rotating Animation */}
          <g className="aperture-shutter-blades-full">
            {/* 8 Aperture Blades with alternating Orange & White Fill */}
            <path d="M 212 74 L 230 90 L 222 108 L 200 96 Z" fill="#FFFFFF" />
            <path d="M 230 90 L 246 108 L 224 118 L 212 96 Z" fill="#FF5500" />
            <path d="M 246 108 L 230 126 L 212 118 L 224 96 Z" fill="#FFFFFF" />
            <path d="M 230 126 L 212 142 L 202 120 L 212 98 Z" fill="#FF5500" />
            <path d="M 212 142 L 194 126 L 202 108 L 224 120 Z" fill="#FFFFFF" />
            <path d="M 194 126 L 178 108 L 200 98 L 212 120 Z" fill="#FF5500" />
            <path d="M 178 108 L 194 90 L 212 98 L 200 120 Z" fill="#FFFFFF" />
            <path d="M 194 90 L 212 74 L 222 96 L 200 98 Z" fill="#FF5500" />
            
            {/* Center Opening Lens Circle */}
            <circle cx="212" cy="108" r="14" fill="#0A0B0E" />
          </g>

          {/* PICTURA Geometric Logotype */}
          <g fill="#FFFFFF">
            {/* P */}
            <path d="M 40 250 H 68 C 78 250 86 258 86 268 C 86 278 78 286 68 286 H 55 V 302 H 40 V 250 Z M 55 264 V 272 H 68 C 70 272 72 270 72 268 C 72 266 70 264 68 264 H 55 Z" />
            {/* I */}
            <path d="M 94 250 H 108 V 302 H 94 V 250 Z" />
            {/* C (with Orange Corner accent) */}
            <path d="M 144 250 H 122 C 114 250 108 256 108 264 V 288 C 108 296 114 302 122 302 H 144 V 288 H 122 V 264 H 144 V 250 Z" />
            <path d="M 132 292 H 144 V 302 H 132 Z" fill="#FF5500" />
            {/* T */}
            <path d="M 150 250 H 182 V 264 H 173 V 302 H 159 V 264 H 150 V 250 Z" />
            {/* U */}
            <path d="M 188 250 H 202 V 288 C 202 290 204 292 206 292 H 214 C 216 292 218 290 218 288 V 250 H 232 V 288 C 232 296 226 302 218 302 H 202 C 194 302 188 296 188 288 V 250 Z" />
            {/* R */}
            <path d="M 238 250 H 266 C 274 250 282 256 282 264 C 282 272 276 278 268 279 L 282 302 H 266 L 254 282 H 252 V 302 H 238 V 250 Z M 252 262 V 270 H 266 C 268 270 270 268 270 266 C 270 264 268 262 266 262 H 252 Z" />
            {/* A (with Orange Triangle Apex counter) */}
            <path d="M 288 302 L 308 250 H 322 L 342 302 H 326 L 321 288 H 295 L 290 302 H 288 Z M 300 276 H 316 L 308 256 L 300 276 Z" />
            <polygon points="308,256 304,266 312,266" fill="#FF5500" />
          </g>

          {/* CREATIONS Flanked Lines */}
          <line x1="40" y1="322" x2="105" y2="322" stroke="#FF5500" strokeWidth="1.5" />
          <text x="200" y="326" textAnchor="middle" fill="#E2E8F0" fontSize="13" fontWeight="600" letterSpacing="7">CREATIONS</text>
          <line x1="295" y1="322" x2="360" y2="322" stroke="#FF5500" strokeWidth="1.5" />

          {/* Tagline */}
          <text x="200" y="348" textAnchor="middle" fill="#9EA2B0" fontSize="9" fontWeight="600" letterSpacing="4">EVERY DETAIL. EVERY EMOTION</text>
        </svg>
      </div>
    );
  }

  // Horizontal Header Variant (Larger & Animated)
  return (
    <div className="pictura-logo-wrap" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      <svg width={height * 1.25} height={height} viewBox="0 0 160 140" fill="none" className="pictura-logo-svg" xmlns="http://www.w3.org/2000/svg">
        {/* Top-left Orange Corner Bracket */}
        <path d="M 40 10 H 60 V 18 H 48 V 32 H 40 Z" fill="#FF5500" />

        {/* Master 'P' Stem and Loop */}
        <path
          d="M 50 20 H 95 C 118 20 135 38 135 60 C 135 82 118 100 95 100 H 75 V 130 H 50 V 20 Z"
          fill="#FFFFFF"
        />

        {/* Outer Aperture Ring */}
        <circle cx="92" cy="60" r="28" fill="#0A0B0E" stroke="#FFFFFF" strokeWidth="3" />

        {/* Shutter Blades Mechanism with Rotating Animation */}
        <g className="aperture-shutter-blades">
          <path d="M 0 -22 L 12 -12 L 6 0 L -8 -8 Z" fill="#FFFFFF" />
          <path d="M 12 -12 L 22 0 L 8 6 L 0 -8 Z" fill="#FF5500" />
          <path d="M 22 0 L 12 12 L 0 6 L 8 -8 Z" fill="#FFFFFF" />
          <path d="M 12 12 L 0 22 L -6 8 L 0 -6 Z" fill="#FF5500" />
          <path d="M 0 22 L -12 12 L -6 0 L 8 8 Z" fill="#FFFFFF" />
          <path d="M -12 12 L -22 0 L -8 -6 L 0 8 Z" fill="#FF5500" />
          <circle r="8" fill="#0A0B0E" />
        </g>
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1 }}>
        <span className="pictura-text-brand" style={{ fontSize: `${height * 0.44}px` }}>
          PICTURA
        </span>
        <span className="pictura-sub-tagline" style={{ fontSize: `${height * 0.22}px` }}>
          CREATIONS
        </span>
      </div>
    </div>
  );
}
