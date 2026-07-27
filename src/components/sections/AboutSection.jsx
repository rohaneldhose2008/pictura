import { Sparkles, Target, Rocket } from 'lucide-react';
import './AboutSection.css';

const WHY_US_CARDS = [
  {
    id: 1,
    title: 'CREATIVITY',
    icon: Sparkles,
    desc: 'Unique concepts and creative approach for every single project.'
  },
  {
    id: 2,
    title: 'PRECISION',
    icon: Target,
    desc: 'Attention to every detail to deliver pure visual perfection.'
  },
  {
    id: 3,
    title: 'INNOVATION',
    icon: Rocket,
    desc: 'Advanced 4K cinema technology and modern drone techniques.'
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
            Pictura Creations is Townsville's premier creative media production studio, specializing in high-end photography, 4K videography, aerial drone cinema, and multi-camera live broadcasting. Established in 2020 in Townsville, Queensland, we combine cinematic artistry with cutting-edge technology to capture the authentic emotion, beauty, and energy of every moment across North Queensland.
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
