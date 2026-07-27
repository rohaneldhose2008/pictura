import { X } from 'lucide-react';
import './VideoModal.css';

export default function VideoModal({ film, onClose }) {
  if (!film) return null;

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="video-player-wrap">
          <video
            controls
            autoPlay
            playsInline
            src={film.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-of-a-bride-and-groom-34280-large.mp4"}
            className="modal-video-element"
          >
            Your browser does not support HTML video.
          </video>
        </div>

        <div className="video-modal-details">
          <span className="modal-film-sub">{film.subtitle || 'Cinematic Film'}</span>
          <h3 className="modal-film-title">{film.title || 'Pictura Showreel'}</h3>
        </div>
      </div>
    </div>
  );
}
