import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FaqSection.css';

const FAQS_DATA = [
  {
    id: 1,
    question: "Do you travel outside Australia?",
    answer: "Yes! While we are based in Sydney, Australia, our team frequently travels internationally for destination weddings, royal ceremonies, and corporate visual productions worldwide."
  },
  {
    id: 2,
    question: "Do you provide live streaming for events?",
    answer: "Absolutely. We utilize broadcast-grade multi-camera live streaming rigs with bonded cellular internet to deliver crystal-clear 4K streams to YouTube, Facebook, or custom private portals."
  },
  {
    id: 3,
    question: "Can we customize a package?",
    answer: "Of course! Every client and event is unique. You can pick and mix services (e.g., adding drone coverage, extra hours, or album printing) to tailor the package to your exact needs."
  },
  {
    id: 4,
    question: "How long does it take to get the final photos/videos?",
    answer: "Preview sneak-peeks are delivered within 48 hours! Full retouched high-resolution photo galleries are delivered within 2-3 weeks, and cinematic highlight films take 3-4 weeks."
  },
  {
    id: 5,
    question: "Do you offer drone photography?",
    answer: "Yes, we have licensed CASA drone pilots on our team. We provide fully insured 4K aerial photography and videography for landscapes, venues, and grand event entrances."
  },
  {
    id: 6,
    question: "What equipment do you use?",
    answer: "We use flagship Sony FX6 & A7S III cinema cameras, G-Master prime lenses, DJI Ronin gimbals, DJI Inspire 3 & Mavic drones, and studio lighting from Profoto and Aputure."
  }
];

export default function FaqSection({ onContactUs }) {
  const [openId, setOpenId] = useState(1);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="faq-section section-container dissolve-section">
      <div className="faq-header">
        <div className="section-tag">FREQUENTLY ASKED QUESTIONS</div>
        <h2 className="section-title">
          FREQUENTLY ASKED <span className="text-orange">QUESTIONS</span>
        </h2>
      </div>

      <div className="faq-list">
        {FAQS_DATA.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}>
              <button className="faq-question-btn" onClick={() => toggleAccordion(faq.id)}>
                <span>{faq.question}</span>
                <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="faq-answer-content">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="still-questions-banner">
        <div>
          <h4 className="sq-title">STILL HAVE QUESTIONS?</h4>
          <p className="sq-sub">Our team is available 24/7 to help answer your inquiries.</p>
        </div>
        <button onClick={onContactUs} className="sq-contact-btn">
          CONTACT US
        </button>
      </div>
    </section>
  );
}
