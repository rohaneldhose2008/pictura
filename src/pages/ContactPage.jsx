import { useState } from 'react';
import LiquidGlassCard from '../components/LiquidGlassCard';
import { Mail, Phone, MapPin, Send, ChevronDown, MessageSquare, Globe, Clock } from 'lucide-react';
import './ContactPage.css';

const FAQS = [
  {
    q: 'What is your average delivery timeline for raw and retouched photography?',
    a: 'We deliver an Express Teaser Pack (30 retouched stills + social trailer) within 24-48 hours. Your complete high-resolution gallery and master 4K film are delivered within 14-21 business days on private cloud & physical drive.'
  },
  {
    q: 'Do you cover destination weddings across India, UAE, UK, and Australia?',
    a: 'Absolutely! Pictura specializes in luxury destination weddings worldwide—including Udaipur, Jaipur, Kerala backwaters, Dubai, London, Sydney, and the Amalfi Coast.'
  },
  {
    q: 'What camera systems and cinema gear do you bring on location?',
    a: 'We shoot with RED V-Raptor 8K VV cinema cameras, 100MP Hasselblad medium-format bodies, Sony Cine FX6 systems, licensed FPV drones, and Profoto wireless lighting rigs.'
  },
  {
    q: 'Can we customize our photography package & add live streaming?',
    a: 'Yes, our interactive Booking Estimator lets you select your base package tier and tailor add-ons like 8K FPV drone aerials, 4K multi-platform live streaming, and handcrafted Italian leather albums.'
  }
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page-container page-fade-in">
      <div className="page-header">
        <div className="hero-badge">
          <MessageSquare size={14} />
          <span>STUDIO DIRECT INQUIRIES</span>
        </div>
        <h1 className="page-title">
          GET IN <span className="text-gradient">TOUCH</span>
        </h1>
        <p className="page-subtitle">
          Contact our main studio team in Kochi or our international destination hubs in Dubai, London, and Sydney.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-col">
          <LiquidGlassCard className="contact-card">
            <div className="contact-icon"><MapPin size={22} className="text-orange" /></div>
            <div>
              <h3>Main Studio Hub (India & Asia)</h3>
              <p>Pictura Fine Art Studio, Kolenchery, Kochi, Ernakulam, Kerala 682311</p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="contact-card margin-top-16">
            <div className="contact-icon"><Globe size={22} className="text-orange" /></div>
            <div>
              <h3>Global Destination Hubs</h3>
              <p>London (UK) | Dubai (UAE) | Sydney (Australia)</p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="contact-card margin-top-16">
            <div className="contact-icon"><Phone size={22} className="text-orange" /></div>
            <div>
              <h3>Telephone & Direct WhatsApp</h3>
              <p>+61 477 240 625</p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="contact-card margin-top-16">
            <div className="contact-icon"><Mail size={22} className="text-orange" /></div>
            <div>
              <h3>Direct Email</h3>
              <p>commissions@picturastudio.com</p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="contact-card margin-top-16">
            <div className="contact-icon"><Clock size={22} className="text-orange" /></div>
            <div>
              <h3>Studio Hours</h3>
              <p>Mon - Sat: 9:00 AM - 8:00 PM (IST / GMT+5:30)</p>
            </div>
          </LiquidGlassCard>
        </div>

        <div className="contact-form-col">
          <LiquidGlassCard className="inquiry-glass-card">
            <h3>Send Executive Inquiry</h3>
            <p className="sub-text margin-bottom-20">Directly connect with our Lead Producer. We respond within 2 hours.</p>

            {!submitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div className="margin-bottom-16">
                  <input type="text" placeholder="Your Full Name" required className="glass-input-field" />
                </div>
                <div className="margin-bottom-16">
                  <input type="email" placeholder="Your Email Address" required className="glass-input-field" />
                </div>
                <div className="margin-bottom-16">
                  <input type="tel" placeholder="WhatsApp / Phone Number (+91...)" required className="glass-input-field" />
                </div>
                <div className="margin-bottom-16">
                  <textarea placeholder="Tell us about your event, shoot date, and venue..." required className="glass-input-field glass-textarea" />
                </div>
                <button type="submit" className="cta-primary-btn width-full">
                  <span>SEND INQUIRY</span>
                  <Send size={16} />
                </button>
              </form>
            ) : (
              <div className="success-msg-box text-center">
                <h4 className="text-orange">Inquiry Received!</h4>
                <p>Thank you for reaching out to Pictura. Our senior producer will contact you via phone/WhatsApp shortly.</p>
              </div>
            )}
          </LiquidGlassCard>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <section className="section-padding">
        <h2 className="section-title text-center margin-bottom-30">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="faq-list">
          {FAQS.map((faq, idx) => (
            <LiquidGlassCard
              key={idx}
              className="faq-card margin-bottom-16"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`faq-chevron ${openFaq === idx ? 'rotated' : ''}`} />
              </div>
              {openFaq === idx && (
                <div className="faq-answer margin-top-16">
                  <p>{faq.a}</p>
                </div>
              )}
            </LiquidGlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}

