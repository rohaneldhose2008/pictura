import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`pictura-navbar ${scrolled ? 'pictura-navbar--scrolled' : ''}`}>
      <div className="unified-capsule-bar">
        {/* Left End: Increased 'P' Brand Icon */}
        <button
          onClick={() => scrollToSection('home')}
          className="capsule-logo-icon-btn"
          aria-label="Pictura Creations Home"
        >
          <svg width="32" height="32" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 40 10 H 60 V 18 H 48 V 32 H 40 Z" fill="#FF5500" />
            <path d="M 50 20 H 95 C 118 20 135 38 135 60 C 135 82 118 100 95 100 H 75 V 130 H 50 V 20 Z" fill="#FFFFFF" />
            <circle cx="92" cy="60" r="28" fill="#0A0B0E" stroke="#FFFFFF" strokeWidth="3" />
            <g transform="translate(92, 60)">
              <path d="M 0 -22 L 12 -12 L 6 0 L -8 -8 Z" fill="#FFFFFF" />
              <path d="M 12 -12 L 22 0 L 8 6 L 0 -8 Z" fill="#FF5500" />
              <path d="M 22 0 L 12 12 L 0 6 L 8 -8 Z" fill="#FFFFFF" />
              <path d="M 12 12 L 0 22 L -6 8 L 0 -6 Z" fill="#FF5500" />
              <path d="M 0 22 L -12 12 L -6 0 L 8 8 Z" fill="#FFFFFF" />
              <path d="M -12 12 L -22 0 L -8 -6 L 0 8 Z" fill="#FF5500" />
              <circle r="8" fill="#0A0B0E" />
            </g>
          </svg>
        </button>

        {/* Center: Nav Links */}
        <nav className="capsule-links-row">
          <button onClick={() => scrollToSection('home')} className="capsule-link-btn">HOME</button>
          <button onClick={() => scrollToSection('about')} className="capsule-link-btn">ABOUT</button>
          <button onClick={() => scrollToSection('services')} className="capsule-link-btn">SERVICES</button>
          <button onClick={() => scrollToSection('gallery')} className="capsule-link-btn">GALLERY</button>
          <button onClick={() => scrollToSection('packages')} className="capsule-link-btn">PACKAGES</button>
          <button onClick={() => scrollToSection('contact')} className="capsule-link-btn">CONTACT</button>
        </nav>

        {/* Right End: BOOK NOW Button */}
        <button onClick={() => scrollToSection('booking')} className="capsule-cta-btn">
          <span>BOOK NOW</span>
          <ArrowUpRight size={15} />
        </button>

        {/* Mobile Toggle inside capsule */}
        <button className="mobile-toggle-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <button onClick={() => scrollToSection('home')}>HOME</button>
          <button onClick={() => scrollToSection('about')}>ABOUT</button>
          <button onClick={() => scrollToSection('services')}>SERVICES</button>
          <button onClick={() => scrollToSection('gallery')}>GALLERY</button>
          <button onClick={() => scrollToSection('packages')}>PACKAGES</button>
          <button onClick={() => scrollToSection('contact')}>CONTACT</button>
          <button onClick={() => scrollToSection('booking')} className="capsule-cta-btn mobile-cta">
            BOOK NOW
          </button>
        </div>
      )}
    </header>
  );
}
