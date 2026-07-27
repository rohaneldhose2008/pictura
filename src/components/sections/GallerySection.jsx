import DomeGallery from '../DomeGallery';
import './GallerySection.css';

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop', alt: 'Royal Wedding Celebration' },
  { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop', alt: 'Grand Gala Event' },
  { src: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop', alt: 'Concert Stage & Festival' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop', alt: 'Golden Horizon Coastal Shoot' },
  { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop', alt: 'Queensland Coastal Sunset' },
  { src: 'https://images.unsplash.com/photo-1549180030-48bf079fb38a?q=80&w=1200&auto=format&fit=crop', alt: 'Brisbane City Skyline' },
  { src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop', alt: 'Fashion Model Editorial' },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop', alt: 'Luxury Studio Portrait' },
  { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop', alt: 'Corporate Executive Summit' },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop', alt: 'Innovation Conference' },
  { src: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop', alt: 'Drone Aerial Cinema' },
  { src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1200&auto=format&fit=crop', alt: 'Private Celebration Party' },
  { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop', alt: 'Bridal Portrait' },
  { src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1200&auto=format&fit=crop', alt: 'Romantic Sunset Couple' },
  { src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200&auto=format&fit=crop', alt: 'Outdoor Ceremony' },
  { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop', alt: 'Tech Product Launch' },
  { src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop', alt: 'Commercial Product Photography' },
  { src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop', alt: 'Live Music Night Festival' },
  { src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop', alt: 'Stage DJ Production' },
  { src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop', alt: 'Outdoor Music Festival Crowd' },
  { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop', alt: 'Dynamic Laser Night Show' },
  { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop', alt: 'Luxury Car Commercial Shoot' },
  { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop', alt: 'Supercar Editorial' },
  { src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop', alt: 'High-Fashion Catwalk' },
  { src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop', alt: 'Urban Style Portrait' },
  { src: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop', alt: 'Tropical Beach Drone View' },
  { src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop', alt: 'Gourmet Culinary Art' },
  { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop', alt: 'Luxury Resort Spa Shoot' },
  { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop', alt: 'Sunlit Forest Nature Shoot' }
];

export default function GallerySection() {
  return (
    <section id="gallery" className="gallery-section section-container dissolve-section">
      <div className="section-header text-center">
        <div className="section-tag">PORTFOLIO</div>
        <h2 className="section-title">
          OUR <span className="text-orange">WORK</span>
        </h2>
      </div>

      {/* Floating 100% Natural 3D Dome Globe Sphere */}
      <div className="dome-gallery-viewport">
        <DomeGallery
          images={GALLERY_IMAGES}
          fit={0.65}
          minRadius={540}
          maxRadius={750}
          padFactor={0.15}
          overlayBlurColor="transparent"
          grayscale={false}
          openedImageWidth="420px"
          openedImageHeight="560px"
          imageBorderRadius="18px"
          openedImageBorderRadius="24px"
          dragSensitivity={18}
          dragDampening={0.8}
        />
      </div>
    </section>
  );
}
