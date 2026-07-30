import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import PicturaLogo from '../PicturaLogo';
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
        {/* Left End: Bigger Animated Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="capsule-logo-icon-btn"
          aria-label="Pictura Creations Home"
        >
          <PicturaLogo variant="horizontal" height={46} />
        </button>

        {/* Center: Nav Links */}
        <nav className="capsule-links-row">
          <button onClick={() => scrollToSection('home')} className="capsule-link-btn">HOME</button>
          <button onClick={() => scrollToSection('about')} className="capsule-link-btn">ABOUT</button>
          <button onClick={() => scrollToSection('services')} className="capsule-link-btn">SERVICES</button>
          <button onClick={() => scrollToSection('gallery')} className="capsule-link-btn">GALLERY</button>
          <button onClick={() => scrollToSection('packages')} className="capsule-link-btn">PACKAGES</button>
          <button onClick={() => scrollToSection('reviews')} className="capsule-link-btn">REVIEWS</button>
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
