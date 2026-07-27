import { useState } from 'react';
import DomeGallery from '../components/DomeGallery';
import { Camera, Image as ImageIcon, Grid, Globe2, Eye, X, Sparkles, Filter } from 'lucide-react';
import './GalleryPage.css';

const GALLERY_COLLECTION = [
  {
    id: 1,
    title: 'The Royal Heritage Wedding',
    category: 'weddings',
    categoryName: 'Royal Weddings',
    location: 'Udaipur Palace / Kochi Le Méridien',
    camera: 'Hasselblad H6D-100c | 80mm f/2.2',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Munnar Backwater Twilight',
    category: 'prewedding',
    categoryName: 'Pre-Wedding',
    location: 'Tea Gardens & Backwaters',
    camera: 'Sony A1 Cine | 85mm G-Master f/1.2',
    src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Editorial Haute Couture',
    category: 'portraits',
    categoryName: 'Cinematic Portraits',
    location: 'Studio Runway Shoot',
    camera: 'Leica SL2 | 50mm Summilux f/1.4',
    src: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Amalfi Coast Destination Gala',
    category: 'destination',
    categoryName: 'Destination',
    location: 'Positano, Italy',
    camera: 'Hasselblad H6D-100c | 35mm f/3.5',
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Luxury Estate Aerial Dusk',
    category: 'architecture',
    categoryName: 'Architecture & Drone',
    location: 'Cliffside Estate, Gold Coast',
    camera: 'CASA Heavy-Lift Drone 8K',
    src: 'https://images.unsplash.com/photo-1508672019048-805479767513?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'High-Fashion Brand Launch',
    category: 'commercial',
    categoryName: 'Commercial & Fashion',
    location: 'Sydney Fashion Week',
    camera: 'Sony Cine FX6 | 70-200mm f/2.8',
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 7,
    title: 'Sacred Liturgy & Vows',
    category: 'weddings',
    categoryName: 'Royal Weddings',
    location: 'Cathedral St. Mary',
    camera: 'Sony A1 Cine | 35mm f/1.4',
    src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 8,
    title: 'Golden Hour Sunset Romance',
    category: 'prewedding',
    categoryName: 'Pre-Wedding',
    location: 'Kumarakom Resort Backwaters',
    camera: 'Leica SL2 | 85mm f/1.4',
    src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 9,
    title: 'Fine-Art Bridal Portraiture',
    category: 'portraits',
    categoryName: 'Cinematic Portraits',
    location: 'Bolgatty Palace',
    camera: 'Hasselblad 100MP Stills',
    src: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function GalleryPage({ onNavigate }) {
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'grid'
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePhoto, setActivePhoto] = useState(null);

  const filteredPhotos = activeCategory === 'all'
    ? GALLERY_COLLECTION
    : GALLERY_COLLECTION.filter(p => p.category === activeCategory);

  return (
    <div className="page-container page-fade-in">
      <div className="page-header">
        <div className="hero-badge">
          <ImageIcon size={14} />
          <span>BESPOKE FINE ART PORTFOLIO</span>
        </div>
        <h1 className="page-title">
          FINE-ART <span className="text-gradient">GALLERY</span>
        </h1>
        <p className="page-subtitle">
          Explore our archive in interactive 3D Spherical mode or switch to the curated high-resolution masonry grid.
        </p>

        {/* View Switcher & Category Bar */}
        <div className="gallery-control-panel margin-top-20">
          <div className="view-mode-toggle">
            <button
              className={`toggle-btn ${viewMode === '3d' ? 'toggle-btn--active' : ''}`}
              onClick={() => setViewMode('3d')}
            >
              <Globe2 size={16} />
              <span>3D SPHERICAL DOME</span>
            </button>
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'toggle-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
              <span>MASONRY GRID</span>
            </button>
          </div>

          {viewMode === 'grid' && (
            <div className="category-filters">
              <button
                className={`filter-chip ${activeCategory === 'all' ? 'filter-chip--active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                ALL WORKS
              </button>
              <button
                className={`filter-chip ${activeCategory === 'weddings' ? 'filter-chip--active' : ''}`}
                onClick={() => setActiveCategory('weddings')}
              >
                WEDDINGS
              </button>
              <button
                className={`filter-chip ${activeCategory === 'prewedding' ? 'filter-chip--active' : ''}`}
                onClick={() => setActiveCategory('prewedding')}
              >
                PRE-WEDDING
              </button>
              <button
                className={`filter-chip ${activeCategory === 'portraits' ? 'filter-chip--active' : ''}`}
                onClick={() => setActiveCategory('portraits')}
              >
                PORTRAITS
              </button>
              <button
                className={`filter-chip ${activeCategory === 'destination' ? 'filter-chip--active' : ''}`}
                onClick={() => setActiveCategory('destination')}
              >
                DESTINATION
              </button>
            </div>
          )}
        </div>
      </div>

      {viewMode === '3d' ? (
        <DomeGallery />
      ) : (
        <div className="masonry-gallery-grid">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="gallery-grid-card"
              onClick={() => setActivePhoto(photo)}
            >
              <div className="card-img-wrap">
                <img src={photo.src} alt={photo.title} loading="lazy" />
                <div className="card-overlay-hover">
                  <Eye size={28} className="text-orange" />
                  <span className="overlay-title">{photo.title}</span>
                  <span className="overlay-cat">{photo.categoryName}</span>
                </div>
              </div>
              <div className="card-footer-info">
                <h4>{photo.title}</h4>
                <p>{photo.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal for Grid Photos */}
      {activePhoto && (
        <div className="modal-backdrop" onClick={() => setActivePhoto(null)}>
          <div className="modal-lightbox-glass" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActivePhoto(null)}>
              <X size={22} />
            </button>
            <img src={activePhoto.src} alt={activePhoto.title} className="lightbox-img" />
            <div className="lightbox-caption">
              <span className="hero-badge">{activePhoto.categoryName}</span>
              <h3>{activePhoto.title}</h3>
              <p className="lightbox-meta">📍 {activePhoto.location} &nbsp;|&nbsp; 📷 {activePhoto.camera}</p>
              <button className="cta-primary-btn margin-top-16" onClick={() => { setActivePhoto(null); onNavigate(5); }}>
                <span>INQUIRE ABOUT THIS STYLE</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

