import CircularGallery from '../CircularGallery';
import './ServicesSection.css';

const FLYING_SERVICES = [
  { image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop', text: 'EVENT PHOTOGRAPHY' },
  { image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop', text: 'CORPORATE PHOTOGRAPHY' },
  { image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop', text: 'DRONE AERIAL CINEMA' },
  { image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1200&auto=format&fit=crop', text: 'LIVE STREAM BROADCAST' },
  { image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop', text: 'VIDEOGRAPHY & CINEMA' },
  { image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop', text: 'CANDID & PORTRAITS' },
  { image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop', text: 'FASHION & EDITORIAL' },
  { image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop', text: 'COMMERCIAL PRODUCT' },
  { image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop', text: 'SOCIAL VIRAL REELS' }
];

export default function ServicesSection() {
  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="services-section section-container dissolve-section">
      <div className="services-header text-center">
        <div className="section-tag">OUR VISUAL SOLUTIONS</div>
        <h2 className="section-title">
          COMPLETE CREATIVE <span className="text-orange">SERVICES</span>
        </h2>
      </div>

      {/* 3D Flying Circular Gallery Motion Viewport */}
      <div className="flying-gallery-viewport">
        <CircularGallery
          items={FLYING_SERVICES}
          bend={2.5}
          textColor="#FF5500"
          borderRadius={0.06}
          scrollSpeed={2.0}
          scrollEase={0.03}
          autoPlay={true}
          autoSpeed={0.04}
          fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
          font="bold 26px Orbitron"
          textPosition="top"
        />
      </div>

      {/* Global Booking CTA Button Below Gallery */}
      <div className="services-bottom-cta text-center">
        <button onClick={scrollToBooking} className="services-action-btn">
          <span>BOOK CREATIVE SERVICES</span>
        </button>
      </div>
    </section>
  );
}
