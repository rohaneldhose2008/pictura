import { useState } from 'react';
import LiquidGlassCard from '../components/LiquidGlassCard';
import { Play, Film, X, Sparkles } from 'lucide-react';
import './CinematicGalleryPage.css';

const CINEMATIC_REELS = [
  {
    id: 1,
    title: 'Sydney Opera House Gala',
    category: 'Corporate Live Event',
    duration: '02:45',
    thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-of-a-bride-and-groom-34280-large.mp4'
  },
  {
    id: 2,
    title: 'Gold Coast Coastal Drone Reel',
    category: 'Aerial & Architecture',
    duration: '03:10',
    thumbnail: 'https://images.unsplash.com/photo-1508672019048-805479767513?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-view-of-a-coastal-city-at-sunset-41484-large.mp4'
  },
  {
    id: 3,
    title: 'Executive Brand Launch',
    category: 'Commercial Campaign',
    duration: '01:50',
    thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-camera-taking-a-photo-41485-large.mp4'
  },
  {
    id: 4,
    title: 'Milestone Anniversary Celebration',
    category: 'Personal Function',
    duration: '04:15',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-of-a-bride-and-groom-34280-large.mp4'
  }
];

export default function CinematicGalleryPage() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="page-container page-fade-in">
      <div className="page-header">
        <div className="hero-badge">
          <Film size={14} />
          <span>4K MOTION PICTURE</span>
        </div>
        <h1 className="page-title">
          CINEMATIC <span className="text-gradient">GALLERY</span>
        </h1>
        <p className="page-subtitle">
          Experience our high-speed RED 8K VV cinema highlights, 4K live streaming feeds, and brand trailers.
        </p>
      </div>

      <div className="reels-grid">
        {CINEMATIC_REELS.map((reel) => (
          <LiquidGlassCard key={reel.id} className="reel-card" onClick={() => setActiveVideo(reel)}>
            <div className="reel-thumb-wrap">
              <img src={reel.thumbnail} alt={reel.title} />
              <div className="reel-play-btn">
                <Play size={24} className="text-orange" fill="#FF6B00" />
              </div>
              <span className="reel-duration">{reel.duration}</span>
            </div>

            <div className="reel-info">
              <span className="reel-cat">{reel.category}</span>
              <h3>{reel.title}</h3>
            </div>
          </LiquidGlassCard>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="modal-backdrop" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-glass" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveVideo(null)}>
              <X size={22} />
            </button>
            <video src={activeVideo.videoUrl} controls autoPlay className="modal-video-player" />
            <div className="video-modal-caption">
              <span className="hero-badge">{activeVideo.category}</span>
              <h2>{activeVideo.title}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
