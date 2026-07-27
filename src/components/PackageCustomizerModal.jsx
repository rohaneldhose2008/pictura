import { useState } from 'react';
import { X, Check, Camera, Video, Sparkles } from 'lucide-react';
import './PackageCustomizerModal.css';

const ALL_SERVICES_LIST = [
  'Photography',
  'Videography',
  'Drone Cinema',
  'Corporate',
  'Advertising',
  'Short Film',
  'Functions',
  'Events',
  'Live Broadcast',
  'Realestate Photography'
];

export default function PackageCustomizerModal({ packageTier, onClose, onApplyCustomization }) {
  const tierId = (packageTier?.id || '').toLowerCase();
  const isStarter = tierId.includes('starter') || tierId.includes('silver');
  const isGold = tierId.includes('gold') || tierId.includes('professional');
  const isDiamond = tierId.includes('diamond') || tierId.includes('enterprise');

  // Selected Services (Default based on tier)
  const [selectedServices, setSelectedServices] = useState([
    'Photography',
    ...(isStarter ? [] : ['Videography']),
    ...(isDiamond ? ['Drone Cinema'] : [])
  ]);

  // Duration Options
  const [duration, setDuration] = useState(
    isDiamond ? '8-10 Hours (Full Day)' : isGold ? '4-6 Hours' : '2 Hours Basic Coverage'
  );

  // Crew Operators Configuration
  const [photographers, setPhotographers] = useState(isDiamond ? 2 : 1);
  const [videographers, setVideographers] = useState(isStarter ? 0 : 1);
  const [dronePilots, setDronePilots] = useState(isDiamond ? 1 : 0);

  // Photo Retouched Count (30, 60, 80, 100, 200)
  const [photoCount, setPhotoCount] = useState(
    isDiamond ? '200 Retouched Photos' : isGold ? '60 Retouched Photos' : '30 Retouched Photos'
  );

  // Cinematic Video Edits
  const [highlightFilm, setHighlightFilm] = useState(!isStarter);
  const [highlightOrientation, setHighlightOrientation] = useState('Horizontal & Vertical (Both)');
  const [extendedFeature, setExtendedFeature] = useState(isDiamond);
  const [sameDayEdit, setSameDayEdit] = useState(false);
  const [rawFootageDrive, setRawFootageDrive] = useState(isDiamond);

  // Add-ons & Extras
  const [livePhotobooth, setLivePhotobooth] = useState(false);
  const [aiQrSharing, setAiQrSharing] = useState(false);
  const [customUsb, setCustomUsb] = useState(isDiamond);
  const [printedAlbum, setPrintedAlbum] = useState(false);
  const [liveStream, setLiveStream] = useState(false);

  const toggleService = (svc) => {
    if (selectedServices.includes(svc)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== svc));
      }
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleConfirm = () => {
    const customSummary = {
      tier: packageTier?.name || 'Bespoke Package',
      services: selectedServices.join(', '),
      duration,
      crew: `${photographers} Photographer(s), ${videographers} Videographer(s), ${dronePilots} Drone Pilot(s)`,
      photoDeliverables: photoCount,
      videoEdits: [
        highlightFilm ? `3-5 Min Highlight Video (${highlightOrientation})` : null,
        extendedFeature ? '15-20 Min Extended Feature Film' : null,
        sameDayEdit ? 'Same-Day Edited Reel' : null,
        rawFootageDrive ? 'Uncut 4K Raw Footage SSD Drive' : null
      ].filter(Boolean).join(', ') || 'No Video Edits',
      addOns: [
        livePhotobooth ? 'Live Photobooth Station' : null,
        aiQrSharing ? 'AI Instant QR Code Guest Sharing' : null,
        customUsb ? 'Custom Engraved USB Flash Drive' : null,
        printedAlbum ? 'Hardcover Printed Album' : null,
        liveStream ? 'Live Broadcast Stream' : null
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
          <div className="customizer-tag font-display">BESPOKE PACKAGE BUILDER</div>
          <h2 className="customizer-title">
            CUSTOMIZE YOUR <span className="text-orange">{packageTier?.name || 'PACKAGE'}</span>
          </h2>
          <p className="customizer-subtitle">
            Select your desired services, duration, photographer/videographer crew size, photo count (30 to 200), video highlight edits & add-ons.
          </p>
        </div>

        <div className="customizer-body">
          {/* 1. SELECT SERVICES */}
          <div className="cust-block">
            <h4 className="cust-block-title">
              1. CHOOSE DESIRED SERVICES <span className="text-orange-req">(Select 1 or more)</span>
            </h4>
            <div className="cust-grid-services">
              {ALL_SERVICES_LIST.map((svc) => {
                const isSel = selectedServices.includes(svc);
                return (
                  <button
                    key={svc}
                    type="button"
                    className={`cust-svc-chip ${isSel ? 'selected' : ''}`}
                    onClick={() => toggleService(svc)}
                  >
                    <div className="chip-check">{isSel && <Check size={12} />}</div>
                    <span>{svc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. COVERAGE DURATION */}
          <div className="cust-block">
            <h4 className="cust-block-title">2. COVERAGE DURATION (HOURS)</h4>
            <div className="cust-grid-4">
              {[
                '2 Hours Basic Coverage',
                '3 Hours Coverage',
                '4-6 Hours Coverage',
                '8-10 Hours (Full Day)',
                '12+ Hours (Multi-Day)'
              ].map((dur) => (
                <button
                  key={dur}
                  type="button"
                  className={`cust-card-btn ${duration === dur ? 'selected' : ''}`}
                  onClick={() => setDuration(dur)}
                >
                  <span>{dur}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. CREW & OPERATOR CONFIGURATION */}
          <div className="cust-block">
            <h4 className="cust-block-title">3. CREW & OPERATOR COUNT</h4>
            <div className="crew-controls-grid">
              <div className="crew-box">
                <div className="crew-info">
                  <Camera size={18} className="text-orange" />
                  <div>
                    <span className="crew-title">Photographers</span>
                    <span className="crew-sub">Stills & Candid photo coverage</span>
                  </div>
                </div>
                <div className="counter-strip">
                  <button type="button" onClick={() => setPhotographers(Math.max(0, photographers - 1))}>-</button>
                  <span>{photographers}</span>
                  <button type="button" onClick={() => setPhotographers(Math.min(10, photographers + 1))}>+</button>
                </div>
              </div>

              <div className="crew-box">
                <div className="crew-info">
                  <Video size={18} className="text-orange" />
                  <div>
                    <span className="crew-title">Videographers</span>
                    <span className="crew-sub">4K Cinema video coverage</span>
                  </div>
                </div>
                <div className="counter-strip">
                  <button type="button" onClick={() => setVideographers(Math.max(0, videographers - 1))}>-</button>
                  <span>{videographers}</span>
                  <button type="button" onClick={() => setVideographers(Math.min(10, videographers + 1))}>+</button>
                </div>
              </div>

              <div className="crew-box">
                <div className="crew-info">
                  <Sparkles size={18} className="text-orange" />
                  <div>
                    <span className="crew-title">Drone Pilots</span>
                    <span className="crew-sub">Aerial 4K cinema coverage</span>
                  </div>
                </div>
                <div className="counter-strip">
                  <button type="button" onClick={() => setDronePilots(Math.max(0, dronePilots - 1))}>-</button>
                  <span>{dronePilots}</span>
                  <button type="button" onClick={() => setDronePilots(Math.min(4, dronePilots + 1))}>+</button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. RETOUCHED PHOTO COUNT */}
          <div className="cust-block">
            <h4 className="cust-block-title">4. RETOUCHED PHOTO COUNT</h4>
            <div className="cust-grid-5">
              {[
                '30 Retouched Photos',
                '60 Retouched Photos',
                '80 Retouched Photos',
                '100 Retouched Photos',
                '200 Retouched Photos'
              ].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  className={`cust-card-btn ${photoCount === cnt ? 'selected' : ''}`}
                  onClick={() => setPhotoCount(cnt)}
                >
                  <span>{cnt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. VIDEO EDITS & HIGHLIGHTS */}
          <div className="cust-block">
            <h4 className="cust-block-title">5. CINEMATIC VIDEO EDITS</h4>
            <div className="toggles-grid-2">
              <div className={`t-card ${highlightFilm ? 'active' : ''}`} onClick={() => setHighlightFilm(!highlightFilm)}>
                <div className="t-check">{highlightFilm && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">3-5 Min Highlight Film</h5>
                  <p className="t-sub">Color-graded cinematic reel set to music.</p>
                </div>
              </div>

              <div className={`t-card ${extendedFeature ? 'active' : ''}`} onClick={() => setExtendedFeature(!extendedFeature)}>
                <div className="t-check">{extendedFeature && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">15-20 Min Extended Feature</h5>
                  <p className="t-sub">Full documentary film of all speeches & key moments.</p>
                </div>
              </div>

              <div className={`t-card ${sameDayEdit ? 'active' : ''}`} onClick={() => setSameDayEdit(!sameDayEdit)}>
                <div className="t-check">{sameDayEdit && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">Same-Day Edited Reel</h5>
                  <p className="t-sub">Edited live on-site during event.</p>
                </div>
              </div>

              <div className={`t-card ${rawFootageDrive ? 'active' : ''}`} onClick={() => setRawFootageDrive(!rawFootageDrive)}>
                <div className="t-check">{rawFootageDrive && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">Uncut 4K Raw Footage SSD</h5>
                  <p className="t-sub">Full original unedited camera footage delivered on SSD.</p>
                </div>
              </div>
            </div>

            {highlightFilm && (
              <div className="sub-option-box">
                <label>Highlight Reel Format Preference:</label>
                <div className="radio-pills-row">
                  {['Vertical (Instagram/Reels)', 'Horizontal (16:9 Cinema)', 'Horizontal & Vertical (Both)'].map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      className={`pill-radio-btn ${highlightOrientation === fmt ? 'active' : ''}`}
                      onClick={() => setHighlightOrientation(fmt)}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 6. ADD-ONS & EXTRAS */}
          <div className="cust-block">
            <h4 className="cust-block-title">6. SPECIAL ADD-ONS & DELIVERABLES</h4>
            <div className="toggles-grid-2">
              <div className={`t-card ${livePhotobooth ? 'active' : ''}`} onClick={() => setLivePhotobooth(!livePhotobooth)}>
                <div className="t-check">{livePhotobooth && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">Live Photobooth Station</h5>
                  <p className="t-sub">Interactive guest photo booth with live prints.</p>
                </div>
              </div>

              <div className={`t-card ${aiQrSharing ? 'active' : ''}`} onClick={() => setAiQrSharing(!aiQrSharing)}>
                <div className="t-check">{aiQrSharing && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">AI Instant QR Code Guest Gallery</h5>
                  <p className="t-sub">Guests scan QR code to instantly find & download photos.</p>
                </div>
              </div>

              <div className={`t-card ${printedAlbum ? 'active' : ''}`} onClick={() => setPrintedAlbum(!printedAlbum)}>
                <div className="t-check">{printedAlbum && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">Hardcover Printed Album Keepsake</h5>
                  <p className="t-sub">Custom designed Italian leather or linen album.</p>
                </div>
              </div>

              <div className={`t-card ${customUsb ? 'active' : ''}`} onClick={() => setCustomUsb(!customUsb)}>
                <div className="t-check">{customUsb && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">Custom Engraved USB Drive Box</h5>
                  <p className="t-sub">Wooden or acrylic keepsake USB box with all media.</p>
                </div>
              </div>

              <div className={`t-card ${liveStream ? 'active' : ''}`} onClick={() => setLiveStream(!liveStream)}>
                <div className="t-check">{liveStream && <Check size={14} className="text-orange" />}</div>
                <div>
                  <h5 className="t-head">4K Multi-Cam Live Broadcast</h5>
                  <p className="t-sub">Stream live for family and guests anywhere worldwide.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="customizer-footer">
          <button type="button" onClick={handleConfirm} className="proceed-custom-package-btn">
            CONFIRM & APPLY BESPOKE SELECTIONS
          </button>
        </div>
      </div>
    </div>
  );
}
