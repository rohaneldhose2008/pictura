import './PicturaLogo.css';

export default function PicturaLogo({ variant = 'horizontal', height = 38 }) {
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

          {/* Black Inner Lens Circle */}
          <circle cx="212" cy="108" r="32" fill="#0A0B0E" />

          {/* PICTURA Geometric Logotype */}
          <g fill="#FFFFFF">
            <path d="M 40 250 H 68 C 78 250 86 258 86 268 C 86 278 78 286 68 286 H 55 V 302 H 40 V 250 Z M 55 264 V 272 H 68 C 70 272 72 270 72 268 C 72 266 70 264 68 264 H 55 Z" />
            <path d="M 94 250 H 108 V 302 H 94 V 250 Z" />
            <path d="M 144 250 H 122 C 114 250 108 256 108 264 V 288 C 108 296 114 302 122 302 H 144 V 288 H 122 V 264 H 144 V 250 Z" />
            <path d="M 132 292 H 144 V 302 H 132 Z" fill="#FF5500" />
            <path d="M 150 250 H 182 V 264 H 173 V 302 H 159 V 264 H 150 V 250 Z" />
            <path d="M 188 250 H 202 V 288 C 202 290 204 292 206 292 H 214 C 216 292 218 290 218 288 V 250 H 232 V 288 C 232 296 226 302 218 302 H 202 C 194 302 188 296 188 288 V 250 Z" />
            <path d="M 238 250 H 266 C 274 250 282 256 282 264 C 282 272 276 278 268 279 L 282 302 H 266 L 254 282 H 252 V 302 H 238 V 250 Z M 252 262 V 270 H 266 C 268 270 270 268 270 266 C 270 264 268 262 266 262 H 252 Z" />
            <path d="M 288 302 L 308 250 H 322 L 342 302 H 326 L 321 288 H 295 L 290 302 H 288 Z M 300 276 H 316 L 308 256 L 300 276 Z" />
            <polygon points="308,256 304,266 312,266" fill="#FF5500" />
          </g>

          {/* CREATIONS Flanked Lines */}
          <line x1="40" y1="322" x2="105" y2="322" stroke="#FF5500" strokeWidth="1.5" />
          <text x="200" y="326" textAnchor="middle" fill="#FF5500" fontSize="14" fontWeight="800" letterSpacing="7">CREATIONS</text>
          <line x1="295" y1="322" x2="360" y2="322" stroke="#FF5500" strokeWidth="1.5" />

          {/* Tagline */}
          <text x="200" y="348" textAnchor="middle" fill="#9EA2B0" fontSize="9" fontWeight="600" letterSpacing="4">EVERY DETAIL. EVERY EMOTION</text>
        </svg>
      </div>
    );
  }

  // Exact Horizontal Logo from User Screenshot
  return (
    <div className="pictura-logo-wrap" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <svg width={height * 1.15} height={height} viewBox="0 0 140 130" fill="none" className="pictura-logo-svg" xmlns="http://www.w3.org/2000/svg">
        {/* Top-left Orange Corner Accent */}
        <path d="M 32 8 H 50 V 16 H 40 V 28 H 32 Z" fill="#FF5500" />

        {/* Master White 'P' Stem and Loop */}
        <path
          d="M 40 18 H 85 C 108 18 124 35 124 57 C 124 79 108 96 85 96 H 64 V 124 H 40 V 18 Z"
          fill="#FFFFFF"
        />

        {/* Solid Black Inner Lens Circle */}
        <circle cx="82" cy="57" r="23" fill="#0A0B0E" />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1 }}>
        <span className="pictura-text-brand" style={{ fontSize: `${height * 0.46}px`, letterSpacing: '0.12em', color: '#FFFFFF' }}>
          PICTURA
        </span>
        <span className="pictura-sub-tagline" style={{ fontSize: `${height * 0.24}px`, letterSpacing: '0.28em', color: '#FF5500', marginTop: '3px' }}>
          CREATIONS
        </span>
      </div>
    </div>
  );
}
