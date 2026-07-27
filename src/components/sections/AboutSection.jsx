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
          <div className="section-tag">OUR STORY & PHILOSOPHY</div>

          <h2 className="section-title about-title">
            MORE THAN A PHOTOGRAPHY COMPANY WE ARE <span className="text-orange">STORYTELLERS.</span>
          </h2>

          <p className="about-description">
            Pictura Creations is a Brisbane-based creative production studio specializing in event photography, 4K videography, multi-camera live streaming, and drone aerial cinema. Established in 2020, we blend creative passion and technology to craft visual stories across Queensland and Australia.
          </p>
        </div>

        {/* Right Media Content */}
        <div className="about-media-col">
          <div className="about-image-card">
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"
              alt="Professional Camera Lens Storytelling"
              className="about-img"
            />
            <div className="about-img-glow"></div>
            <div className="about-img-badge">
              <span className="badge-title">EST. 2020</span>
              <span className="badge-sub">BRISBANE, QUEENSLAND</span>
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
