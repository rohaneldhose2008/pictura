import DomeGallery from '../DomeGallery';
import './GallerySection.css';

const SUSMI_PETTER_FILES = [
  'ASK00126.jpg', 'ASK00387.jpg', 'ASK07116.jpg', 'ASK07194.jpg', 'ASK07530.jpg', 'ASK07542.jpg',
  'ASK07596.jpg', 'ASK07601.jpg', 'ASK07604.jpg', 'ASK07625.jpg', 'ASK07628.jpg',
  'ASK07657.jpg', 'ASK07671.jpg', 'ASK07691.jpg', 'ASK07719.jpg', 'ASK07778.jpg', 'ASK07810.jpg',
  'ASK07812.jpg', 'ASK07824.jpg', 'ASK07851.jpg', 'ASK07859.jpg', 'ASK07890.jpg', 'ASK07902.jpg',
  'ASK07915.jpg', 'ASK07978.jpg', 'ASK07981.jpg', 'ASK08017.jpg', 'ASK08030.jpg', 'ASK08062.jpg',
  'ASK08137.jpg', 'ASK08216.jpg', 'ASK08232.jpg', 'ASK08388.jpg', 'ASK08571.jpg', 'ASK08662.jpg',
  'ASK09861.jpg', 'ASK09865.jpg', 'DLP_5980.jpg', 'DLP_6056.jpg', 'DLP_7735.jpg', 'DLP_7737.jpg',
  'SAR02805.jpg', 'SAR02856.jpg', 'SAR02891.jpg', 'SAR03011.jpg', 'SAR03089.jpg', 'SAR03167a.jpg',
  'SAR03180.jpg', 'SAR0318a0.jpg', 'SAR03254.jpg', 'SAR03294.jpg', 'SAR03743.jpg', 'SAR04675.jpg',
  'SAR04691.jpg', 'SAR04906.jpg', 'SAR04921.jpg', 'SAR04927.jpg', 'SAR05618.jpg'
];

const GALLERY_IMAGES = SUSMI_PETTER_FILES.map((fileName) => ({
  src: `./images/susmi-petter/${fileName}`,
  alt: `Susmi & Petter Celebration - ${fileName}`
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
