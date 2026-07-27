import { useState } from 'react';
import LiquidGlassCard from '../components/LiquidGlassCard';
import { Calendar, Check, ArrowRight, Info, Eye, Sparkles, X, Clock } from 'lucide-react';
import './PackagesPage.css';

const BESPOKE_PACKAGES = [
  {
    id: 'wedding_royal',
    category: 'Royal Wedding & Reception',
    title: 'The Sovereign Heritage Wedding',
    subtitle: 'Comprehensive 3-day royal wedding, sangeet, & reception coverage',
    price: '₹4,50,000',
    currency: 'INR / $5,500 AUD',
    duration: 'Multi-Day (Up to 3 Days)',
    deliverables: '800+ Master Retouched Photos + 4K Feature Film',
    availability: '2 Dates Remaining for Season',
    features: [
      '4 Senior Cinematographers & 3 Master Photographers',
      'RED 8K V-Raptor Cinema Camera Stills',
      'CASA 8K Heavy-Lift FPV Drone Aerial Capture',
      'Handcrafted Italian Leather Master Album (50 Pages)',
      'Same-Day Teaser Video for Social Media',
      'Full Digital RAW Archives & Web Gallery'
    ],
    details: 'Our flagship royal wedding package. Complete multi-camera coverage for haldi, sangeet, wedding ceremony, and reception gala. Includes master colorist grading and physical fine art albums.'
  },
  {
    id: 'prewedding',
    category: 'Pre-Wedding & Romance Film',
    title: 'Cinematic Pre-Wedding Luxe',
    subtitle: 'Destination romantic concept shoot in Munnar, Kumarakom, or Bali',
    price: '₹1,75,000',
    currency: 'INR / $2,200 AUD',
    duration: '2 Full Shooting Days',
    deliverables: '150+ Retouched Stills + 3-Min Cinema Teaser',
    availability: 'Available Next Month',
    features: [
      'Dual Cine Camera Setup + Drone Aerial Specialist',
      'Styling & Location Scouting Guidance',
      'Underwater & Sunset Lighting Equipment',
      '4K Cinematic Teaser Trailer with Custom Score',
      'Print-Ready 8K Resolution Downloads'
    ],
    details: 'Designed for couples seeking a movie-grade pre-wedding story film. We shoot on location with anamorphic lenses, drone vistas, and custom sound design.'
  },
  {
    id: 'commercial',
    category: 'Commercial & Fashion Campaign',
    title: 'Brand Visionary Campaign',
    subtitle: 'High-end product launch, runway, & brand advertising imagery',
    price: '₹2,85,000',
    currency: 'INR / $3,400 AUD',
    duration: 'Full Day Studio / Location Shoot',
    deliverables: '60 Master Commercial Retouched Assets',
    availability: 'Studio Hire Included',
    features: [
      'Hasselblad 100MP Medium Format Stills',
      'Creative Director & High-Key Lighting Crew',
      'Advanced High-End Beauty & Composite Retouching',
      'Full Worldwide Digital & Billboard Usage Rights',
      'Express 48-Hour Delivery Turnaround'
    ],
    details: 'Tailored for fashion labels, jewelry houses, and commercial brand launches requiring Hasselblad medium format resolution and magazine retouching.'
  },
  {
    id: 'livestream',
    category: '4K Live Stream & Stage',
    title: '4K Multi-Cam Broadcast',
    subtitle: 'Ultra-low latency live streaming for global stage galas & events',
    price: '₹2,20,000',
    currency: 'INR / $2,700 AUD',
    duration: 'Up to 8 Hours Live Broadcast',
    deliverables: 'Real-Time 4K Broadcast Stream + Stills',
    availability: 'Streaming Engineers Ready',
    features: [
      '4-Camera 4K Sony Cine Broadcast Setup',
      'Dedicated Streaming Engineer & Switcher Operator',
      'Live Lower-Third Animated Graphics & Overlays',
      'Cellular SRT Bonding Failover (Zero Signal Drop)',
      'Immediate 4K Master Video Recording'
    ],
    details: 'Stream your stage performance, royal wedding, or corporate summit live to YouTube, Vimeo, or private portals worldwide in 4K with zero latency.'
  },
  {
    id: 'architecture',
    category: 'Architectural & Drone',
    title: 'Luxury Property & Estate Showcase',
    subtitle: '8K aerial drone cinematography & architectural dusk stills',
    price: '₹1,45,000',
    currency: 'INR / $1,800 AUD',
    duration: 'Twilight & Dawn Shoot',
    deliverables: '40 Architectural Stills + 4K Drone Reel',
    availability: 'Weather Dependent',
    features: [
      'Twilight Exterior & Interior HDR Photography',
      'CASA Licensed Heavy-Lift FPV Drone Capture',
      'Perspective Correction & Sky Replacement',
      'Architectural Texture & Detail Closeups',
      'Commercial Property Marketing License'
    ],
    details: 'Perfect for luxury resort operators, architects, and high-value real estate developers seeking architectural imagery.'
  }
];

