import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import PicturaLogo from '../PicturaLogo';
import './FooterSection.css';

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3500);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="pictura-footer dissolve-section">
      <div className="footer-container">
        {/* Top Grid */}
        <div className="footer-grid">
          {/* Col 1: Brand Info with Official Full Logo */}
          <div className="footer-brand-col">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="footer-logo-link">
              <PicturaLogo variant="horizontal" height={42} />
            </a>

            <p className="footer-tagline">
              Capturing stories. Creating experiences.<br />
              Every detail. Every emotion.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => scrollToSection('home')}>Home</button></li>
              <li><button onClick={() => scrollToSection('about')}>About Us</button></li>
              <li><button onClick={() => scrollToSection('services')}>Services</button></li>
              <li><button onClick={() => scrollToSection('gallery')}>Gallery</button></li>
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">OUR SERVICES</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => scrollToSection('services')}>Photography</button></li>
              <li><button onClick={() => scrollToSection('services')}>Videography</button></li>
              <li><button onClick={() => scrollToSection('services')}>Live Streaming</button></li>
              <li><button onClick={() => scrollToSection('services')}>Drone Services</button></li>
              <li><button onClick={() => scrollToSection('services')}>Event Management</button></li>
            </ul>
          </div>

          {/* Col 4: Help */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">HELP</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => scrollToSection('packages')}>Packages</button></li>
              <li><button onClick={() => scrollToSection('faq')}>FAQ</button></li>
              <li><button onClick={() => scrollToSection('booking')}>Booking</button></li>
              <li><button onClick={() => scrollToSection('contact')}>Contact Us</button></li>
            </ul>
          </div>

          {/* Col 5: Legal & Newsletter */}
          <div className="footer-newsletter-col">
            <h4 className="footer-col-title">GET LATEST UPDATES</h4>
            <p className="newsletter-desc">Subscribe to our newsletter for exclusive films & insights.</p>

            <form onSubmit={handleSubscribe} className="newsletter-form">
              {subscribed ? (
                <div className="newsletter-success">
                  <Check size={16} className="text-orange" />
                  <span>Subscribed!</span>
                </div>
              ) : (
                <div className="newsletter-input-box">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </form>

            <div className="footer-legal-links">
              <a href="#">Privacy Policy</a>
              <span>•</span>
              <a href="#">Terms & Conditions</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© 2025 Pictura Creations. All Rights Reserved. Every Detail. Every Emotion.</p>
        </div>
      </div>
    </footer>
  );
}
