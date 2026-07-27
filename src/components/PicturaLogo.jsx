import './PicturaLogo.css';

export default function PicturaLogo({ variant = 'horizontal', height = 38 }) {
  if (variant === 'full') {
    return (
      <div className="pictura-logo-wrap pictura-full-card-logo">
        <svg viewBox="0 0 400 360" width="100%" height={height * 3} fill="none" className="pictura-logo-svg" xmlns="http://www.w3.org/2000/svg">
          {/* Top-left Orange Corner Bracket */}
          <path d="M 130 20 H 168 V 34 H 144 V 62 H 130 Z" fill="#FF8500" />

          {/* Master 'P' Stem and Loop */}
          <path
            d="M 148 40 H 225 C 265 40 295 70 295 110 C 295 150 265 180 225 180 H 192 V 242 H 148 V 40 Z"
            fill="#FFFFFF"
          />

          {/* Black Inner Lens Aperture Ring */}
          <circle cx="222" cy="110" r="44" fill="#0A0B0E" stroke="#FFFFFF" strokeWidth="4" />

          {/* 6 Shutter Blades (White & Orange) */}
          <g className="aperture-shutter-blades-full">
            <path d="M 222 72 L 244 92 L 230 114 L 208 100 Z" fill="#FFFFFF" />
            <path d="M 244 92 L 260 114 L 236 126 L 222 100 Z" fill="#FF8500" />
            <path d="M 260 114 L 244 136 L 222 126 L 236 100 Z" fill="#FFFFFF" />
            <path d="M 244 136 L 222 152 L 210 128 L 222 102 Z" fill="#FF8500" />
            <path d="M 222 152 L 200 136 L 210 114 L 232 128 Z" fill="#FFFFFF" />
            <path d="M 200 136 L 184 114 L 208 102 L 222 128 Z" fill="#FF8500" />
            <circle cx="222" cy="110" r="16" fill="#0A0B0E" />
          </g>

          {/* PICTURA Logotype */}
          <g fill="#FFFFFF">
            <path d="M 40 260 H 68 C 78 260 86 268 86 278 C 86 288 78 296 68 296 H 55 V 312 H 40 V 260 Z M 55 274 V 282 H 68 C 70 282 72 280 72 278 C 72 276 70 274 68 274 H 55 Z" />
            <path d="M 94 260 H 108 V 312 H 94 V 260 Z" />
            <path d="M 144 260 H 122 C 114 260 108 266 108 274 V 298 C 108 306 114 312 122 312 H 144 V 298 H 122 V 274 H 144 V 260 Z" />
            <path d="M 132 302 H 144 V 312 H 132 Z" fill="#FF8500" />
            <path d="M 150 260 H 182 V 274 H 173 V 312 H 159 V 274 H 150 V 260 Z" />
            <path d="M 188 260 H 202 V 298 C 202 300 204 302 206 302 H 214 C 216 302 218 300 218 298 V 260 H 232 V 298 C 232 306 226 312 218 312 H 202 C 194 312 188 306 188 298 V 260 Z" />
            <path d="M 238 260 H 266 C 274 260 282 266 282 274 C 282 282 276 288 268 289 L 282 312 H 266 L 254 292 H 252 V 312 H 238 V 260 Z M 252 272 V 280 H 266 C 268 280 270 278 270 276 C 270 274 268 272 266 272 H 252 Z" />
            <path d="M 288 312 L 308 260 H 322 L 342 312 H 326 L 321 298 H 295 L 290 312 H 288 Z M 300 286 H 316 L 308 266 L 300 286 Z" />
            <polygon points="308,266 304,276 312,276" fill="#FF8500" />
          </g>

          {/* CREATIONS Flanked Lines */}
          <line x1="40" y1="332" x2="115" y2="332" stroke="#FF8500" strokeWidth="1.5" />
          <text x="200" y="336" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700" letterSpacing="8">CREATIONS</text>
          <line x1="285" y1="332" x2="360" y2="332" stroke="#FF8500" strokeWidth="1.5" />

          {/* Tagline */}
          <text x="200" y="356" textAnchor="middle" fill="#9EA2B0" fontSize="9" fontWeight="600" letterSpacing="4">EVERY DETAIL. EVERY EMOTION</text>
        </svg>
      </div>
    );
  }

  // Exact Horizontal Logo Vector (Transparent Background, No White Boxes)
  return (
    <div className="pictura-logo-wrap" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <svg width={height * 1.15} height={height} viewBox="0 0 140 130" fill="none" className="pictura-logo-svg" xmlns="http://www.w3.org/2000/svg">
        {/* Top-left Orange Corner Bracket */}
        <path d="M 32 6 H 50 V 14 H 40 V 26 H 32 Z" fill="#FF8500" />

        {/* Master White 'P' Stem and Loop */}
        <path
          d="M 40 16 H 85 C 108 16 124 33 124 55 C 124 77 108 94 85 94 H 64 V 122 H 40 V 16 Z"
          fill="#FFFFFF"
        />

        {/* Outer Black Lens Ring */}
        <circle cx="82" cy="55" r="23" fill="#0A0B0E" stroke="#FFFFFF" strokeWidth="2.5" />

        {/* Aperture Shutter Blades inside Lens */}
        <g className="aperture-shutter-blades">
          <path d="M 82 35 L 93 45 L 86 56 L 75 49 Z" fill="#FFFFFF" />
          <path d="M 93 45 L 101 56 L 89 62 L 82 49 Z" fill="#FF8500" />
          <path d="M 101 56 L 93 67 L 82 62 L 89 49 Z" fill="#FFFFFF" />
          <path d="M 93 67 L 82 75 L 76 63 L 82 50 Z" fill="#FF8500" />
          <path d="M 82 75 L 71 67 L 76 56 L 87 63 Z" fill="#FFFFFF" />
          <path d="M 71 67 L 63 56 L 75 50 L 82 63 Z" fill="#FF8500" />
          <circle cx="82" cy="55" r="8" fill="#0A0B0E" />
        </g>
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1 }}>
        <span className="pictura-text-brand" style={{ fontSize: `${height * 0.46}px`, letterSpacing: '0.12em', color: '#FFFFFF', fontWeight: 900 }}>
          PICTURA
        </span>
        <span className="pictura-sub-tagline" style={{ fontSize: `${height * 0.24}px`, letterSpacing: '0.28em', color: '#FF8500', marginTop: '3px', fontWeight: 800 }}>
          CREATIONS
        </span>
      </div>
    </div>
  );
}