export default function PackagesPage({ onNavigate }) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPackages = activeCategory === 'all'
    ? BESPOKE_PACKAGES
    : BESPOKE_PACKAGES.filter(p => p.id === activeCategory);

  return (
    <div className="page-container page-fade-in">
      <div className="packages-header-calendar">
        <div className="calendar-status-chip">
          <Calendar size={15} className="text-orange" />
          <span>2026 SHOOT CALENDAR & BESPOKE PACKAGES</span>
        </div>
        <h1 className="page-title">
          SELECT YOUR <span className="text-gradient">PACKAGE</span>
        </h1>
        <p className="page-subtitle">
          Transparent pricing & deliverable schedules inspired by doublelayer photography standards.
        </p>

        <div className="category-filters margin-top-20">
          <button
            className={`filter-chip ${activeCategory === 'all' ? 'filter-chip--active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            ALL PACKAGES
          </button>
          {BESPOKE_PACKAGES.map(pkg => (
            <button
              key={pkg.id}
              className={`filter-chip ${activeCategory === pkg.id ? 'filter-chip--active' : ''}`}
              onClick={() => setActiveCategory(pkg.id)}
            >
              {pkg.category.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="packages-bespoke-grid">
        {filteredPackages.map(pkg => (
          <LiquidGlassCard key={pkg.id} className="bespoke-package-card">
            <div className="card-top-bar">
              <span className="pkg-cat-tag">{pkg.category}</span>
              <span className="pkg-availability">
                <Clock size={13} className="text-orange" /> {pkg.availability}
              </span>
            </div>

            <h3 className="pkg-title">{pkg.title}</h3>
            <p className="pkg-subtitle">{pkg.subtitle}</p>

            <div className="pkg-price-banner">
              <div className="pkg-price">{pkg.price}</div>
              <div className="pkg-tax">{pkg.currency} + GST</div>
            </div>

            <div className="pkg-meta-strip">
              <div><strong>Duration:</strong> {pkg.duration}</div>
              <div><strong>Deliverables:</strong> {pkg.deliverables}</div>
            </div>

            <ul className="pkg-features">
              {pkg.features.map((feat, idx) => (
                <li key={idx}>
                  <Check size={16} className="text-orange" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="pkg-card-actions">
              <button
                className="view-details-btn"
                onClick={() => setSelectedPackage(pkg)}
              >
                <Eye size={15} />
                <span>VIEW SCOPE</span>
              </button>
              <button
                className="book-pkg-btn"
                onClick={() => onNavigate(5)}
              >
                <span>RESERVE DATE</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </LiquidGlassCard>
        ))}
      </div>

      {selectedPackage && (
        <div className="modal-backdrop" onClick={() => setSelectedPackage(null)}>
          <div className="modal-glass-container" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedPackage(null)}>
              <X size={20} />
            </button>

            <div className="modal-header">
              <span className="pkg-cat-tag">{selectedPackage.category}</span>
              <h2>{selectedPackage.title}</h2>
              <div className="modal-price">{selectedPackage.price} {selectedPackage.currency}</div>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h4><Info size={16} className="text-orange" /> Shoot Scope & Specification</h4>
                <p>{selectedPackage.details}</p>
              </div>

              <div className="modal-section">
                <h4><Sparkles size={16} className="text-orange" /> Turnaround & Delivery</h4>
                <p><strong>Shoot Duration:</strong> {selectedPackage.duration}</p>
                <p><strong>High-Res Output:</strong> {selectedPackage.deliverables}</p>
              </div>

              <div className="modal-section">
                <h4><Check size={16} className="text-orange" /> Included Services</h4>
                <ul>
                  {selectedPackage.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cta-primary-btn width-full" onClick={() => { setSelectedPackage(null); onNavigate(5); }}>
                <span>BOOK THIS PACKAGE NOW</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
