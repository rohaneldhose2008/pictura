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
              {/* Detailed Australia Coastline Path */}
              <path
                d="M 508,42 
                   C 515,60 522,85 526,115 
                   C 512,126 498,136 485,140 
                   C 472,138 458,130 450,118 
                   C 442,98 430,90 418,94 
                   C 406,104 394,110 380,106 
                   C 370,88 355,68 340,66 
                   C 325,68 310,82 302,96 
                   C 285,92 268,90 252,100 
                   C 238,98 222,92 206,105 
                   C 190,116 175,126 160,132 
                   C 140,146 122,162 110,182 
                   C 94,206 84,232 78,262 
                   C 76,292 80,322 86,352 
                   C 92,378 98,398 108,416 
                   C 120,426 138,422 154,415 
                   C 182,408 212,402 242,402 
                   C 282,405 322,418 362,430 
                   C 402,440 442,442 475,430 
                   C 485,416 492,406 502,416 
                   C 515,428 530,440 546,442 
                   C 562,445 578,438 590,422 
                   C 608,400 625,372 638,342 
                   C 650,312 658,278 654,246 
                   C 646,214 632,184 615,156 
                   C 596,128 574,102 548,78 
                   C 532,58 518,46 508,42 Z"
                fill="url(#map-grad)"
                stroke="rgba(255, 85, 0, 0.75)"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />

              {/* Tasmania Island */}
              <path
                d="M 552,465 C 570,462 585,468 592,478 C 588,495 575,505 558,502 C 546,492 544,478 552,465 Z"
                fill="url(#map-grad)"
                stroke="rgba(255, 85, 0, 0.75)"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* State Boundaries (Dashed Lines) */}
              <line x1="252" y1="100" x2="252" y2="402" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="3 3" />
              <line x1="252" y1="255" x2="475" y2="255" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="3 3" />
              <line x1="418" y1="94" x2="418" y2="255" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="3 3" />
              <line x1="418" y1="310" x2="650" y2="275" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="3 3" />

              {/* Major Cities */}
              <circle cx="108" cy="402" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
              <text x="85" y="420" fill="#A0A5B5" fontSize="10" fontWeight="700">Perth</text>

              <circle cx="340" cy="74" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
              <text x="320" y="60" fill="#A0A5B5" fontSize="10" fontWeight="700">Darwin</text>

              <circle cx="475" cy="418" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
              <text x="442" y="436" fill="#A0A5B5" fontSize="10" fontWeight="700">Adelaide</text>

              <circle cx="548" cy="440" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
              <text x="522" y="458" fill="#A0A5B5" fontSize="10" fontWeight="700">Melbourne</text>

              <circle cx="634" cy="342" r="3.5" fill="rgba(255, 255, 255, 0.6)" />
              <text x="644" y="347" fill="#A0A5B5" fontSize="10" fontWeight="700">Sydney</text>

              {/* PRIMARY HEADQUARTERS PIN: BRISBANE, QUEENSLAND */}
              <g className="brisbane-pin-group" transform="translate(650, 246)">
                <circle r="30" fill="rgba(255, 85, 0, 0.25)" className="pulse-ring-map" />
                <circle r="15" fill="rgba(255, 85, 0, 0.45)" />
                <circle r="8" fill="#FF5500" />
                <circle r="3" fill="#FFFFFF" />
                <text x="-165" y="-12" fill="#FF8800" fontSize="13" fontWeight="900" letterSpacing="1">BRISBANE, QUEENSLAND HQ</text>
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
