import LiquidGlassCard from '../components/LiquidGlassCard';
import { Award, Cpu, MapPin, Flame, ShieldCheck, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import './WhyUsPage.css';

export default function WhyUsPage({ onNavigate }) {
  return (
    <div className="page-container page-fade-in">
      <div className="whyus-header">
        <div className="hero-badge">
          <Award size={14} />
          <span>BESPOKE VISUAL CRAFT</span>
        </div>
        <h1 className="page-title">
          WHY <span className="text-gradient">PICTURA</span>
        </h1>
        <p className="page-subtitle">
          Engineered for brands and private clients who demand precision, liquid clarity, and uncompromising visual quality.
        </p>
      </div>

      <div className="whyus-pillars-grid">
        <LiquidGlassCard className="pillar-card">
          <div className="pillar-number">01</div>
          <div className="pillar-icon"><Cpu size={28} /></div>
          <h3>Cine-Grade Hardware</h3>
          <p>We shoot on RED V-Raptor 8K VV cinema systems, 100MP Hasselblad medium-format bodies, and licensed heavy-lift FPV drones.</p>
        </LiquidGlassCard>

        <LiquidGlassCard className="pillar-card">
          <div className="pillar-number">02</div>
          <div className="pillar-icon"><MapPin size={28} /></div>
          <h3>Dual Studio Presence</h3>
          <p>Studios in Sydney & Melbourne enable rapid deployment across all Australian metropolitan & regional locations without delay.</p>
        </LiquidGlassCard>

        <LiquidGlassCard className="pillar-card">
          <div className="pillar-number">03</div>
          <div className="pillar-icon"><Flame size={28} /></div>
          <h3>Custom Color Science</h3>
          <p>Handcrafted LUTs, custom lighting, and bespoke skin retouching tailored exclusively to your brand identity.</p>
        </LiquidGlassCard>

        <LiquidGlassCard className="pillar-card">
          <div className="pillar-number">04</div>
          <div className="pillar-icon"><ShieldCheck size={28} /></div>
          <h3>Full Commercial IP Ownership</h3>
          <p>Complete image licensing rights under Australian Copyright Law with zero hidden usage restrictions.</p>
        </LiquidGlassCard>
      </div>

      <section className="whyus-tech-section">
        <LiquidGlassCard className="tech-box">
          <div className="tech-box__header">
            <Sparkles size={20} className="text-orange" />
            <h2>TECHNICAL ARMORY</h2>
          </div>

          <div className="tech-specs-grid">
            <div className="tech-spec-item">
              <CheckCircle size={18} className="text-orange" />
              <div>
                <strong>RED V-Raptor 8K VV</strong>
                <p>120fps 8K RAW video capture for high-speed motion & commercials</p>
              </div>
            </div>

            <div className="tech-spec-item">
              <CheckCircle size={18} className="text-orange" />
              <div>
                <strong>Hasselblad 100MP Medium Format</strong>
                <p>Ultra-high-resolution stills for commercial print & architectural detail</p>
              </div>
            </div>

            <div className="tech-spec-item">
              <CheckCircle size={18} className="text-orange" />
              <div>
                <strong>CASA Licensed FPV Drones</strong>
                <p>Aerial cinematic inspection & coastal estate flying</p>
              </div>
            </div>

            <div className="tech-spec-item">
              <CheckCircle size={18} className="text-orange" />
              <div>
                <strong>Multi-Cam 4K Live Broadcast</strong>
                <p>Zero-latency live stream rigging with SRT cellular failover</p>
              </div>
            </div>
          </div>

          <div className="tech-box__footer">
            <button className="cta-primary-btn" onClick={() => onNavigate(5)}>
              <span>RESERVE A SHOOT</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </LiquidGlassCard>
      </section>
    </div>
  );
}
