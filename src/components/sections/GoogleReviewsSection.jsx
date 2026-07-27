import { useEffect } from 'react';
import './GoogleReviewsSection.css';

export default function GoogleReviewsSection() {
  useEffect(() => {
    // Load Elfsight script dynamically
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="reviews" className="google-reviews-section section-container dissolve-section">
      <div className="section-header text-center" style={{ marginBottom: '32px' }}>
        <div className="section-tag">GOOGLE REVIEWS</div>
        <h2 className="section-title">
          WHAT OUR CLIENTS <span className="text-orange">SAY ABOUT US</span>
        </h2>
      </div>

      {/* Live Elfsight Google Reviews Widget */}
      <div className="elfsight-widget-wrapper" style={{ margin: '0 auto', maxWidth: '1100px' }}>
        <div className="elfsight-app-2f05f024-4a71-4dc8-ab33-cc995e829437" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
}
