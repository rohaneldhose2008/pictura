import CircularGallery from '../CircularGallery';
import './ServicesSection.css';

const FLYING_SERVICES = [
  { image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop', text: 'PHOTOGRAPHY' },
  { image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop', text: 'CINEMATOGRAPHY' },
  { image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop', text: 'DRONE CINEMA' },
  { image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop', text: 'CORPORATE' },
  { image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop', text: 'ADVERTISING' },
  { image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop', text: 'FUNCTIONS' },
  { image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop', text: 'EVENTS' },
  { image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1200&auto=format&fit=crop', text: 'LIVE BROADCAST' },
  { image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop', text: 'REALESTATE PHOTOGRAPHY' }
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
        <div className="section-tag">SERVICES</div>
        <h2 className="section-title">
          OUR <span className="text-orange">SERVICES</span>
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
