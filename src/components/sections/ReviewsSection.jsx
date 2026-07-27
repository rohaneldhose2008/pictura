import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './ReviewsSection.css';

const TESTIMONIALS = [
  {
    id: 1,
    rating: 5,
    quote: "Pictura Creations captured our event beautifully. Their professionalism and creativity are unmatched.",
    name: "JAMES ANDERSON",
    role: "Event Manager",
    city: "Brisbane"
  },
  {
    id: 2,
    rating: 5,
    quote: "The drone footage and cinematic highlights exceeded all expectations. Truly the top media team in Australia!",
    name: "SARAH JENNINGS",
    role: "Marketing Director",
    city: "Gold Coast"
  },
  {
    id: 3,
    rating: 5,
    quote: "Flawless live streaming setup for our international conference. Sharp, crystal clear 4K visuals and zero lag.",
    name: "DAVID CHEN",
    role: "Tech Summit Producer",
    city: "Brisbane"
  }
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="reviews" className="reviews-section section-container dissolve-section">
      <div className="reviews-header text-center">
        <div className="section-tag">CLIENT REVIEWS</div>
        <h2 className="section-title">
          CLIENTS LOVE US <span className="text-orange">AND WE LOVE THEM</span>
        </h2>
      </div>

      {/* Main Testimonial Card */}
      <div className="testimonial-card-wrap">
        <button onClick={handlePrev} className="review-nav-btn review-nav-prev" aria-label="Previous review">
          <ChevronLeft size={20} />
        </button>

        <div className="testimonial-card">
          <div className="review-quote-icon">
            <Quote size={32} className="text-orange" />
          </div>

          <div className="stars-row">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={18} fill="#FF5500" stroke="#FF5500" />
            ))}
          </div>

          <p className="review-quote-text">
            "{current.quote}"
          </p>

          <div className="review-author-info">
            <div className="author-avatar">
              <span>{current.name.charAt(0)}</span>
            </div>
            <div className="author-details">
              <h4 className="author-name">{current.name}</h4>
              <span className="author-meta">{current.role}, {current.city}</span>
            </div>
          </div>
        </div>

        <button onClick={handleNext} className="review-nav-btn review-nav-next" aria-label="Next review">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
