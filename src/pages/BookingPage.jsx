import { useState } from 'react';
import CurvedInput from '../components/CurvedInput';
import CalendarPicker from '../components/CalendarPicker';
import LiquidGlassCard from '../components/LiquidGlassCard';
import { Calendar, CheckCircle2, Calculator, Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import './BookingPage.css';

const PACKAGES_PRICING = [
  { name: 'Royal Heritage Wedding', basePrice: 450000 },
  { name: 'Cinematic Pre-Wedding Luxe', basePrice: 175000 },
  { name: 'Brand Visionary Campaign', basePrice: 285000 },
  { name: '4K Multi-Cam Broadcast', basePrice: 220000 },
  { name: 'Architectural Estate Showcase', basePrice: 145000 }
];

const ADDONS_LIST = [
  { id: 'drone', name: '8K Heavy-Lift FPV Drone Aerials', price: 45000 },
  { id: 'livestream', name: '4K Multi-Platform Live Broadcast Feed', price: 65000 },
  { id: 'album', name: 'Italian Handcrafted Leather Album (50 Pgs)', price: 35000 },
  { id: 'sameday', name: '24-Hour Express Social Media Teaser', price: 25000 },
  { id: 'raw', name: 'Full Uncompressed RAW Masters Drive', price: 30000 }
];

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceIndex: 0,
    date: '2026-11-15',
    notes: '',
    selectedAddons: ['drone', 'album']
  });

  const [submitted, setSubmitted] = useState(false);

  const currentPackage = PACKAGES_PRICING[formData.serviceIndex];
  const addonsCost = formData.selectedAddons.reduce((sum, addonId) => {
    const found = ADDONS_LIST.find(a => a.id === addonId);
    return sum + (found ? found.price : 0);
  }, 0);

  const totalEstimate = currentPackage.basePrice + addonsCost;

  const toggleAddon = (id) => {
    setFormData(prev => {
      const exists = prev.selectedAddons.includes(id);
      return {
        ...prev,
        selectedAddons: exists
          ? prev.selectedAddons.filter(a => a !== id)
          : [...prev.selectedAddons, id]
      };
    });
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.name) {
      alert('Please enter your name and email address to complete your reservation.');
      return;
    }
    setSubmitted(true);
  };

  const formatINR = (val) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Pictura Team! I would like to book a shoot reservation for ${formData.name || 'Client'}.\n\nDate: ${formData.date}\nService: ${currentPackage.name}\nEstimated Budget: ${formatINR(totalEstimate)}\nNotes: ${formData.notes || 'None'}`
  );

  return (
    <div className="page-container page-fade-in">
      <div className="page-header">
        <div className="hero-badge">
          <Calculator size={14} />
          <span>REAL-TIME ESTIMATOR & RESERVATION</span>
        </div>
        <h1 className="page-title">
          CALCULATE & <span className="text-gradient">BOOK SHOOT</span>
        </h1>
        <p className="page-subtitle">
          Select your event shoot date, tailor your camera add-ons, and calculate your real-time budget estimate.
        </p>
      </div>

      {!submitted ? (
        <div className="booking-content-grid">
          <LiquidGlassCard className="booking-form-card">
            <div className="curved-form-layout">
              <div className="form-group">
                <label className="input-label">1. SELECT SHOOT EVENT DATE</label>
                <CalendarPicker
                  selectedDate={formData.date}
                  onSelectDate={(d) => setFormData(prev => ({ ...prev, date: d }))}
                />
              </div>

              <div className="form-group margin-top-30">
                <label className="input-label">2. FULL NAME / ROYAL FAMILY / BRAND</label>
                <CurvedInput
                  type="text"
                  placeholder="e.g. Ananya & Rohan Sharma"
                  showButton={false}
                  value={formData.name}
                  onChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
                  theme="dark"
                  bend={16}
                  height={54}
                />
              </div>

              <div className="form-group margin-top-20">
                <label className="input-label">3. EMAIL ADDRESS</label>
                <CurvedInput
                  type="email"
                  placeholder="rohan@picturastudio.com"
                  showButton={false}
                  value={formData.email}
                  onChange={(val) => setFormData(prev => ({ ...prev, email: val }))}
                  theme="dark"
                  bend={16}
                  height={54}
                />
              </div>

              <div className="form-group margin-top-20">
                <label className="input-label">4. PHONE / WHATSAPP NUMBER</label>
                <CurvedInput
                  type="tel"
                  placeholder="+91 94468 02570"
                  showButton={false}
                  value={formData.phone}
                  onChange={(val) => setFormData(prev => ({ ...prev, phone: val }))}
                  theme="dark"
                  bend={16}
                  height={54}
                />
              </div>

              <div className="form-group margin-top-20">
                <label className="input-label">5. SELECT BESPOKE PACKAGE TIER</label>
                <div className="select-chips-grid">
                  {PACKAGES_PRICING.map((pkg, idx) => (
                    <button
                      type="button"
                      key={pkg.name}
                      className={`select-chip ${formData.serviceIndex === idx ? 'select-chip--active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, serviceIndex: idx }))}
                    >
                      {pkg.name} ({formatINR(pkg.basePrice)})
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons Selector */}
              <div className="form-group margin-top-20">
                <label className="input-label">6. TAILOR CREATIVE ADD-ONS</label>
                <div className="addons-grid">
                  {ADDONS_LIST.map(addon => {
                    const isChecked = formData.selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        className={`addon-card ${isChecked ? 'addon-card--active' : ''}`}
                        onClick={() => toggleAddon(addon.id)}
                      >
                        <div className="addon-check">
                          {isChecked ? <CheckCircle2 size={16} className="text-orange" /> : <div className="addon-dot" />}
                        </div>
                        <div className="addon-info">
                          <span className="addon-title">{addon.name}</span>
                          <span className="addon-price">+{formatINR(addon.price)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="form-group margin-top-30">
                <label className="input-label">7. SPECIAL CREATIVE REQUIREMENTS / VENUE</label>
                <CurvedInput
                  type="text"
                  placeholder="e.g. 3-Day Wedding at Le Méridien Kochi / Udaipur Palace"
                  buttonText="SUBMIT RESERVATION"
                  onSubmit={handleSubmit}
                  value={formData.notes}
                  onChange={(val) => setFormData(prev => ({ ...prev, notes: val }))}
                  theme="dark"
                  bend={20}
                  height={62}
                />
              </div>
            </div>
          </LiquidGlassCard>

          {/* Real-time Summary & Calculator Card */}
          <div className="booking-summary-sidebar">
            <LiquidGlassCard className="summary-card">
              <h3><Calculator size={18} className="text-orange" /> REAL-TIME ESTIMATOR</h3>
              
              <div className="summary-list margin-top-20">
                <div className="summary-item">
                  <span className="label">Shoot Date:</span>
                  <span className="val text-orange">{formData.date || 'Not Selected'}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Selected Tier:</span>
                  <span className="val">{currentPackage.name}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Base Package:</span>
                  <span className="val">{formatINR(currentPackage.basePrice)}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Add-ons ({formData.selectedAddons.length}):</span>
                  <span className="val">{formatINR(addonsCost)}</span>
                </div>

                <div className="summary-total-banner margin-top-20">
                  <span className="total-label">TOTAL ESTIMATED BUDGET</span>
                  <div className="total-amount text-orange">{formatINR(totalEstimate)}</div>
                  <span className="total-tax">Approx. ${(totalEstimate / 82).toFixed(0)} USD</span>
                </div>
              </div>

              <div className="direct-whatsapp-box margin-top-20">
                <a
                  href={`https://wa.me/919446802570?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-direct-btn"
                >
                  <MessageSquare size={18} />
                  <span>DIRECT WHATSAPP BOOKING</span>
                </a>
              </div>

              <div className="guarantee-box margin-top-16">
                <ShieldCheck size={16} className="text-orange" />
                <span>100% Date Reservation Guarantee. Our executive team responds within 2 hours.</span>
              </div>
            </LiquidGlassCard>
          </div>
        </div>
      ) : (
        <LiquidGlassCard className="success-confirmation-box">
          <div className="success-icon">
            <CheckCircle2 size={64} className="text-orange" />
          </div>
          <h2>RESERVATION REQUEST RECEIVED!</h2>
          <p>
            Thank you, <strong>{formData.name}</strong>. Your shoot reservation for <strong>{currentPackage.name}</strong> on <strong>{formData.date}</strong> has been received.
          </p>
          <div className="estimated-recap-box margin-top-20">
            <span>Calculated Investment Estimate: <strong>{formatINR(totalEstimate)}</strong></span>
          </div>
          <p className="sub-text margin-top-16">
            A formal contract schedule has been sent to <u>{formData.email}</u>.
          </p>

          <div className="actions-row margin-top-20">
            <a
              href={`https://wa.me/919446802570?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="cta-primary-btn"
            >
              <MessageSquare size={18} />
              <span>CHAT ON WHATSAPP (+91 94468 02570)</span>
            </a>
            <button className="cta-secondary-btn" onClick={() => setSubmitted(false)}>
              <span>Submit Another Inquiry</span>
            </button>
          </div>
        </LiquidGlassCard>
      )}
    </div>
  );
}

