import { useState } from 'react';
import { X, Check, Camera, Video, Sparkles, Radio, AlertCircle } from 'lucide-react';
import './PackageCustomizerModal.css';

export default function PackageCustomizerModal({ packageTier, onClose, onApplyCustomization }) {
  const tierId = (packageTier?.id || '').toLowerCase();
  const isStarter = tierId.includes('starter');
  const isProfessional = tierId.includes('professional');
  const isRoyal = tierId.includes('enterprise') || tierId.includes('royal');

  // Event Category is REQUIRED (empty by default)
  const [eventType, setEventType] = useState('');
  const [warningMsg, setWarningMsg] = useState('');

  // Tier-specific Defaults
  const [duration, setDuration] = useState(
    isRoyal ? '8-10 Hours (Full Day)' : isProfessional ? '4-6 Hours (Half Day)' : '2-3 Hours (Intimate)'
  );

  const [photographers, setPhotographers] = useState(
    isRoyal ? 2 : isProfessional ? 1 : 0
  );

  const [videographers, setVideographers] = useState(1);

  const [dronePilots, setDronePilots] = useState(
    isRoyal ? 1 : 0
  );

  // Video Edits Defaults
  const [highlightFilm, setHighlightFilm] = useState(!isStarter);
  const [extendedFeature, setExtendedFeature] = useState(isRoyal);
  const [sameDayEdit, setSameDayEdit] = useState(false);
  const [rawFootageDrive, setRawFootageDrive] = useState(false);

  // Photo Count Defaults
  const [photoCount, setPhotoCount] = useState(
    isRoyal ? '200 Retouched High-Res Photos' : isProfessional ? '60 Retouched High-Res Photos' : '30 Retouched High-Res Photos'
  );

  // Add-ons & Extra Toggles
  const [livePhotobooth, setLivePhotobooth] = useState(false);
  const [aiQrSharing, setAiQrSharing] = useState(false);
  const [customUsb, setCustomUsb] = useState(isRoyal);
  const [printedAlbum, setPrintedAlbum] = useState(false);
  const [liveStream, setLiveStream] = useState(false);

  const requireCategoryCheck = (actionFn) => {
    if (!eventType) {
      setWarningMsg('⚠️ Please select an Event Category & Production Style first!');
      return;
    }
    setWarningMsg('');
    if (actionFn) actionFn();
  };

  const handleSelectEventType = (type) => {
    setEventType(type);
    setWarningMsg('');
  };

  const handleConfirm = () => {
    if (!eventType) {
      setWarningMsg('⚠️ Event Category is required. Please select an Event Category to proceed.');
      return;
    }

    const customSummary = {
      tier: packageTier?.name || 'Bespoke Package',
      eventType,
      duration,
      crew: `${photographers} Photographer(s), ${videographers} Videographer(s), ${dronePilots} Drone Pilot(s)`,
      videoEdits: [
        highlightFilm ? '3-5 Min Cinematic Highlight Trailer' : null,
        extendedFeature ? '15-20 Min Extended Feature Film' : null,
        sameDayEdit ? 'Same-Day Edited Reel' : null,
        rawFootageDrive ? 'Uncut 4K Raw Footage SSD Drive' : null
      ].filter(Boolean).join(', ') || 'No Video Edits Selected',
      photoDeliverables: `${photoCount}`,
      upgrades: [
        livePhotobooth ? 'Live Photobooth Station' : null,
        aiQrSharing ? 'AI Instant QR Code Guest Sharing' : null,
        customUsb ? 'Custom Engraved USB Flash Drive' : null,
        printedAlbum ? 'Hardcover Printed Album' : null,
        liveStream ? '4K Multi-Cam Live Stream Broadcast' : null
      ].filter(Boolean).join(', ') || 'Standard Digital Delivery'
    };

    if (onApplyCustomization) {
      onApplyCustomization(customSummary);
    }
  };

  return (
    <div className="customizer-backdrop" onClick={onClose}>
      <div className="customizer-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="customizer-close-btn" onClick={onClose} aria-label="Close customizer">
          <X size={22} />
        </button>

        {/* Modal Header */}
        <div className="customizer-header">
          <div className="customizer-tag font-display">BESPOKE CUSTOMIZER ENGINE</div>
          <h2 className="customizer-title">
            CUSTOMIZE YOUR <span className="text-orange">{packageTier?.name || 'PACKAGE'}</span>
          </h2>
          <p className="customizer-subtitle">
            Configure duration, crew count, drone, video, photo count, and streaming to match your exact event.
          </p>

          {/* Validation Warning Alert */}
          {warningMsg && (
            <div className="customizer-warning-banner">
              <AlertCircle size={18} />
              <span>{warningMsg}</span>
            </div>
          )}
        </div>

        <div className="customizer-body">
          {/* 1. Event Category (REQUIRED - Empty by default) */}
          <div className="cust-block">
            <h4 className="cust-block-title">
              1. EVENT CATEGORY & PRODUCTION STYLE <span className="text-orange-req">* (REQUIRED)</span>
            </h4>
            <div className="cust-grid-4">
              {[
                'Royal Wedding / Celebration',
                'Pre-Wedding Romantic Cinema',
                'Corporate Gala & Keynote',
                'Fashion Editorial & Model'
              ].map((type) => (
                <button
                  key={type}
                  className={`cust-card-btn ${eventType === type ? 'selected' : ''}`}
                  onClick={() => handleSelectEventType(type)}
                >
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Coverage Duration */}
          <div className="cust-block">
            <h4 className="cust-block-title">2. COVERAGE DURATION</h4>
            <div className="cust-grid-4">
              {[
                '2-3 Hours (Intimate)',
                '4-6 Hours (Half Day)',
                '8-10 Hours (Full Day)',
                '12+ Hours (Multi-Day Royal)'
              ].map((dur) => (
                <button
                  key={dur}
                  className={`cust-card-btn ${duration === dur ? 'selected' : ''}`}
                  onClick={() => requireCategoryCheck(() => setDuration(dur))}
                >
                  <span>{dur}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Crew Count Controls */}
          <div className="cust-block">
            <h4 className="cust-block-title">3. CREW & OPERATOR CONFIGURATION</h4>
            <div className="crew-controls-grid">
              <div className="crew-box">
                <div className="crew-info">
                  <Camera size={18} className="text-orange" />
                  <div>
                    <span className="crew-title">Photographers</span>
                    <span className="crew-sub">Lead candid & portrait cameras</span>
                  </div>
                </div>
                <div className="counter-strip">
                  <button onClick={() => requireCategoryCheck(() => setPhotographers(Math.max(0, photographers - 1)))}>-</button>
                  <span>{photographers}</span>
                  <button onClick={() => requireCategoryCheck(() => setPhotographers(Math.min(10, photographers + 1)))}>+</button>
                </div>
              </div>

              <div className="crew-box">
                <div className="crew-info">
                  <Video size={18} className="text-orange" />
                  <div>
                    <span className="crew-title">Videographers</span>
                    <span className="crew-sub">4K Cinema camera operators</span>
                  </div>
                </div>
                <div className="counter-strip">
                  <button onClick={() => requireCategoryCheck(() => setVideographers(Math.max(0, videographers - 1)))}>-</button>
                  <span>{videographers}</span>
                  <button onClick={() => requireCategoryCheck(() => setVideographers(Math.min(10, videographers + 1)))}>+</button>
                </div>
              </div>

              <div className="crew-box">
                <div className="crew-info">
                  <Sparkles size={18} className="text-orange" />
                  <div>
                    <span className="crew-title">Drone Pilots</span>
                    <span className="crew-sub">CASA licensed aerial pilots</span>
                  </div>
                </div>
                <div className="counter-strip">
                  <button onClick={() => requireCategoryCheck(() => setDronePilots(Math.max(0, dronePilots - 1)))}>-</button>
                  <span>{dronePilots}</span>
                  <button onClick={() => requireCategoryCheck(() => setDronePilots(Math.min(4, dronePilots + 1)))}>+</button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Cinema Video Deliverables */}
          <div className="cust-block">
            <h4 className="cust-block-title">4. CINEMATIC VIDEO EDITS & FOOTAGE</h4>
            <div className="toggles-grid-2">
              <div className={`t-card ${highlightFilm ? 'active' : ''}`} onClick={() => requireCategoryCheck(() => setHighlightFilm(!highlightFilm))}>
                <div className="t-check">{highlightFilm && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">3-5 Min Highlight Trailer</h5>
                  <p className="t-sub">Color-graded cinematic short set to licensed music.</p>
                </div>
              </div>

              <div className={`t-card ${extendedFeature ? 'active' : ''}`} onClick={() => requireCategoryCheck(() => setExtendedFeature(!extendedFeature))}>
                <div className="t-check">{extendedFeature && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">15-20 Min Extended Feature Film</h5>
                  <p className="t-sub">Full documentary film covering key speeches & moments.</p>
                </div>
              </div>

              <div className={`t-card ${sameDayEdit ? 'active' : ''}`} onClick={() => requireCategoryCheck(() => setSameDayEdit(!sameDayEdit))}>
                <div className="t-check">{sameDayEdit && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">Same-Day Edited Reel</h5>
                  <p className="t-sub">Edited live on-site and presented at the event.</p>
                </div>
              </div>

              <div className={`t-card ${rawFootageDrive ? 'active' : ''}`} onClick={() => requireCategoryCheck(() => setRawFootageDrive(!rawFootageDrive))}>
                <div className="t-check">{rawFootageDrive && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">Uncut 4K Raw Footage SSD Drive</h5>
                  <p className="t-sub">Full original unedited camera footage delivered on SSD.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Photo Deliverables & Albums */}
          <div className="cust-block">
            <h4 className="cust-block-title">5. PHOTOGRAPHY DELIVERABLES & ALBUMS</h4>
            <div className="cust-grid-2">
              <div className="cust-sub-group">
                <label>Retouched Photos Count</label>
                <select
                  value={photoCount}
                  onChange={(e) => requireCategoryCheck(() => setPhotoCount(e.target.value))}
                >
                  <option value="20+ Retouched Photos">20+ Retouched Photos</option>
                  <option value="50+ Retouched Photos">50+ Retouched Photos</option>
                  <option value="80+ Retouched Photos">80+ Retouched Photos</option>
                  <option value="100+ Retouched Photos">100+ Retouched Photos</option>
                  <option value="800+ Retouched Photos">800+ Retouched Photos</option>
                </select>
              </div>

              <div className="cust-sub-group">
                <label>Printed Album Keepsake</label>
                <select
                  value={leatherAlbums}
                  onChange={(e) => requireCategoryCheck(() => setLeatherAlbums(e.target.value))}
                >
                  <option value="No Physical Album (Digital Only)">No Physical Album (Digital Only)</option>
                  <option value="1 Italian Leather Hardcover Album">1 Italian Leather Hardcover Album</option>
                  <option value="3 Album Heirloom Set (Main + Parent Albums)">3 Album Heirloom Set (Main + Parent Albums)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 6. Broadcast Live Streaming */}
          <div className="cust-block">
            <h4 className="cust-block-title">6. BROADCAST LIVE STREAMING</h4>
            <div className="t-card-full">
              <div className={`t-card ${liveStream ? 'active' : ''}`} onClick={() => requireCategoryCheck(() => setLiveStream(!liveStream))}>
                <div className="t-check">{liveStream && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">4K Multi-Cam Live Streaming</h5>
                  <p className="t-sub">Live 4K broadcast stream for international family & guests.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="customizer-footer">
          <button onClick={handleConfirm} className="proceed-custom-package-btn">
            CONFIRM & PROCEED TO BESPOKE BOOKING
          </button>
        </div>
      </div>
    </div>
  );
}
