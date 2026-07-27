import { Check, Sparkles, Camera, Video, Crown, SlidersHorizontal } from 'lucide-react';
import './PackagesSection.css';

const PACKAGES_DATA = [
  {
    id: 'starter',
    name: 'SILVER PACKAGE',
    tierClass: 'tier-silver',
    tagline: 'Customizable intimate event & portrait session',
    duration: '2-3 Hours Coverage (Customizable)',
    icon: Camera,
    features: [
      '2-3 Hours On-Site Coverage (Adjustable)',
      '0 Photographers, 1 Videographer (Default)',
      '20+ Retouched High-Res Photos',
      'Custom Video Edits (Addable/Deletable)',
      'No Physical Album (Digital Only)',
      'Custom Crew & Equipment Upgrades'
    ],
    isFeatured: false
  },
  {
    id: 'professional',
    name: 'GOLD PACKAGE',
    tierClass: 'tier-gold',
    tagline: 'Customizable photo & cinema video experience',
    duration: '4-6 Hours Master Production (Customizable)',
    icon: Video,
    features: [
      '4-6 Hours Coverage (Adjustable)',
      '1 Photographer, 1 Videographer Included',
      '50+ Retouched High-Res Photos',
      '3-5 Min Cinematic Highlight Reel Included',
      '15-20 Min Extended Feature Film (Optional)',
      '4K Multi-Cam Live Streaming (Addable)'
    ],
    isFeatured: true,
    badge: 'MOST POPULAR'
  },
  {
    id: 'enterprise',
    name: 'DIAMOND PACKAGE',
    tierClass: 'tier-diamond',
    tagline: 'Full day royal production & multi-cam live stream',
    duration: '8-10 Hours Master Commission (Customizable)',
    icon: Crown,
    features: [
      '8-10 Hours Full-Day Coverage (Adjustable)',
      '2 Photographers, 1 Videographer, 1 Drone Pilot',
      '800+ Master Retouched Photos',
      '3-5 Min Highlight + 15-20 Min Feature Film',
      '1 Italian Leather Hardcover Album Included',
      '4K Multi-Camera Live Stream Included'
    ],
    isFeatured: false
  }
];

export default function PackagesSection({ onOpenCustomizer }) {
  return (
    <section id="packages" className="packages-section section-container dissolve-section">
      <div className="packages-header">
        <div className="section-tag">OUR PACKAGES</div>
        <h2 className="section-title">
          BESPOKE PACKAGES <span className="text-orange">TAILORED FOR YOU</span>
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
