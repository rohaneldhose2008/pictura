import LiquidGlassCard from '../components/LiquidGlassCard';
import { ShieldCheck, FileText } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="page-container page-fade-in">
      <div className="page-header">
        <div className="hero-badge">
          <ShieldCheck size={14} />
          <span>LEGAL & POLICIES</span>
        </div>
        <h1 className="page-title">
          TERMS & <span className="text-gradient">PRIVACY</span>
        </h1>
        <p className="page-subtitle">
          Commercial copyright licensing, privacy compliance, and studio client agreements under Australian Law.
        </p>
      </div>

      <div className="legal-content-stack">
        <LiquidGlassCard className="legal-card margin-bottom-30">
          <div className="legal-header">
            <FileText size={20} className="text-orange" />
            <h2>Commercial Image Licensing</h2>
          </div>
          <p>
            All visual assets produced by Pictura Studio remain protected under the Australian Copyright Act 1968. Clients receiving commercial packages are granted full corporate and digital usage rights for marketing, broadcast, and promotional campaigns without expiration.
          </p>
        </LiquidGlassCard>

        <LiquidGlassCard className="legal-card margin-bottom-30">
          <div className="legal-header">
            <ShieldCheck size={20} className="text-orange" />
            <h2>Privacy & Data Security</h2>
          </div>
          <p>
            We respect client privacy. Private events and personal family functions are hosted on password-encrypted cloud galleries. We never share client personal information or unreleased commercial imagery with third parties.
          </p>
        </LiquidGlassCard>
      </div>
    </div>
  );
}
