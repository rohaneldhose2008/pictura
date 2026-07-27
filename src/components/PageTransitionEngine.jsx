import { useEffect, useState, useRef } from 'react';
import './PageTransitionEngine.css';

export default function PageTransitionEngine({ activeIndex, children }) {
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState('down');
  const prevIndexRef = useRef(activeIndex);

  useEffect(() => {
    if (activeIndex !== prevIndexRef.current) {
      setDirection(activeIndex > prevIndexRef.current ? 'down' : 'up');
      setTransitioning(true);
      const timer = setTimeout(() => {
        prevIndexRef.current = activeIndex;
        setTransitioning(false);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  return (
    <div className="transition-wrapper-3d">
      {transitioning && <div className="orange-flare-flash" />}
      <div
        className={`page-view-shell ${
          transitioning
            ? direction === 'down'
              ? 'page-view-shell--rotate-down'
              : 'page-view-shell--rotate-up'
            : 'page-view-shell--idle'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

