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
    service: '',
    date: '',
    budget: '',
    location: 'Townsville, QLD',
    message: ''
  });

  useEffect(() => {
    if (customPackageSummary) {
      const summaryText = `[BESPOKE PACKAGE CUSTOMIZATION]
Package Tier: ${customPackageSummary.tier}
Selected Services: ${customPackageSummary.services || 'Photography, Cinematography'}
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

  const scrollToPackages = (e) => {
    e.preventDefault();
    const el = document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const receiptId = `PIC-${Math.floor(100000 + Math.random() * 900000)}`;
    const issuedDate = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });

    const generatedReceipt = {
      receiptId,
      date: issuedDate,
      clientName: formData.name || 'Valued Client',
      clientPhone: formData.phone || '+61 477 240 625',
      clientEmail: formData.email,
      eventDate: formData.date || 'To Be Scheduled',
      eventLocation: formData.location || 'Townsville, QLD',
      packageTitle: customPackageSummary?.tier || formData.service || 'Bespoke Package Selection',
      duration: customPackageSummary?.duration || 'Standard Session',
      crewText: customPackageSummary?.crew || '1 Photographer + 1 Cinematographer',
      photoCount: customPackageSummary?.photoDeliverables || 'Retouched Photos Included',
      highlightFormat: customPackageSummary?.videoEdits || 'Cinematic Film',
      addons: customPackageSummary?.addOns ? [customPackageSummary.addOns] : [],
      notes: formData.message
    };

    setReceiptData(generatedReceipt);
    setShowReceipt(true);

    // Submit lead directly to Google Sheets API
    const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw5gc0lQyn9CrhcYyiT2puWVKgVhvLL0GQumKzZRAWfQrMHiF1r6kRosRriWOfQW8Y_/exec';
    
    try {
      const payload = new URLSearchParams();
      payload.append('receiptId', receiptId);
      payload.append('name', formData.name || '');
      payload.append('phone', formData.phone || '');
      payload.append('email', formData.email || '');
      payload.append('date', formData.date || '');
      payload.append('budget', formData.budget || '');
      payload.append('location', formData.location || '');
      payload.append('service', customPackageSummary?.tier || formData.service || 'Bespoke Selection');
      payload.append('message', formData.message || '');

      fetch(GOOGLE_SHEETS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload.toString()
      }).catch((err) => console.log('Google Sheets sync:', err));
    } catch (e) {
      console.log('Google Sheets post error:', e);
    }

    // Formatted Receipt text for WhatsApp
    const receiptText =
      `🧾 *PICTURA CREATIONS - OFFICIAL BOOKING RECEIPT*\n` +
      `─────────────────────────────\n` +
      `📋 *Receipt ID:* #${receiptId}\n` +
      `📅 *Date Issued:* ${issuedDate}\n` +
      `👤 *Client Name:* ${formData.name || 'Valued Client'}\n` +
      `📞 *Phone Number:* ${formData.phone}\n` +
      `✉️ *Email Address:* ${formData.email}\n` +
      `📆 *Event Date:* ${formData.date || 'To Be Scheduled'}\n` +
      `📍 *Location:* ${formData.location || 'Townsville, QLD'}\n` +
      `📌 *Selected Package:* ${customPackageSummary?.tier || formData.service || 'Bespoke Package Selection'}\n` +
      (formData.budget ? `💰 *Budget Preference:* ${formData.budget}\n` : '') +
      (customPackageSummary?.duration ? `⏱️ *Duration:* ${customPackageSummary.duration}\n` : '') +
      (customPackageSummary?.crew ? `🎥 *Crew:* ${customPackageSummary.crew}\n` : '') +
      (customPackageSummary?.photoDeliverables ? `📸 *Photos:* ${customPackageSummary.photoDeliverables}\n` : '') +
      (customPackageSummary?.videoEdits ? `🎞️ *Edits:* ${customPackageSummary.videoEdits}\n` : '') +
      (customPackageSummary?.addOns ? `✨ *Add-ons:* ${customPackageSummary.addOns}\n` : '') +
      (formData.message ? `📝 *Notes / Details:* ${formData.message}\n` : '') +
      `─────────────────────────────\n` +
      `✅ *Status:* CONFIRMED BOOKING REQUEST\n` +
      `Thank you for choosing Pictura Creations! We look forward to capturing your visual story.`;

    const encoded = encodeURIComponent(receiptText);
    window.open(`https://wa.me/61477240625?text=${encoded}`, '_blank');
  };

  const handleSendWhatsAppNotification = () => {
    if (!receiptData) return;
    const receiptId = receiptData.receiptId || `PIC-${Math.floor(100000 + Math.random() * 900000)}`;
    const issuedDate = receiptData.date || new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });

    const receiptText =
      `🧾 *PICTURA CREATIONS - OFFICIAL BOOKING RECEIPT*\n` +
      `─────────────────────────────\n` +
      `📋 *Receipt ID:* #${receiptId}\n` +
      `📅 *Date Issued:* ${issuedDate}\n` +
      `👤 *Client Name:* ${formData.name || 'Valued Client'}\n` +
      `📞 *Phone Number:* ${formData.phone}\n` +
      `✉️ *Email Address:* ${formData.email}\n` +
      `📆 *Event Date:* ${formData.date || 'To Be Scheduled'}\n` +
      `📍 *Location:* ${formData.location || 'Townsville, QLD'}\n` +
      `📌 *Selected Package:* ${customPackageSummary?.tier || formData.service || 'Bespoke Package Selection'}\n` +
      (formData.budget ? `💰 *Budget Preference:* ${formData.budget}\n` : '') +
      (customPackageSummary?.duration ? `⏱️ *Duration:* ${customPackageSummary.duration}\n` : '') +
      (customPackageSummary?.crew ? `🎥 *Crew:* ${customPackageSummary.crew}\n` : '') +
      (customPackageSummary?.photoDeliverables ? `📸 *Photos:* ${customPackageSummary.photoDeliverables}\n` : '') +
      (customPackageSummary?.videoEdits ? `🎞️ *Edits:* ${customPackageSummary.videoEdits}\n` : '') +
      (customPackageSummary?.addOns ? `✨ *Add-ons:* ${customPackageSummary.addOns}\n` : '') +
      (formData.message ? `📝 *Notes / Details:* ${formData.message}\n` : '') +
      `─────────────────────────────\n` +
      `✅ *Status:* CONFIRMED BOOKING REQUEST\n` +
      `Thank you for choosing Pictura Creations! We look forward to capturing your visual story.`;

    const encoded = encodeURIComponent(receiptText);
    window.open(`https://wa.me/61477240625?text=${encoded}`, '_blank');
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
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+61 477 240 625"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Service Category</label>
                    <select name="service" value={formData.service} onChange={handleChange}>
                      <option value="">-- Choose a Service --</option>
                      <option value="Photography">Event Photography</option>
                      <option value="Cinematography">Cinematography</option>
                      <option value="Drone">Drone Aerial Shoot</option>
                      <option value="Live Stream">Live Streaming Broadcast</option>
                      <option value="Corporate">Corporate Package</option>
                      <option value="Bespoke Package">Bespoke Custom Package</option>
                    </select>
                    <p style={{ fontSize: '0.78rem', marginTop: '6px', color: 'rgba(255, 255, 255, 0.7)' }}>
                      Please select your package from{' '}
                      <button
                        type="button"
                        onClick={scrollToPackages}
                        style={{
                          color: '#FF5500',
                          fontWeight: 'bold',
                          textDecoration: 'underline',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          fontSize: 'inherit'
                        }}
                      >
                        our packages
                      </button>
                    </p>
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Event Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Select Your Budget (Optional)</label>
                    <select name="budget" value={formData.budget} onChange={handleChange}>
                      <option value="">-- Choose Budget Range (Optional) --</option>
                      <option value="Under $1,500 AUD">Under $1,500 AUD</option>
                      <option value="$1,500 - $3,000 AUD">$1,500 - $3,000 AUD</option>
                      <option value="$3,000 - $5,000 AUD">$3,000 - $5,000 AUD</option>
                      <option value="$5,000+ AUD">$5,000+ AUD</option>
                      <option value="Flexible / To Be Discussed">Flexible / To Be Discussed</option>
                    </select>
                  </div>
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

                <div className="input-group">
                  <label>Customized Project Details & Parameters</label>
                  <textarea
                    name="message"
                    rows="4"
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
