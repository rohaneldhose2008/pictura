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
                <h4 className="c-item-title">Brisbane, Queensland</h4>
                <p className="c-item-sub">Headquarters & Studio | Australia-Wide Commissions</p>
              </div>
            </div>

            <div className="c-info-item">
              <div className="c-icon-ring"><Phone size={20} className="text-orange" /></div>
              <div>
                <h4 className="c-item-title">+61 412 345 678</h4>
                <p className="c-item-sub">Direct Line & WhatsApp</p>
              </div>
            </div>

            <div className="c-info-item">
              <div className="c-icon-ring"><Mail size={20} className="text-orange" /></div>
              <div>
                <h4 className="c-item-title">hello@picturacreations.com.au</h4>
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
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#000000"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Geographically Accurate Australia Vector Map */}
        <div className="contact-map-col">
          <div className="australia-map-card">
            <svg viewBox="0 0 780 520" className="australia-map-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Geographically Accurate Australia Continent Path */}
              <path
                d="M 535,45 
                   L 550,110 
                   L 490,125 
                   L 470,85 
                   L 435,70 
                   L 395,85 
                   L 375,65 
                   L 315,85 
                   L 255,95 
                   L 230,125 
                   L 165,145 
                   L 125,185 
                   L 85,235 
                   L 95,295 
                   L 90,345 
                   L 105,405 
                   L 135,425 
                   L 175,415 
                   L 245,395 
                   L 325,385 
                   L 395,385 
                   L 445,415 
                   L 460,435 
                   L 485,415 
                   L 515,445 
                   L 575,455 
                   L 615,425 
                   L 655,365 
                   L 665,305 
                   L 675,255 
                   L 645,195 
                   L 605,145 
                   L 545,105 Z"
                fill="url(#map-grad)"
                stroke="rgba(255, 85, 0, 0.55)"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Tasmania Island */}
              <path
                d="M 575,475 L 610,480 L 600,510 L 565,500 Z"
                fill="url(#map-grad)"
                stroke="rgba(255, 85, 0, 0.55)"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Geographic Grid Lines */}
              <line x1="300" y1="60" x2="300" y2="440" stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="4 4" />
              <line x1="490" y1="60" x2="490" y2="450" stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="4 4" />
              <line x1="90" y1="260" x2="670" y2="260" stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="4 4" />

              {/* City Dots */}
              {/* Perth */}
              <circle cx="105" cy="385" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
              <text x="85" y="405" fill="#9EA2B0" fontSize="9" fontWeight="700">Perth</text>

              {/* Melbourne */}
              <circle cx="560" cy="445" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
              <text x="535" y="465" fill="#9EA2B0" fontSize="9" fontWeight="700">Melbourne</text>

              {/* Sydney Dot */}
              <circle cx="650" cy="360" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
              <text x="662" y="364" fill="#9EA2B0" fontSize="9" fontWeight="700">Sydney</text>

              {/* PRIMARY HEADQUARTERS PIN: BRISBANE, QUEENSLAND */}
              <g className="brisbane-pin-group" transform="translate(670, 250)">
                <circle r="32" fill="rgba(255, 85, 0, 0.25)" className="pulse-ring-map" />
                <circle r="16" fill="rgba(255, 85, 0, 0.45)" />
                <circle r="8" fill="#FF5500" />
                <circle r="3" fill="#FFFFFF" />
                <text x="-160" y="-12" fill="#FF8800" fontSize="13" fontWeight="900" letterSpacing="1">BRISBANE, QUEENSLAND HQ</text>
              </g>

              {/* Gradient Defs */}
              <defs>
                <linearGradient id="map-grad" x1="80" y1="40" x2="700" y2="500" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#181B26"/>
                  <stop offset="1" stopColor="#0B0E17"/>
                </linearGradient>
              </defs>
            </svg>

            {/* Brisbane, Queensland Badge */}
            <div className="map-location-badge">
              <div className="map-badge-dot"></div>
              <div>
                <span className="map-badge-city">BRISBANE, QUEENSLAND HQ</span>
                <span className="map-badge-state">AUSTRALIA WIDE COMMISSIONS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
