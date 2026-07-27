import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import BusinessCard3D from '../BusinessCard3D';
import './ContactSection.css';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section section-container dissolve-section">
      <div className="contact-grid">
        {/* Left Column: Details */}
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
        </div>

        {/* Right Column: 3D Interactive Flippable Social Media Card */}
        <div className="contact-map-col">
          <BusinessCard3D />
        </div>
      </div>
    </section>
  );
}
