import { useState, useEffect } from 'react';
import { Clock, MapPin, SlidersHorizontal, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import './BookingSection.css';

export default function BookingSection({ customPackageSummary }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Photography',
    date: '',
    location: '',
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
Add-ons & Deliverables: ${customPackageSummary.addOns}`;

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
          <div className="section-tag">BESPOKE BOOKING</div>
          <h2 className="section-title booking-main-title">
            LET'S CREATE SOMETHING <span className="text-orange">AMAZING TOGETHER</span>
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
                  <span className="notif-label">Instant Notification Dispatch Options:</span>
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
                      <option value="Videography">Videography & Cinema</option>
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
                      placeholder="Brisbane, QLD"
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
                  <span>SUBMIT BESPOKE QUOTE REQUEST</span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
