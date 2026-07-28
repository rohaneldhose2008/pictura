import { useState, useEffect } from 'react';
import { Clock, MapPin, SlidersHorizontal, CheckCircle2, Send, MessageSquare, FileText } from 'lucide-react';
import ReceiptModal from '../ReceiptModal';
import './BookingSection.css';

export default function BookingSection({ customPackageSummary }) {
  const [submitted, setSubmitted] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Photography',
    date: '',
    location: 'Townsville, QLD',
    message: ''
  });

  useEffect(() => {
    if (customPackageSummary) {
      const summaryText = `[BESPOKE PACKAGE CUSTOMIZATION]
Package Tier: ${customPackageSummary.tier}
Selected Services: ${customPackageSummary.services || 'Photography, Videography'}
Duration: ${customPackageSummary.duration}
Crew Size: ${customPackageSummary.crew}
Photo Deliverables: ${customPackageSummary.photoDeliverables}
Video Deliverables: ${customPackageSummary.videoEdits}
Add-ons: ${customPackageSummary.addOns}`;

      setFormData((prev) => ({
        ...prev,
        service: 'Bespoke Package',
        message: summaryText
      }));
    }
  }, [customPackageSummary]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const generatedReceipt = {
      receiptId: `PIC-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' }),
      clientName: formData.name || 'Valued Client',
      clientPhone: formData.phone || '+61 477 240 625',
      clientEmail: formData.email,
      eventDate: formData.date || 'To Be Scheduled',
      eventLocation: formData.location || 'Townsville, QLD',
      packageTitle: customPackageSummary?.tier || formData.service || 'Gold Package',
      duration: customPackageSummary?.duration || '4-6 Hours',
      crewText: customPackageSummary?.crew || '1 Photographer + 1 Videographer',
      photoCount: customPackageSummary?.photoDeliverables || '60 Retouched Photos',
      highlightFormat: customPackageSummary?.videoEdits || 'Horizontal (16:9 Cinema)',
      addons: customPackageSummary?.addOns ? [customPackageSummary.addOns] : [],
      notes: formData.message
    };

    setReceiptData(generatedReceipt);
    setShowReceipt(true);
  };

  const handleSendWhatsAppNotification = () => {
    const text = encodeURIComponent(
      `*NEW QUOTE REQUEST - PICTURA CREATIONS*\n` +
      `👤 Name: ${formData.name}\n` +
      `📧 Email: ${formData.email}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `📍 Location: ${formData.location}\n` +
      `📅 Date: ${formData.date}\n\n` +
      `*DETAILS:*\n${formData.message}`
    );
    window.open(`https://wa.me/61455974240?text=${text}`, '_blank');
  };

  return (
    <section id="booking" className="booking-section section-container dissolve-section">
      <div className="booking-grid">
        {/* Left Info Column */}
        <div className="booking-info-col">
          <div className="section-tag">BOOKING</div>
          <h2 className="section-title booking-main-title">
            BOOK A <span className="text-orange">SESSION</span>
          </h2>

          <div className="booking-feature-cards">
            <div className="b-feat-card">
              <div className="b-feat-icon">
                <Clock size={20} className="text-orange" />
              </div>
              <div>
                <h4 className="b-feat-title">Instant Notification</h4>
                <p className="b-feat-desc">Submissions trigger instant email & WhatsApp alerts</p>
              </div>
            </div>

            <div className="b-feat-card">
              <div className="b-feat-icon">
                <MapPin size={20} className="text-orange" />
              </div>
              <div>
                <h4 className="b-feat-title">Townsville, Queensland HQ</h4>
                <p className="b-feat-desc">Commissions across Queensland & Australia wide</p>
              </div>
            </div>

            <div className="b-feat-card">
              <div className="b-feat-icon">
                <SlidersHorizontal size={20} className="text-orange" />
              </div>
              <div>
                <h4 className="b-feat-title">100% Bespoke Solutions</h4>
                <p className="b-feat-desc">Tailored hours, crew, drones & edits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="booking-form-col">
          <form className="booking-form-card" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="form-success-state">
                <CheckCircle2 size={52} className="text-orange" />
                <h3>QUOTE REQUEST SENT!</h3>
                <p>Thank you, <strong>{formData.name || 'friend'}</strong>. Our production team has received your quote request and sent a confirmation alert.</p>

                <div className="notification-action-box">
                  <span className="notif-label">Digital Receipt & Notification Options:</span>
                  <button type="button" onClick={() => setShowReceipt(true)} className="whatsapp-alert-btn" style={{ background: 'rgba(255, 85, 0, 0.2)', border: '1px solid #FF5500', color: '#FFFFFF' }}>
                    <FileText size={18} />
                    <span>View Classic Digital Receipt</span>
                  </button>

                  <button type="button" onClick={handleSendWhatsAppNotification} className="whatsapp-alert-btn">
                    <MessageSquare size={18} />
                    <span>Send Copy to WhatsApp Instant Alert</span>
                  </button>

                  <button type="button" onClick={() => setSubmitted(false)} className="submit-another-btn">
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="input-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+61 400 000 000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label>Service Category</label>
                    <select name="service" value={formData.service} onChange={handleChange}>
                      <option value="Photography">Event Photography</option>
                      <option value="Cinematography">Cinematography</option>
                      <option value="Drone">Drone Aerial Shoot</option>
                      <option value="Live Stream">Live Streaming Broadcast</option>
                      <option value="Corporate">Corporate Package</option>
                      <option value="Bespoke Package">Bespoke Custom Package</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Event Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label>Location / City</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Townsville, QLD"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Customized Project Details & Parameters</label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Describe event scope, venue, style preferences, or custom parameters..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="request-quote-submit-btn">
                  <Send size={16} />
                  <span>GENERATE CLASSIC RECEIPT & BOOK</span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {showReceipt && receiptData && (
        <ReceiptModal bookingData={receiptData} onClose={() => setShowReceipt(false)} />
      )}
    </section>
  );
}
