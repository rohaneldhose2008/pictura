import DomeGallery from '../DomeGallery';
import { getAssetUrl } from '../../utils/assetUrl';
import './GallerySection.css';

const WEBSITE_GALLERY_FILES = [
  'DSC00836.jpg',
  'IMG_1121.jpg',
  '50FA3CBD-B679-4E42-A567-E77B6D868EFF_1_105_c.jpeg',
  'DSC01892.jpg',
  'IMG_1124.jpg',
  '0450F148-4229-4788-B309-5DE862A1D109_1_201_a.jpeg',
  'DSC01315.jpg',
  'IMG_1127.jpg',
  '39CC09D6-23F8-4D5D-B275-3AD8389A3464_1_102_a.jpeg',
  'DSC02658.jpg',
  'IMG_1122.jpg',
  '583C98BB-EACB-4104-9220-2D9ECFC4F359_1_102_a.jpeg',
  'DSC01348.jpg',
  'IMG_1125.jpg',
  '7CC98166-7B90-4FD2-A935-A40646C8CD5D_1_102_a.jpeg',
  'DSC00849.jpg',
  'IMG_1123.jpg',
  'D355D1C8-1A08-41D4-A9B2-97934F7D49E2_1_102_o.jpeg',
  'F5A44334-BC74-4C5F-A135-8FF69F1A0911_1_201_a.jpeg',
  'IMG_1126.jpg'
];

const GALLERY_IMAGES = WEBSITE_GALLERY_FILES.map((fileName) => ({
  src: getAssetUrl(`images/Website/${fileName}`),
  alt: `Pictura Creations Portfolio - ${fileName}`
}));

export default function GallerySection() {
  return (
    <section id="gallery" className="gallery-section section-container dissolve-section">
      <div className="section-header text-center">
        <div className="section-tag">PORTFOLIO</div>
        <h2 className="section-title">
          OUR <span className="text-orange">WORK</span>
        </h2>
      </div>

      {/* Floating 100% Natural 3D Dome Globe Sphere */}
      <div className="dome-gallery-viewport">
        <DomeGallery
          images={GALLERY_IMAGES}
          fit={0.65}
          minRadius={540}
          maxRadius={750}
          padFactor={0.15}
          overlayBlurColor="transparent"
          grayscale={false}
          openedImageWidth="420px"
          openedImageHeight="560px"
          imageBorderRadius="18px"
          openedImageBorderRadius="24px"
          dragSensitivity={18}
          dragDampening={0.8}
        />
      </div>
    </section>
  );
}
