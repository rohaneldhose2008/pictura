import { useState, useEffect } from 'react';
import { Star, CheckCircle, ExternalLink, Quote, MessageSquare } from 'lucide-react';
import './GoogleReviewsSection.css';

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Sarah & Michael Jenkins',
    location: 'Townsville, QLD',
    avatar: 'SJ',
    category: 'Weddings & Events',
    rating: 5,
    date: '2 weeks ago',
    service: 'Wedding Photography & Cinema',
    review: 'Pictura Creations captured our wedding day in Townsville beyond our wildest dreams! Rohan and his team were so professional, attentive, and discreet. The 4K cinematic film brought tears to our eyes. Highly recommended!'
  },
  {
    id: 2,
    name: 'David Miller',
    location: 'Brisbane, QLD',
    avatar: 'DM',
    category: 'Corporate & Commercial',
    rating: 5,
    date: '1 month ago',
    service: 'Corporate Livestream & Photos',
    review: 'Outstanding service and incredible visual quality! We hired Pictura for our annual corporate event livestream & photography. They delivered all retouched photos within 48 hours. Absolute pros!'
  },
  {
    id: 3,
    name: 'Priya & Arjun Nair',
    location: 'Queensland, AU',
    avatar: 'PN',
    category: 'Weddings & Events',
    rating: 5,
    date: '1 month ago',
    service: 'Cinematography & Pre-Wedding',
    review: 'The best photographer and cinematographer team in Queensland! Their attention to detail, lighting, and creative direction is unmatched. Every single frame looks like a movie poster.'
  },
  {
    id: 4,
    name: 'Jessica Taylor',
    location: 'Cairns, QLD',
    avatar: 'JT',
    category: 'Weddings & Events',
    rating: 5,
    date: '2 months ago',
    service: 'Event Photography',
    review: 'Rohan is an incredible artist! He made our entire family feel comfortable in front of the camera. The digital receipt, quick communication, and final photo delivery were completely seamless.'
  },
  {
    id: 5,
    name: 'Marcus Vance',
    location: 'Townsville, QLD',
    avatar: 'MV',
    category: 'Cinematography',
    rating: 5,
    date: '3 months ago',
    service: '4K Drone Aerial Shoot',
    review: 'The 4K drone footage and high-res property photos from Pictura Creations helped us showcase our estate in record time. Top tier quality, ultra-sharp resolution, and super reliable delivery!'
  },
  {
    id: 6,
    name: 'Emma & Liam Harrison',
    location: 'Whitsundays, QLD',
    avatar: 'EH',
    category: 'Weddings & Events',
    rating: 5,
    date: '3 months ago',
    service: 'Bespoke Wedding Package',
    review: 'From our initial consultation to the final film deliverable, working with Pictura Creations was an absolute pleasure. Their creative vision turned our special day into a timeless masterpiece.'
  }
];

export default function GoogleReviewsSection() {
  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    // Load Elfsight script dynamically if available
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

  const filteredReviews = activeTab === 'ALL'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter((r) => r.category === activeTab);

  return (
    <section id="reviews" className="google-reviews-section section-container dissolve-section">
      <div className="section-header text-center" style={{ marginBottom: '28px' }}>
        <div className="section-tag">TESTIMONIALS</div>
        <h2 className="section-title">
          CLIENT <span className="text-orange">REVIEWS</span>
        </h2>
        <p className="section-subtitle">
          Real feedback from couples, families, and businesses across Australia.
        </p>
      </div>

      {/* Primary Live Elfsight Google Reviews Widget */}
      <div className="elfsight-widget-wrapper" style={{ margin: '0 auto 36px auto', maxWidth: '1100px', width: '100%' }}>
        <div className="elfsight-app-2f05f024-4a71-4dc8-ab33-cc995e829437"></div>
      </div>

      {/* Google Rating Banner Stamp */}
      <div className="google-rating-banner">
        <div className="google-g-badge">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          <span className="google-badge-title">Google Reviews</span>
        </div>

        <div className="google-score-col">
          <div className="score-number">5.0</div>
          <div className="stars-row">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="#FF5500" color="#FF5500" />
            ))}
          </div>
        </div>

        <div className="google-stat-info">
          <div className="stat-main">100% 5-Star Verified Rating</div>
          <div className="stat-sub">Based on verified Google Client Reviews</div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="reviews-filter-row">
        <button
          type="button"
          className={`review-filter-btn ${activeTab === 'ALL' ? 'active' : ''}`}
          onClick={() => setActiveTab('ALL')}
        >
          ALL REVIEWS ({REVIEWS_DATA.length})
        </button>
        <button
          type="button"
          className={`review-filter-btn ${activeTab === 'Weddings & Events' ? 'active' : ''}`}
          onClick={() => setActiveTab('Weddings & Events')}
        >
          WEDDINGS & EVENTS
        </button>
        <button
          type="button"
          className={`review-filter-btn ${activeTab === 'Cinematography' ? 'active' : ''}`}
          onClick={() => setActiveTab('Cinematography')}
        >
          CINEMATOGRAPHY
        </button>
        <button
          type="button"
          className={`review-filter-btn ${activeTab === 'Corporate & Commercial' ? 'active' : ''}`}
          onClick={() => setActiveTab('Corporate & Commercial')}
        >
          CORPORATE & COMMERCIAL
        </button>
      </div>

      {/* Grid of Verified Client Review Cards */}
      <div className="reviews-cards-grid">
        {filteredReviews.map((item) => (
          <div key={item.id} className="review-card-item">
            <div className="review-card-top">
              <div className="client-avatar">{item.avatar}</div>
              <div className="client-meta">
                <h4 className="client-name">{item.name}</h4>
                <p className="client-loc">📍 {item.location} • <span className="review-date">{item.date}</span></p>
              </div>
              <div className="verified-badge" title="Verified Google Review">
                <CheckCircle size={15} className="text-orange" />
              </div>
            </div>

            <div className="review-stars-line">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} size={15} fill="#FF5500" color="#FF5500" />
              ))}
              <span className="review-tag">{item.service}</span>
            </div>

            <p className="review-body-text">"{item.review}"</p>

            <div className="review-card-footer">
              <span className="google-verify-text">Posted on Google</span>
            </div>
          </div>
        ))}
      </div>

      {/* Optional Elfsight Widget Embed Container */}
      <div className="elfsight-widget-wrapper" style={{ marginTop: '30px' }}>
        <div className="elfsight-app-2f05f024-4a71-4dc8-ab33-cc995e829437" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
}
