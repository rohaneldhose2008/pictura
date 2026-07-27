import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './ContactSection.css';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section section-container dissolve-section">
      <div className="contact-grid">
        {/* Left Column: Details & Socials */}
        <div className="contact-info-col">
          <div className="section-tag">GET IN TOUCH</div>
          <h2 className="section-title">
            WE'D LOVE TO HEAR <span className="text-orange">FROM YOU</span>
          </h2>

          <div className="contact-details-list">
            <div className="c-info-item">
              <div className="c-icon-ring"><MapPin size={20} className="text-orange" /></div>
              <div>
                <h4 className="c-item-title">Townsville, Queensland</h4>
                <p className="c-item-sub">Studio Headquarters | Queensland & Australia-Wide Commissions</p>
              </div>
            </div>

            <div className="c-info-item">
              <div className="c-icon-ring"><Phone size={20} className="text-orange" /></div>
              <div>
                <h4 className="c-item-title">+61 455 974 240</h4>
                <p className="c-item-sub">Direct Line & WhatsApp</p>
              </div>
            </div>

            <div className="c-info-item">
              <div className="c-icon-ring"><Mail size={20} className="text-orange" /></div>
              <div>
                <h4 className="c-item-title">info@pictura.au</h4>
                <p className="c-item-sub">24/7 Inquiries & Quotes</p>
              </div>
            </div>

            <div className="c-info-item">
              <div className="c-icon-ring"><Clock size={20} className="text-orange" /></div>
              <div>
                <h4 className="c-item-title">Monday - Saturday</h4>
                <p className="c-item-sub">9:00 AM - 6:00 PM AEST</p>
              </div>
            </div>
          </div>

          <div className="contact-socials">
            <span className="socials-label">FOLLOW US</span>
            <div className="social-icons-row">
              <a href="https://www.facebook.com/share/14fduqyis1Y/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/pictura_aus?utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.instagram.com/pictura_aus?utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#000000"/></svg>
              </a>
              <a href="https://www.instagram.com/pictura_aus?utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Exact Australia Vector Map */}
        <div className="contact-map-col">
          <div className="australia-map-card">
            <div className="exact-map-container">
              <img
                src="./australia-outline.png"
                alt="Australia Map Outline"
                className="australia-exact-outline-img"
              />
              <svg viewBox="0 0 780 520" className="australia-overlay-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* State Boundaries (Dashed Lines) */}
                <line x1="260" y1="110" x2="260" y2="400" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="3 3" />
                <line x1="260" y1="250" x2="480" y2="250" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="3 3" />
                <line x1="430" y1="100" x2="430" y2="250" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="3 3" />
                <line x1="430" y1="310" x2="650" y2="275" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="3 3" />

                {/* Major Cities */}
                <circle cx="115" cy="385" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
                <text x="92" y="405" fill="#A0A5B5" fontSize="10" fontWeight="700">Perth</text>

                <circle cx="340" cy="85" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
                <text x="320" y="70" fill="#A0A5B5" fontSize="10" fontWeight="700">Darwin</text>

                <circle cx="475" cy="415" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
                <text x="442" y="432" fill="#A0A5B5" fontSize="10" fontWeight="700">Adelaide</text>

                <circle cx="550" cy="435" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
                <text x="524" y="452" fill="#A0A5B5" fontSize="10" fontWeight="700">Melbourne</text>

                <circle cx="638" cy="335" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
                <text x="648" y="340" fill="#A0A5B5" fontSize="10" fontWeight="700">Sydney</text>

                {/* Brisbane Marker */}
                <circle cx="642" cy="240" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
                <text x="652" y="244" fill="#A0A5B5" fontSize="10" fontWeight="700">Brisbane</text>

                {/* PRIMARY HEADQUARTERS PIN: TOWNSVILLE, QUEENSLAND */}
                <g className="brisbane-pin-group" transform="translate(585, 168)">
                  <circle r="30" fill="rgba(255, 85, 0, 0.25)" className="pulse-ring-map" />
                  <circle r="15" fill="rgba(255, 85, 0, 0.45)" />
                  <circle r="8" fill="#FF5500" />
                  <circle r="3" fill="#FFFFFF" />
                  <text x="-175" y="-12" fill="#FF8800" fontSize="13" fontWeight="900" letterSpacing="1">TOWNSVILLE, QUEENSLAND HQ</text>
                </g>
              </svg>
            </div>

            {/* Townsville, Queensland Badge */}
            <div className="map-location-badge">
              <div className="map-badge-dot"></div>
              <div>
                <span className="map-badge-city">TOWNSVILLE, QUEENSLAND HQ</span>
                <span className="map-badge-state">AUSTRALIA WIDE COMMISSIONS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
