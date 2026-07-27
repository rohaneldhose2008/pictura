import { Sparkles, Target, Rocket } from 'lucide-react';
import './WhyUsSection.css';

const WHY_US_CARDS = [
  {
    id: 1,
    title: 'CREATIVITY',
    icon: Sparkles,
    desc: 'Unique concepts and creative approach for every project.'
  },
  {
    id: 2,
    title: 'PRECISION',
    icon: Target,
    desc: 'Attention to every detail to deliver perfection.'
  },
  {
    id: 3,
    title: 'INNOVATION',
    icon: Rocket,
    desc: 'Advanced technology and modern techniques.'
  }
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="why-us-section section-container dissolve-section">
      <div className="why-us-header">
        <div className="section-tag">WHY CHOOSE PICTURA</div>
        <h2 className="section-title">
          EXCELLENCE IN <span className="text-orange">EVERY FRAME</span>
        </h2>
      </div>

      <div className="why-us-grid">
        {WHY_US_CARDS.map((card) => {
          const IconComp = card.icon;
          return (
            <div key={card.id} className="why-us-card">
              <div className="why-us-icon-ring">
                <IconComp size={28} className="text-orange" />
              </div>
              <h3 className="why-us-card-title">{card.title}</h3>
              <p className="why-us-card-desc">{card.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
