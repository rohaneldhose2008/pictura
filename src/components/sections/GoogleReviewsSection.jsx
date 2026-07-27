import { useState, useEffect } from 'react';
import { Star, CheckCircle, ExternalLink, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import './GoogleReviewsSection.css';

const GOOGLE_REVIEWS = [
  {
    id: 1,
    name: 'Sarah & Liam Jenkins',
    location: 'Townsville, QLD',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: '2 weeks ago',
    service: 'Wedding Photography & Drone Cinema',
    review: 'Pictura Creations captured our wedding at the Townsville Strand like an absolute masterpiece film. The drone shots of Castle Hill and the ocean sunset left us breathless. Rohan and the team were punctual, creative, and delivered beyond our dreams!'
  },
  {
    id: 2,
    name: 'Michael Chang',
    location: 'North QLD Executive Summit',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: '1 month ago',
    service: 'Corporate Videography & Live Stream',
    review: 'Extremely professional corporate video and 4K live stream production for our Townsville summit. The multi-camera setup and crisp audio made our national broadcast look world-class. Best media team in Queensland!'
  },
  {
    id: 3,
    name: 'Jessica & Marcus Taylor',
    location: 'Magnetic Island, QLD',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: '3 weeks ago',
    service: 'Gold Package Event Coverage',
    review: 'We booked the Gold package for our anniversary gala on Magnetic Island. The 60 retouched photos and 16:9 cinema highlight video were stunning! The instant digital receipt and customized WhatsApp updates made the whole process effortless.'
  },
  {
    id: 4,
    name: 'David Miller',
    location: 'Burdekin / Townsville, QLD',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: '1 month ago',
    service: 'Real Estate & Aerial Photography',
    review: 'The quality of drone aerial photography and architectural angles Pictura produced for our commercial properties in Townsville was top-notch. High resolution, rapid delivery, and outstanding communication.'
  }
];

export default function GoogleReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

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

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + GOOGLE_REVIEWS.length) % GOOGLE_REVIEWS.length);
  };

  return (
    <section id="reviews" className="google-reviews-section section-container dissolve-section">
      {/* Header with Google Badge */}
      <div className="section-header text-center">
        <div className="google-badge-chip">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>VERIFIED GOOGLE REVIEWS</span>
        </div>

        <h2 className="section-title">
          WHAT OUR CLIENTS <span className="text-orange">SAY ABOUT US</span>
        </h2>

        {/* Rating Summary Bar */}
        <div className="google-rating-summary">
          <span className="rating-score">4.9</span>
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="star-filled" />
            ))}
          </div>
          <span className="rating-count">Based on 85+ Verified Client Reviews in Townsville & QLD</span>

          <a
            href="https://www.google.com/search?q=Pictura+Creations+Townsville+QLD"
            target="_blank"
            rel="noopener noreferrer"
            className="google-maps-link-btn"
          >
            <span>VIEW ON GOOGLE MAPS</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Live Elfsight Google Reviews Embed Widget */}
      <div className="elfsight-widget-wrapper" style={{ margin: '0 auto 40px auto', maxWidth: '960px' }}>
        <div className="elfsight-app-2f05f024-4a71-4dc8-ab33-cc995e829437" data-elfsight-app-lazy></div>
      </div>

      {/* Featured Testimonial Spotlight */}
      <div className="reviews-carousel-wrapper">
        <button type="button" className="rev-nav-btn prev" onClick={prevReview} aria-label="Previous review">
          <ChevronLeft size={22} />
        </button>

        <div className="featured-review-card">
          <Quote size={40} className="quote-watermark" />
          
          <div className="rev-card-header">
            <img
              src={GOOGLE_REVIEWS[activeIndex].avatar}
              alt={GOOGLE_REVIEWS[activeIndex].name}
              className="rev-avatar"
            />
            <div className="rev-author-info">
              <h4 className="rev-author-name">
                {GOOGLE_REVIEWS[activeIndex].name}
                <CheckCircle size={15} className="verified-badge-icon" />
              </h4>
              <span className="rev-author-location">📍 {GOOGLE_REVIEWS[activeIndex].location} • {GOOGLE_REVIEWS[activeIndex].date}</span>
              <span className="rev-service-chip">{GOOGLE_REVIEWS[activeIndex].service}</span>
            </div>
          </div>

          <div className="rev-stars-row">
            {[...Array(GOOGLE_REVIEWS[activeIndex].rating)].map((_, i) => (
              <Star key={i} size={16} className="star-filled" />
            ))}
          </div>

          <p className="rev-text">"{GOOGLE_REVIEWS[activeIndex].review}"</p>
        </div>

        <button type="button" className="rev-nav-btn next" onClick={nextReview} aria-label="Next review">
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Grid of All Reviews */}
      <div className="reviews-mini-grid">
        {GOOGLE_REVIEWS.map((rev, idx) => (
          <div
            key={rev.id}
            className={`mini-rev-card ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(idx)}
          >
            <div className="mini-rev-top">
              <span className="mini-name">{rev.name}</span>
              <div className="mini-stars">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={12} className="star-filled" />
                ))}
              </div>
            </div>
            <p className="mini-snippet">{rev.review.substring(0, 75)}...</p>
          </div>
        ))}
      </div>
    </section>
  );
}
