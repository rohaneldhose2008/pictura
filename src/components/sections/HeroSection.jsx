import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import PicturaLogo from '../PicturaLogo';
import './HeroSection.css';

const HERO_SLIDES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    caption: 'Cinematic Royal Production'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1549180030-48bf079fb38a?q=80&w=2070&auto=format&fit=crop',
    caption: 'Townsville Queensland Skyline'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    caption: 'Australian Golden Horizon'
  }
];

export default function HeroSection({ onExplore, onBook }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero-section-wrap dissolve-section">
      {/* Background Image Layer with Fade Slideshow */}
      <div className="hero-bg-media">
        {HERO_SLIDES.map((slide, idx) => (
          <img
            key={slide.id}
            src={slide.url}
            alt={slide.caption}
            className={`hero-bg-img ${idx === activeSlideIndex ? 'active-slide' : ''}`}
          />
        ))}
        <div className="hero-overlay-dark"></div>
        <div className="hero-ambient-glow"></div>
      </div>

      <div className="hero-content-container">
        {/* Main Headline */}
        <div className="hero-text-body">
          <h1 className="hero-main-title">
            WE CAPTURE MORE THAN <span className="text-orange-glow">MOMENTS</span>
          </h1>

          <p className="hero-main-subtitle">
            WE DON'T JUST CLICK. WE CREATE STORIES. TURNING YOUR PRECIOUS MOMENTS INTO TIMELESS CINEMATIC MEMORIES.
          </p>
        </div>

        {/* Action Buttons & Slide Dots */}
        <div className="hero-bottom-actions">
          <div className="hero-buttons">
            <button onClick={onExplore} className="hero-btn-primary">
              <span>EXPLORE OUR WORK</span>
              <ArrowRight size={18} />
            </button>

            <button onClick={onBook} className="hero-btn-secondary">
              <span>BOOK A CONSULTATION</span>
            </button>
          </div>

          {/* Background Image Switcher Dots */}
          <div className="hero-bg-dots">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                className={`hero-dot-btn ${idx === activeSlideIndex ? 'active' : ''}`}
                onClick={() => setActiveSlideIndex(idx)}
                aria-label={`Switch to background ${slide.caption}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
