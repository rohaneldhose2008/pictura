import './LiquidGlassCard.css';

export default function LiquidGlassCard({ children, className = '', style = {}, onClick }) {
  return (
    <div
      className={`liquid-glass-card ${className}`}
      style={style}
      onClick={onClick}
    >
      <div className="liquid-glass-shine" />
      <div className="liquid-glass-glow" />
      <div className="liquid-glass-content">
        {children}
      </div>
    </div>
  );
}
