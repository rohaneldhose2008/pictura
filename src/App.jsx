import { useState, useEffect } from 'react';
import Navbar from './components/sections/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import GallerySection from './components/sections/GallerySection';
import CinematicGallerySection from './components/sections/CinematicGallerySection';
import PackagesSection from './components/sections/PackagesSection';
import GoogleReviewsSection from './components/sections/GoogleReviewsSection';
import BookingSection from './components/sections/BookingSection';
import FaqSection from './components/sections/FaqSection';
import ContactSection from './components/sections/ContactSection';
import FooterSection from './components/sections/FooterSection';
import DissolveObserver from './components/DissolveObserver';
import VideoModal from './components/VideoModal';
import PackageCustomizerModal from './components/PackageCustomizerModal';
import ReceiptModal from './components/ReceiptModal';

export default function App() {
  const [activeFilmModal, setActiveFilmModal] = useState(null);
  const [activeCustomizerPackage, setActiveCustomizerPackage] = useState(null);
  const [customPackageSummary, setCustomPackageSummary] = useState(null);
  const [galleryCategory, setGalleryCategory] = useState('ALL');
  const [sharedReceiptData, setSharedReceiptData] = useState(null);

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const receiptId = searchParams.get('receipt');

      if (receiptId) {
        const bookingFromUrl = {
          receiptId: receiptId,
          date: searchParams.get('issued') || new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' }),
          clientName: searchParams.get('name') || 'Valued Client',
          clientPhone: searchParams.get('phone') || '',
          clientEmail: searchParams.get('email') || '',
          eventDate: searchParams.get('date') || 'To Be Scheduled',
          eventLocation: searchParams.get('loc') || 'Townsville, QLD',
          packageTitle: searchParams.get('pkg') || 'Bespoke Package Selection',
          duration: searchParams.get('dur') || 'Standard Session',
          crewText: searchParams.get('crew') || '1 Photographer + 1 Cinematographer',
          photoCount: searchParams.get('photos') || 'Retouched Photos Included',
          highlightFormat: searchParams.get('edits') || 'Cinematic Film',
          addons: searchParams.get('addons') ? searchParams.get('addons').split(',') : [],
          notes: searchParams.get('notes') || ''
        };

        setSharedReceiptData(bookingFromUrl);
      }
    } catch (e) {
      console.log('Receipt URL parsing error:', e);
    }
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGallery = (category = 'ALL') => {
    setGalleryCategory(category);
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlayFilm = (film) => {
    setActiveFilmModal(film);
  };

  const handleOpenCustomizer = (pkg) => {
    setActiveCustomizerPackage(pkg);
  };

  const handleApplyCustomization = (summary) => {
    setCustomPackageSummary(summary);
    setActiveCustomizerPackage(null);
    scrollToBooking();
  };

  return (
    <div className="app-root-shell">
      {/* Dissolve Scroll Observer */}
      <DissolveObserver />

      {/* Section 02: Sticky Glass Navigation Bar */}
      <Navbar />

      <main className="main-content-flow">
        {/* Section 01: Hero Section */}
        <HeroSection
          onExplore={() => scrollToGallery('ALL')}
          onBook={() => scrollToBooking()}
          onPillSelect={(cat) => scrollToGallery(cat)}
        />

        {/* Section 03: About Us Section (Includes Why Choose Pictura & Animated Counters) */}
        <AboutSection />

        {/* Section 04: Services Grid Section */}
        <ServicesSection onViewAll={scrollToServices} />

        {/* Section 05: Bento & Dynamic Gallery Section */}
        <GallerySection
          selectedCategory={galleryCategory}
          onItemClick={(item) => handlePlayFilm({
            title: item.title,
            subtitle: item.category,
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-of-a-bride-and-groom-34280-large.mp4'
          })}
        />

        {/* Section 06: Cinematic Stories Gallery */}
        <CinematicGallerySection
          onPlayFilm={handlePlayFilm}
          onViewAllFilms={() => handlePlayFilm({
            title: "ALL CINEMATIC FILMS SHOWCASE",
            subtitle: "Full Reel 2025",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-harbor-with-ships-41551-large.mp4"
          })}
        />

        {/* Section 08: Bespoke Packages Section */}
        <PackagesSection onOpenCustomizer={handleOpenCustomizer} />

        {/* Section 09: Verified Google Client Reviews */}
        <GoogleReviewsSection />

        {/* Section 10: Interactive Quote Request & Booking Form */}
        <BookingSection customPackageSummary={customPackageSummary} />

        {/* Section 11: Contact & Australia Map */}
        <ContactSection />

        {/* Section 12: Frequently Asked Questions (At the very end) */}
        <FaqSection onContactUs={scrollToContact} />
      </main>

      {/* Section 13: Footer Section */}
      <FooterSection />

      {/* Video Modal Player */}
      {activeFilmModal && (
        <VideoModal
          film={activeFilmModal}
          onClose={() => setActiveFilmModal(null)}
        />
      )}

      {/* Bespoke Package Customizer Modal */}
      {activeCustomizerPackage && (
        <PackageCustomizerModal
          packageTier={activeCustomizerPackage}
          onClose={() => setActiveCustomizerPackage(null)}
          onApplyCustomization={handleApplyCustomization}
        />
      )}

      {/* Shared Receipt Modal from WhatsApp Link */}
      {sharedReceiptData && (
        <ReceiptModal
          bookingData={sharedReceiptData}
          onClose={() => setSharedReceiptData(null)}
        />
      )}
    </div>
  );
}
