import { useState, useEffect } from 'react';
import OptionWheel from './OptionWheel';
import { Menu, X, MessageSquare, Sparkles } from 'lucide-react';
import './FloatingLeftNav.css';

const NAV_ITEMS = [
  'Home',
  'Gallery',
  'Cinematic Gallery',
  'Why Us',
  'Packages',
  'Booking',
  'Contact',
  'Legal'
];

export default function FloatingLeftNav({ activePageIndex, onPageChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleWheelChange = (index) => {
    onPageChange(index);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Header Bar for Brand Logo & Booking CTA */}
      <header className="top-brand-bar">
        <div className="top-brand-bar__content">
          <div className="site-brand" onClick={() => onPageChange(0)}>
            <span className="brand-title">PICTURA</span>
            <span className="brand-sub-badge">FINE ART & CINEMA</span>
          </div>

          <div className="top-brand-actions">
            <a
              href="https://wa.me/61477240625?text=Hello%20Pictura%20Studio!%20I'd%20like%20to%20inquire%20about%20booking%20a%20shoot."
              target="_blank"
              rel="noreferrer"
              className="header-whatsapp-btn"
            >
              <MessageSquare size={14} />
              <span>WHATSAPP (+61 477 240 625)</span>
            </a>

            <button className="header-book-btn" onClick={() => onPageChange(5)}>
              <span>BOOK SESSION</span>
            </button>

            {isMobile && (
              <button
                className="mobile-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Desktop Floating Left OptionWheel Navigation */}
      {!isMobile && (
        <aside className="floating-left-nav">
          <div className="floating-left-nav__wheel">
            <OptionWheel
              items={NAV_ITEMS}
              defaultSelected={activePageIndex}
              onChange={handleWheelChange}
              side="left"
              fontSize={1.45}
              spacing={1.85}
              curve={1.2}
              tilt={7}
              blur={1}
              fade={0.3}
              inset={25}
              textColor="rgba(255, 255, 255, 0.4)"
              activeColor="#FF5500"
            />
          </div>
        </aside>
      )}

      {/* Mobile Menu Dropdown */}
      {isMobile && mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-glass" onClick={e => e.stopPropagation()}>
            <div className="mobile-wheel-wrapper">
              <OptionWheel
                items={NAV_ITEMS}
                defaultSelected={activePageIndex}
                onChange={handleWheelChange}
                side="left"
                fontSize={1.35}
                spacing={1.6}
                curve={0.5}
                tilt={4}
                blur={1}
                fade={0.2}
                inset={20}
                textColor="rgba(255, 255, 255, 0.4)"
                activeColor="#FF5500"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

