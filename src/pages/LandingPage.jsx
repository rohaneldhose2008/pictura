import { useState, useRef } from 'react';
import LiquidGlassCard from '../components/LiquidGlassCard';
import FlyingPosters from '../components/FlyingPosters';
import { ArrowRight, Sparkles, Award, Play, ShieldCheck, Film, Camera, Star, Volume2 } from 'lucide-react';
import './LandingPage.css';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop'
];

export default function LandingPage({ onNavigate }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: 'rotateX(0deg) rotateY(0deg)' });
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = -(mouseY / (height / 2)) * 8;
    const rotateY = (mouseX / (width / 2)) * 8;

    setTiltStyle({
      transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    });
  };

  return (
    <div className="page-container page-fade-in">
      {/* Infinite Marquee Ticker Banner */}
      <div className="marquee-ticker-wrap">
        <div className="marquee-track">
          <span>ROYAL WEDDINGS • CINEMATIC FILMS • PRE-WEDDING ROMANCE • HIGH FASHION EDITORIAL • ARCHITECTURAL DRONE • </span>
          <span>ROYAL WEDDINGS • CINEMATIC FILMS • PRE-WEDDING ROMANCE • HIGH FASHION EDITORIAL • ARCHITECTURAL DRONE • </span>
        </div>
      </div>

      {/* Editorial Award-Winning Hero Section */}
      <section className="hero-section hero-section--behance">
        <div className="hero-bg-posters">
          <FlyingPosters items={HERO_IMAGES} planeWidth={440} planeHeight={440} distortion={2} />
        </div>

        <div
          ref={cardRef}
          className="hero-overlay-glass hero-overlay-glass--behance"
          style={tiltStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="hero-top-badge">
            <span className="live-dot" />
            <Award size={14} className="text-orange" />
            <span>AWARD-WINNING VISUAL STORYTELLING STUDIO</span>
          </div>

          <h1 className="hero-title hero-title--behance">
            PICTURA
          </h1>

          <p className="hero-subtitle hero-subtitle--editorial">
            Crafting <span className="text-gradient-serif">timeless royal wedding stories</span>, pre-wedding romantic cinema, and high-fashion visual masterpieces for clients who demand perfection.
          </p>

          <div className="hero-actions">
            <button className="cta-primary-btn cta-primary-btn--behance" onClick={() => onNavigate(1)}>
              <span>EXPLORE PORTFOLIO</span>
              <ArrowRight size={18} />
            </button>
            <button className="cta-secondary-btn cta-secondary-btn--glass" onClick={() => onNavigate(5)}>
              <span>BOOK SESSION</span>
            </button>
            <button className="cta-showreel-btn" onClick={() => setShowVideoModal(true)}>
              <Play size={16} fill="#FF5500" className="text-orange" />
              <span>PLAY SHOWREEL (02:45)</span>
            </button>
          </div>

          {/* Quick Stats Strip */}
          <div className="hero-stats-strip margin-top-30">
            <div className="stat-item">
              <span className="stat-num text-orange">15+</span>
              <span className="stat-label">Years Master Craft</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num text-orange">450+</span>
              <span className="stat-label">Royal Weddings</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num text-orange">RED 8K</span>
              <span className="stat-label">VV Cinema Camera</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num text-orange">100%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Masterpieces Grid */}
      <section className="section-padding">
        <div className="showcase-header">
          <div>
            <span className="hero-badge">CURATED PORTFOLIO</span>
            <h2 className="section-title">FEATURED MASTERPIECES</h2>
            <p className="section-desc">Handcrafted fine art captures & 4K cinema trailers for high-profile celebrations.</p>
          </div>
          <button className="text-link-btn" onClick={() => onNavigate(1)}>
            View All Collections <ArrowRight size={16} />
          </button>
        </div>

        <div className="showcase-cards-grid">
          <LiquidGlassCard className="showcase-card showcase-card--behance" onClick={() => onNavigate(1)}>
            <div className="showcase-img-wrap">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop" alt="Royal Wedding" />
              <span className="card-tag">ROYAL WEDDINGS</span>
            </div>
            <div className="showcase-body">
              <h4>The Sovereign Heritage Wedding</h4>
              <p>Le Méridien Kochi & Udaipur Palace • Candid Fine-Art</p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="showcase-card showcase-card--behance" onClick={() => onNavigate(1)}>
            <div className="showcase-img-wrap">
              <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=900&auto=format&fit=crop" alt="Munnar Pre-wedding" />
              <span className="card-tag">PRE-WEDDING</span>
            </div>
            <div className="showcase-body">
              <h4>Munnar Backwater Twilight</h4>
              <p>Tea Estates & Lagoon Sunset • Anamorphic Cinema</p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="showcase-card showcase-card--behance" onClick={() => onNavigate(2)}>
            <div className="showcase-img-wrap">
              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop" alt="Cinematic Teaser" />
              <span className="card-tag">4K SHOWREEL</span>
            </div>
            <div className="showcase-body">
              <h4>4K Cinematic Highlight Trailer</h4>
              <p>RED 8K V-Raptor & FPV Aerial Drone</p>
            </div>
          </LiquidGlassCard>
        </div>
      </section>

      {/* Press & Accolades Banner */}
      <section className="section-padding">
        <LiquidGlassCard className="awards-banner-card awards-banner-card--behance">
          <div className="awards-content">
            <div className="award-badge-icon">
              <Award size={34} className="text-orange" />
            </div>
            <div>
              <span className="hero-badge">ACCOLADES & RECOGNITION</span>
              <h3>VOGUE WEDDINGS & HARPER'S BAZAAR FEATURED</h3>
              <p>Ranked among the Top 5 Destination Photography & Cinema Studios across South Asia and Australia.</p>
            </div>
          </div>
          <button className="cta-primary-btn" onClick={() => onNavigate(3)}>
            <span>OUR PHILOSOPHY</span>
            <ArrowRight size={16} />
          </button>
        </LiquidGlassCard>
      </section>

      {/* Showreel Video Modal */}
      {showVideoModal && (
        <div className="modal-backdrop" onClick={() => setShowVideoModal(false)}>
          <div className="video-modal-glass" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowVideoModal(false)}>
              ✕
            </button>
            <video
              src="https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-of-a-bride-and-groom-34280-large.mp4"
              controls
              autoPlay
              className="modal-video-player"
            />
            <div className="video-modal-caption">
              <span className="hero-badge">PICTURA CINEMA</span>
              <h2>4K Showreel Highlights 2026</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


