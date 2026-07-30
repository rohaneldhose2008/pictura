import { getAssetUrl } from '../utils/assetUrl';
import './PicturaLogo.css';

export default function PicturaLogo({ height = 42 }) {
  return (
    <div className="pictura-logo-wrap" style={{ display: 'inline-flex', alignItems: 'center' }}>
      <img
        src={getAssetUrl('pictura-logo-official.png')}
        onError={(e) => { e.target.src = getAssetUrl('logo.png'); }}
        alt="Pictura Creations Logo"
        style={{
          height: `${height}px`,
          width: 'auto',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))'
        }}
      />
    </div>
  );
}
