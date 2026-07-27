import { useEffect, useRef, useState } from 'react';
import './LogoParticleCanvas.css';

export default function LogoParticleCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: -9999, y: -9999, isPresent: false };

    // Set canvas dimensions
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      initParticles(rect.width, rect.height);
    };

    // Generate Particle Dot Matrix for Pictura Logo
    const initParticles = (width, height) => {
      particles = [];
      const centerX = width / 2;
      const centerY = height / 2 - 25;
      const scale = Math.min(width, height) / 380;

      // Offscreen canvas to render logo and sample pixel dot structure
      const offCanvas = document.createElement('canvas');
      offCanvas.width = 400;
      offCanvas.height = 360;
      const offCtx = offCanvas.getContext('2d');

      // Draw Logo onto offscreen canvas
      offCtx.fillStyle = '#000000';
      offCtx.fillRect(0, 0, 400, 360);

      // Top-left orange bracket
      offCtx.fillStyle = '#FF5500';
      offCtx.fillRect(130, 30, 38, 14);
      offCtx.fillRect(130, 44, 14, 28);

      // P Stem & Loop
      offCtx.fillStyle = '#FFFFFF';
      offCtx.beginPath();
      offCtx.arc(215, 108, 60, -Math.PI / 2, Math.PI / 2);
      offCtx.lineTo(148, 168);
      offCtx.lineTo(148, 230);
      offCtx.lineTo(188, 230);
      offCtx.lineTo(188, 168);
      offCtx.lineTo(215, 168);
      offCtx.closePath();
      offCtx.fill();

      // Outer Lens Ring (Cutout)
      offCtx.fillStyle = '#000000';
      offCtx.beginPath();
      offCtx.arc(212, 108, 42, 0, Math.PI * 2);
      offCtx.fill();

      // Aperture Blades (Orange & White)
      offCtx.fillStyle = '#FF5500';
      offCtx.beginPath();
      offCtx.arc(212, 108, 38, 0, Math.PI * 2);
      offCtx.fill();

      offCtx.fillStyle = '#000000';
      offCtx.beginPath();
      offCtx.arc(212, 108, 16, 0, Math.PI * 2);
      offCtx.fill();

      // PICTURA Text
      offCtx.fillStyle = '#FFFFFF';
      offCtx.font = 'bold 36px sans-serif';
      offCtx.textAlign = 'center';
      offCtx.fillText('PICTURA', 200, 290);

      // CREATIONS Text
      offCtx.fillStyle = '#FF5500';
      offCtx.font = 'bold 16px sans-serif';
      offCtx.fillText('CREATIONS', 200, 320);

      // Sample pixels to create particle dots
      const imageData = offCtx.getImageData(0, 0, 400, 360);
      const data = imageData.data;
      const step = 6; // Grid sampling density

      for (let y = 0; y < 360; y += step) {
        for (let x = 0; x < 400; x += step) {
          const index = (y * 400 + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const alpha = data[index + 3];

          if (alpha > 128 && (r > 30 || g > 30 || b > 30)) {
            // Determine particle color
            let color = '#FFFFFF';
            if (r > 200 && g < 120) {
              color = '#FF5500'; // Orange
            } else if (r > 220 && g > 150) {
              color = '#FF9900'; // Bright warm orange
            }

            const targetX = centerX + (x - 200) * scale;
            const targetY = centerY + (y - 180) * scale;

            particles.push({
              x: targetX + (Math.random() - 0.5) * 200,
              y: targetY + (Math.random() - 0.5) * 200,
              originX: targetX,
              originY: targetY,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              size: Math.random() * 1.5 + 1.6,
              color: color,
              glow: color === '#FF5500' ? 'rgba(255, 85, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              friction: 0.86 + Math.random() * 0.05,
              ease: 0.06 + Math.random() * 0.04
            });
          }
        }
      }
    };

    // Render & Physics Loop
    const render = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const interactionRadius = 140;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Calculate distance from mouse cursor
        if (mouse.isPresent) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < interactionRadius) {
            const force = (interactionRadius - dist) / interactionRadius;
            const angle = Math.atan2(dy, dx);
            const push = force * 16;

            p.vx -= Math.cos(angle) * push;
            p.vy -= Math.sin(angle) * push;
          }
        }

        // Return force towards original logo position
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;

        p.vx += homeDx * p.ease;
        p.vy += homeDy * p.ease;

        p.vx *= p.friction;
        p.vy *= p.friction;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.glow;
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    resizeCanvas();
    render();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Pass mouse coordinates to canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const event = new CustomEvent('particleMouse', { detail: { x: mouseX, y: mouseY, isPresent: true } });
      canvas.dispatchEvent(event);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const event = new CustomEvent('particleMouse', { detail: { x: -9999, y: -9999, isPresent: false } });
      canvas.dispatchEvent(event);
    }
    setIsHovered(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let localMouse = { x: -9999, y: -9999, isPresent: false };

    const handleCustomMouse = (e) => {
      localMouse = e.detail;
    };

    canvas.addEventListener('particleMouse', handleCustomMouse);

    return () => {
      canvas.removeEventListener('particleMouse', handleCustomMouse);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`particle-canvas-container ${isHovered ? 'hovered' : ''}`}
      onMouseMove={(e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const event = new CustomEvent('particleMouse', { detail: { x, y, isPresent: true } });
        canvasRef.current?.dispatchEvent(event);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        const event = new CustomEvent('particleMouse', { detail: { x: -9999, y: -9999, isPresent: false } });
        canvasRef.current?.dispatchEvent(event);
        setIsHovered(false);
      }}
    >
      <canvas ref={canvasRef} className="logo-particle-canvas" />

      {/* Interactive Helper Hint Badge */}
      <div className="particle-hint-badge">
        <span className="hint-pulse-dot"></span>
        <span>HOVER OR MOVE MOUSE TO DISPERSE LOGO PARTICLES</span>
      </div>
    </div>
  );
}
