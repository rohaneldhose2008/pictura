import { useState, useRef } from 'react';
import { Phone, Mail, MapPin, RotateCw, ExternalLink, Sparkles } from 'lucide-react';
import PicturaLogo from './PicturaLogo';
import './BusinessCard3D.css';

export default function BusinessCard3D() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotX(rotateX);
    setRotY(rotateY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  const toggleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-3d-viewport">
      <div
        ref={cardRef}
        className={`card-3d-wrapper ${isFlipped ? 'flipped' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${isFlipped ? 180 + rotY : rotY}deg)`
        }}
      >
        {/* Holographic Dynamic Glare Overlay */}
        <div
          className="card-glare-overlay"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.22) 0%, transparent 65%)`
          }}
        />

        {/* FRONT SIDE (Social & Contact Card) */}
        <div className="card-face card-face-front">
          <div className="card-front-header">
            <PicturaLogo variant="horizontal" height={36} />
          </div>

          <div className="card-tagline-strip">
            <Sparkles size={13} className="text-orange" />
            <span>WE DON'T JUST CLICK. WE CREATE STORIES.</span>
          </div>

          {/* Social & Contact Details List */}
          <div className="card-social-grid">
            <a
              href="https://www.instagram.com/pictura_aus?utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="card-social-item"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="c-soc-icon insta">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </div>
              <div className="c-soc-info">
                <span className="c-soc-label">Instagram</span>
                <span className="c-soc-value">@pictura_aus</span>
              </div>
              <ExternalLink size={13} className="c-soc-arrow" />
            </a>

            <a
              href="https://www.facebook.com/share/14fduqyis1Y/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="card-social-item"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="c-soc-icon fb">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </div>
              <div className="c-soc-info">
                <span className="c-soc-label">Facebook</span>
                <span className="c-soc-value">Pictura Creations</span>
              </div>
              <ExternalLink size={13} className="c-soc-arrow" />
            </a>

            <a
              href="https://wa.me/61455974240"
              target="_blank"
              rel="noopener noreferrer"
              className="card-social-item"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="c-soc-icon phone">
                <Phone size={18} />
              </div>
              <div className="c-soc-info">
                <span className="c-soc-label">WhatsApp & Call</span>
                <span className="c-soc-value">+61 455 974 240</span>
              </div>
              <ExternalLink size={13} className="c-soc-arrow" />
            </a>

            <a
              href="mailto:info@pictura.au"
              className="card-social-item"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="c-soc-icon mail">
                <Mail size={18} />
              </div>
              <div className="c-soc-info">
                <span className="c-soc-label">Official Email</span>
                <span className="c-soc-value">info@pictura.au</span>
              </div>
              <ExternalLink size={13} className="c-soc-arrow" />
            </a>

            <div className="card-social-item no-click">
              <div className="c-soc-icon pin">
                <MapPin size={18} />
              </div>
              <div className="c-soc-info">
                <span className="c-soc-label">Location HQ</span>
                <span className="c-soc-value">Townsville, QLD</span>
              </div>
            </div>
          </div>

          {/* Bottom Flip Action Button */}
          <div className="card-flip-hint-bar">
            <button type="button" className="card-flip-btn" onClick={toggleFlip}>
              <RotateCw size={14} />
              <span>FLIP FOR OFFICIAL POSTER</span>
            </button>
          </div>
        </div>

        {/* BACK SIDE (Official Poster Image) */}
        <div className="card-face card-face-back">
          <div className="card-back-image-wrap">
            <img
              src="./pictura-flyer.jpg"
              alt="Pictura Creations Poster"
              className="card-poster-img"
            />
          </div>

          <div className="card-flip-hint-bar card-flip-back-bar">
            <button type="button" className="card-flip-btn" onClick={toggleFlip}>
              <RotateCw size={14} />
              <span>FLIP BACK TO CONTACTS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
