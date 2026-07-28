import { Sparkles, Target, Rocket } from 'lucide-react';
import './AboutSection.css';

const WHY_US_CARDS = [
  {
    id: 1,
    title: 'CREATIVITY',
    icon: Sparkles,
    desc: 'We craft bespoke visual concepts tailored to your unique story across Townsville, Magnetic Island, and North Queensland. From candid wedding moments to high-end commercial branding, we turn raw emotion into timeless cinematic art.'
  },
  {
    id: 2,
    title: 'PRECISION',
    icon: Target,
    desc: 'Meticulous attention to detail in lighting, color grading, audio capture, and 4K photo retouching. Every frame is handcrafted to guarantee pure visual perfection that leaves a lasting impression on your audience.'
  },
  {
    id: 3,
    title: 'INNOVATION',
    icon: Rocket,
    desc: 'Equipped with RED 8K cinema cameras, Sony FX flagship rigs, bonded 4K live streaming, and CASA-licensed aerial drone cinema. We bring world-class production technology to every commission in Queensland.'
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="about-section section-container dissolve-section">
      <div className="about-grid">
        {/* Left Text Content */}
        <div className="about-text-col">
          <div className="section-tag">ABOUT US</div>

          <h2 className="section-title about-title">
            OUR <span className="text-orange">PHILOSOPHY</span>
          </h2>

          <p className="about-description">
            Pictura Creations is Townsville's premier creative media production studio, specializing in photography, cinematography, aerial cinema, and multi-camera live broadcasting. Established in 2020 in Townsville, Queensland, we combine cinematic artistry with cutting-edge technology to capture the authentic emotion, beauty, and energy of every moment across North Queensland. And as our clients say "The best photography in Townsville.."
          </p>
        </div>

        {/* Right Media Content */}
        <div className="about-media-col">
          <div className="about-image-card">
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"
              alt="Townsville Queensland Professional Photography"
              className="about-img"
            />
            <div className="about-img-glow"></div>
            <div className="about-img-badge">
              <span className="badge-title">EST. 2020</span>
              <span className="badge-sub">TOWNSVILLE, QUEENSLAND</span>
            </div>
          </div>
        </div>
      </div>

      {/* Merged "Why Choose Pictura" Cards */}
      <div className="why-us-merged-wrapper">
        <h3 className="why-us-subtitle">EXCELLENCE IN <span className="text-orange">EVERY FRAME</span></h3>
        
        {/* Local SEO Location Badges */}
        <div className="seo-location-chips-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {['TOWNSVILLE', 'CAIRNS', 'CHARTERS TOWERS', 'MACKAY', 'BRISBANE', 'MAGNETIC ISLAND'].map((loc, i) => (
            <span key={i} style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.85)', background: 'rgba(255, 85, 0, 0.12)', border: '1px solid rgba(255, 85, 0, 0.3)', padding: '5px 14px', borderRadius: '20px' }}>
              📍 {loc}
            </span>
          ))}
        </div>

        <div className="why-us-grid">
          {WHY_US_CARDS.map((card) => {
            const IconComp = card.icon;
            return (
              <div key={card.id} className="why-us-card">
                <div className="why-us-icon-ring">
                  <IconComp size={24} className="text-orange" />
                </div>
                <h4 className="why-us-card-title">{card.title}</h4>
                <p className="why-us-card-desc">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
