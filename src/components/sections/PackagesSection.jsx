import { Check, Sparkles, Camera, Video, Crown, SlidersHorizontal } from 'lucide-react';
import './PackagesSection.css';

const PACKAGES_DATA = [
  {
    id: 'starter',
    name: 'SILVER PACKAGE',
    tierClass: 'tier-silver',
    tagline: 'Basic essential coverage for intimate events',
    duration: '2 Hours Coverage',
    icon: Camera,
    features: [
      '2 Hours Basic Coverage',
      '1 Photographer, 0 Video',
      '30 Retouched High-Res Photos',
      'Digital Copy Only'
    ],
    isFeatured: false
  },
  {
    id: 'professional',
    name: 'GOLD PACKAGE',
    tierClass: 'tier-gold',
    tagline: 'Comprehensive photo & highlight video experience',
    duration: '4-6 Hours Coverage',
    icon: Video,
    features: [
      '4-6 Hours Coverage',
      '1 Photographer, 1 Cinematographer',
      '60 Retouched High-Res Photos',
      '3-5 Min Highlight Video (Vertical or Horizontal)',
      'Digital Copy Included'
    ],
    isFeatured: true,
    badge: 'MOST POPULAR'
  },
  {
    id: 'enterprise',
    name: 'DIAMOND PACKAGE',
    tierClass: 'tier-diamond',
    tagline: 'Complete master production with drone cinema & USB',
    duration: '8-10 Hours Coverage',
    icon: Crown,
    features: [
      '8-10 Hours Coverage',
      '2 Photographers, 1 Cinematographer + Drone',
      '200 Retouched High-Res Photos',
      'Highlight Video x 2',
      'Custom USB Drive Included',
      'Optional Add-ons: Live Photobooth, AI QR Code, Album'
    ],
    isFeatured: false
  }
];

export default function PackagesSection({ onOpenCustomizer }) {
  return (
    <section id="packages" className="packages-section section-container dissolve-section">
      <div className="packages-header">
        <div className="section-tag">PACKAGES</div>
        <h2 className="section-title">
          OUR <span className="text-orange">PACKAGES</span>
        </h2>
        <p className="packages-sub-desc">
          Customize hours, crew size, drone coverage, video edits, and photo counts to craft your exact package.
        </p>
      </div>

      <div className="packages-grid-redesigned">
        {PACKAGES_DATA.map((pkg) => {
          const IconComp = pkg.icon;
          return (
            <div
              key={pkg.id}
              className={`pkg-card-redesigned ${pkg.tierClass} ${pkg.isFeatured ? 'pkg-card--featured' : ''}`}
            >
              {pkg.badge && <div className="pkg-featured-badge">{pkg.badge}</div>}

              <div className="pkg-top-head">
                <div className="pkg-icon-halo">
                  <IconComp size={24} className="pkg-icon-svg" />
                </div>
                <div>
                  <h3 className="pkg-title">{pkg.name}</h3>
                  <p className="pkg-tagline">{pkg.tagline}</p>
                </div>
              </div>

              <div className="pkg-duration-row">
                <span className="pkg-duration-badge">{pkg.duration}</span>
              </div>

              <ul className="pkg-features-list">
                {pkg.features.map((feat, idx) => (
                  <li key={idx}>
                    <div className="check-ring">
                      <Check size={14} className="check-icon-svg" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onOpenCustomizer && onOpenCustomizer(pkg)}
                className="pkg-action-btn"
              >
                <SlidersHorizontal size={16} />
                <span>BESPOKE PACKAGE</span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="packages-footer-note">
        <Sparkles size={16} className="text-orange" />
        <span>ALL PACKAGES ARE 100% CUSTOMIZABLE. ADD OR REMOVE HOURS, DRONES, CREW & EDITS FREELY.</span>
      </div>
    </section>
  );
}
