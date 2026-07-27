import CircularGallery from '../CircularGallery';
import './CinematicGallerySection.css';

const CINEMATIC_GALLERY_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop',
    text: 'BEYOND THE HORIZON'
  },
  {
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000&auto=format&fit=crop',
    text: 'CITY OF DREAMS'
  },
  {
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1000&auto=format&fit=crop',
    text: 'WILD AUSTRALIA'
  },
  {
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
    text: 'MOMENTS THAT MATTER'
  },
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    text: 'GOLD COAST SUNSET'
  }
];

export default function CinematicGallerySection() {
  return (
    <section id="cinematic" className="cinematic-section section-container dissolve-section">
      <div className="cinematic-header text-center">
        <div className="section-tag">CINEMA</div>
        <h2 className="section-title">
          CINEMATIC <span className="text-orange">REEL</span>
        </h2>
      </div>

      {/* 3D Flying Circular Gallery for Cinematic Stories */}
      <div className="cinematic-gallery-viewport">
        <CircularGallery
          items={CINEMATIC_GALLERY_ITEMS}
          bend={-2.5}
          textColor="#FFFFFF"
          borderRadius={0.06}
          scrollSpeed={2.0}
          scrollEase={0.03}
          autoPlay={true}
          autoSpeed={0.04}
          fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
          font="bold 26px Orbitron"
          textPosition="bottom"
        />
      </div>
    </section>
  );
}
