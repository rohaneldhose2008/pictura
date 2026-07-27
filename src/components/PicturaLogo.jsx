import { getAssetUrl } from '../utils/assetUrl';
import './PicturaLogo.css';

export default function PicturaLogo({ height = 42 }) {
  return (
    <div className="pictura-logo-wrap" style={{ display: 'inline-flex', alignItems: 'center' }}>
      <img
        src={getAssetUrl('logo.png')}
        alt="Pictura Creations Logo"
        style={{
          height: `${height}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
}
