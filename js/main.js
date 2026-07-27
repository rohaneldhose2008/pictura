/* DoubleLayer Photography - Interactions & Luxury Engine */

// --- CONFIGURATION: MAINTENANCE MODE TOGGLE ---
// Set to true to show the 'Launching Soon' screen. Set to false to open the website.
const MAINTENANCE_MODE = false;

// --- localStorage Reviews Persistence ---
const REVIEWS_STORAGE_KEY = "dl_reviews_v1";

function loadSavedReviews() {
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveReview(review) {
  const reviews = loadSavedReviews();
  reviews.push(review);
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch (e) {}
}

function deleteReviewFromStorage(name, role, text, rating) {
  let reviews = loadSavedReviews();
  reviews = reviews.filter(r => !(r.name === name && r.role === role && r.text === text && r.rating === rating));
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch (e) {}
}

document.addEventListener("DOMContentLoaded", () => {
  
  // --- MAINTENANCE MODE HANDLER ---
  const maintenanceOverlay = document.getElementById("maintenance-overlay");
  if (maintenanceOverlay) {
    if (MAINTENANCE_MODE) {
      maintenanceOverlay.style.display = "flex";
      document.body.style.overflow = "hidden";
      const introVideo = document.getElementById("intro-video");
      if (introVideo) {
        try { introVideo.pause(); } catch (err) {}
      }
      if (window.lucide) {
        window.lucide.createIcons();
      }
      return; // Stop initialization of the main website scripts
    } else {
      maintenanceOverlay.style.display = "none";
    }
  }

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- INTERACTIVE LUXURY CURSOR SPOTLIGHT ---
  if (!('ontouchstart' in window) && window.innerWidth > 768) {
    const spotlight = document.createElement("div");
    spotlight.className = "cursor-spotlight";
    spotlight.id = "cursor-spotlight";
    document.body.appendChild(spotlight);

    let mouseX = 0, mouseY = 0;
    let spotX = 0, spotY = 0;

    window.addEventListener("mousemove", e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      spotlight.style.opacity = "1";
    });

    window.addEventListener("mouseleave", () => {
      spotlight.style.opacity = "0";
    });

    function updateSpotlight() {
      spotX += (mouseX - spotX) * 0.08;
      spotY += (mouseY - spotY) * 0.08;
      spotlight.style.transform = `translate3d(${spotX - 150}px, ${spotY - 150}px, 0)`;
      requestAnimationFrame(updateSpotlight);
    }
    updateSpotlight();
  }

  // Set current year in footer
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- 1. GLASS CARD SPOTLIGHT GLOW ---
  const cards = document.querySelectorAll(".philosophy-card, .testimonial-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // --- 2. INTERACTIVE 3D HERO TILT ---
  const heroTiltCard = document.getElementById("hero-tilt-card");
  if (heroTiltCard) {
    heroTiltCard.addEventListener("mousemove", e => {
      const rect = heroTiltCard.getBoundingClientRect();
      const cardWidth = rect.width;
      const cardHeight = rect.height;
      const centerX = rect.left + cardWidth / 2;
      const centerY = rect.top + cardHeight / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Calculate rotation angles (max 15 degrees tilt)
      const rotateX = -(mouseY / (cardHeight / 2)) * 15;
      const rotateY = (mouseX / (cardWidth / 2)) * 15;

      heroTiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroTiltCard.addEventListener("mouseleave", () => {
      heroTiltCard.style.transform = "rotateX(0deg) rotateY(0deg)";
      heroTiltCard.style.transition = "transform 0.5s ease";
    });

    heroTiltCard.addEventListener("mouseenter", () => {
      heroTiltCard.style.transition = "none";
    });
  }

  // --- 3. MOBILE MENU TOGGLE ---
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      if (isOpen) {
        mobileToggle.innerHTML = `<i data-lucide="x"></i>`;
      } else {
        mobileToggle.innerHTML = `<i data-lucide="menu"></i>`;
      }
      window.lucide.createIcons();
    });

    // Close mobile menu on clicking links
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        mobileToggle.innerHTML = `<i data-lucide="menu"></i>`;
        window.lucide.createIcons();
      });
    });
  }

  // --- 4. 3D PAGE-TURNING NAVIGATION ENGINE ---
  const sections = Array.from(document.querySelectorAll("main.sections-container section"));
  let currentSectionIndex = 0;
  let isTransitioning = false;
  let lastWheelTime = 0;

  function updateActiveLink(targetHash) {
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === targetHash) {
        link.classList.add("active");
      }
    });

    // Run philosophy statistics counter animation when entering #philosophy
    if (targetHash === "#philosophy") {
      runStatsCounter();
    } else {
      resetStatsCounter();
    }
  }

  // --- PHILOSOPHY STATISTICS COUNTER ANIMATION ---
  function runStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute("data-target"), 10);
      let suffix = "";
      if (stat.id === "stat-works") suffix = "+";
      else if (stat.id === "stat-experience") suffix = "+";
      else if (stat.id === "stat-satisfaction") suffix = "%";

      const duration = 1500; // 1.5 seconds
      const startTime = performance.now();

      function updateNumber(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeProgress * target);
        
        stat.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          stat._animationFrame = requestAnimationFrame(updateNumber);
        } else {
          stat.textContent = target.toLocaleString() + suffix;
        }
      }

      // Cancel any ongoing animation frame
      if (stat._animationFrame) {
        cancelAnimationFrame(stat._animationFrame);
      }
      
      stat.textContent = "0" + suffix;
      stat._animationFrame = requestAnimationFrame(updateNumber);
    });
  }

  function resetStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach(stat => {
      if (stat._animationFrame) {
        cancelAnimationFrame(stat._animationFrame);
      }
      let suffix = "";
      if (stat.id === "stat-works") suffix = "+";
      else if (stat.id === "stat-experience") suffix = "+";
      else if (stat.id === "stat-satisfaction") suffix = "%";
      stat.textContent = "0" + suffix;
    });
  }

  function turnPageTo(index) {
    if (index < 0 || index >= sections.length || index === currentSectionIndex || isTransitioning) return;
    isTransitioning = true;

    const currentSection = sections[currentSectionIndex];
    const targetSection = sections[index];

    // Toggle background image visibility based on whether we are on Home page (index 0)
    const bgWrap = document.querySelector(".hero-bg-image-wrap");
    if (bgWrap) {
      if (index === 0) {
        bgWrap.style.opacity = "1";
      } else {
        bgWrap.style.opacity = "0";
      }
    }

    // Reset scroll of target section immediately
    targetSection.scrollTop = 0;

    // Distribute classes for the rotation flip direction
    sections.forEach((sec, idx) => {
      sec.classList.remove("active", "flipped-next", "flipped-prev");
      if (idx < index) {
        sec.classList.add("flipped-next");
      } else if (idx > index) {
        sec.classList.add("flipped-prev");
      }
    });

    targetSection.classList.add("active");
    currentSectionIndex = index;

    // Sync active nav links
    const sectionId = targetSection.getAttribute("id");
    updateActiveLink(`#${sectionId}`);

    // Wait for the transition time (900ms) to clear lock
    setTimeout(() => {
      isTransitioning = false;
    }, 900);
  }

  // Menu navigation links click handler
  document.querySelectorAll("header a[href^='#'], .logo, .hero-actions button, #placeholder-packages-link, #philo-cta-packages").forEach(elem => {
    elem.addEventListener("click", e => {
      let targetHash = elem.getAttribute("href");
      // If triggered from button attributes or custom onclick
      if (!targetHash && elem.getAttribute("onclick")) {
        const match = elem.getAttribute("onclick").match(/#\w+/);
        if (match) targetHash = match[0];
      }
      if (!targetHash) return;

      const targetIndex = sections.findIndex(sec => `#${sec.getAttribute("id")}` === targetHash);
      if (targetIndex !== -1) {
        e.preventDefault();
        turnPageTo(targetIndex);
        history.pushState(null, null, targetHash);
      }
    });
  });

  // Browser Back/Forward buttons integration
  window.addEventListener("popstate", () => {
    const hash = window.location.hash || "#home";
    const idx = sections.findIndex(sec => `#${sec.getAttribute("id")}` === hash);
    if (idx !== -1 && idx !== currentSectionIndex) {
      turnPageTo(idx);
    }
  });

  // Detect if any lightbox, sub-gallery, or modal overlay is currently open
  function isModalOverlayActive() {
    const overlays = [
      document.getElementById("sub-gallery-overlay"),
      document.getElementById("image-lightbox"),
      document.getElementById("policy-modal"),
      document.getElementById("customizer-modal"),
      document.getElementById("reaction-modal")
    ];
    return overlays.some(overlay => overlay && overlay.classList.contains("open"));
  }

  // Mouse wheel scroll triggers page flip
  window.addEventListener("wheel", e => {
    if (isModalOverlayActive()) return;

    const now = Date.now();
    if (now - lastWheelTime < 1300) return; // cooldown to prevent quick skipping

    const activeSec = sections[currentSectionIndex];
    const isScrollable = activeSec.scrollHeight > activeSec.clientHeight;

    if (e.deltaY > 50) {
      // Scroll Down -> Flipping forward
      if (!isScrollable || (activeSec.scrollTop + activeSec.clientHeight >= activeSec.scrollHeight - 10)) {
        if (currentSectionIndex < sections.length - 1) {
          lastWheelTime = now;
          turnPageTo(currentSectionIndex + 1);
        }
      }
    } else if (e.deltaY < -50) {
      // Scroll Up -> Flipping backward
      if (!isScrollable || activeSec.scrollTop <= 10) {
        if (currentSectionIndex > 0) {
          lastWheelTime = now;
          turnPageTo(currentSectionIndex - 1);
        }
      }
    }
  }, { passive: true });

  // Swipe gesture support for mobile devices
  let touchStartY = 0;
  window.addEventListener("touchstart", e => {
    if (isModalOverlayActive()) return;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener("touchend", e => {
    if (isModalOverlayActive()) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    const activeSec = sections[currentSectionIndex];
    const isScrollable = activeSec.scrollHeight > activeSec.clientHeight;

    if (Math.abs(deltaY) < 60) return; // ignore minor swipe jitters

    if (deltaY > 0) {
      // Swiped Up -> Scroll Down
      if (!isScrollable || (activeSec.scrollTop + activeSec.clientHeight >= activeSec.scrollHeight - 10)) {
        if (currentSectionIndex < sections.length - 1) {
          turnPageTo(currentSectionIndex + 1);
        }
      }
    } else {
      // Swiped Down -> Scroll Up
      if (!isScrollable || activeSec.scrollTop <= 10) {
        if (currentSectionIndex > 0) {
          turnPageTo(currentSectionIndex - 1);
        }
      }
    }
  }, { passive: true });

  // --- 5. PORTFOLIO FILTERABLE GALLERY ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");
        if (filterVal === "all" || itemCategory === filterVal) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // --- 6. SUB-GALLERY WORKFLOW & DATA ---
  const subGalleryOverlay = document.getElementById("sub-gallery-overlay");
  const subGalleryClose = document.getElementById("sub-gallery-close");
  const subTitle = document.getElementById("sub-title");
  const subTag = document.getElementById("sub-tag");
  const subCoverImg = document.getElementById("sub-cover-img");
  const subGalleryGrid = document.getElementById("sub-gallery-grid");

  // Official Portfolio Data indexed from local directories
  const sessionImages = {
    "susmi-petter": {
      title: "Susmi & Petter",
      category: "Wedding / Ceremony",
      cover: "images/Susmi%20%26%20Petter/ASK00126.jpg",
      images: [
        "images/Susmi%20%26%20Petter/ASK00126.jpg",
        "images/Susmi%20%26%20Petter/ASK00387.jpg",
        "images/Susmi%20%26%20Petter/ASK07116.jpg",
        "images/Susmi%20%26%20Petter/ASK07194.jpg",
        "images/Susmi%20%26%20Petter/ASK07530.jpg",
        "images/Susmi%20%26%20Petter/ASK07542.jpg",
        "images/Susmi%20%26%20Petter/ASK07574.jpg",
        "images/Susmi%20%26%20Petter/ASK07596.jpg",
        "images/Susmi%20%26%20Petter/ASK07601.jpg",
        "images/Susmi%20%26%20Petter/ASK07604.jpg",
        "images/Susmi%20%26%20Petter/ASK07625.jpg",
        "images/Susmi%20%26%20Petter/ASK07628.jpg",
        "images/Susmi%20%26%20Petter/ASK07657.jpg",
        "images/Susmi%20%26%20Petter/ASK07671.jpg",
        "images/Susmi%20%26%20Petter/ASK07691.jpg",
        "images/Susmi%20%26%20Petter/ASK07719.jpg",
        "images/Susmi%20%26%20Petter/ASK07778.jpg",
        "images/Susmi%20%26%20Petter/ASK07810.jpg",
        "images/Susmi%20%26%20Petter/ASK07812.jpg",
        "images/Susmi%20%26%20Petter/ASK07824.jpg",
        "images/Susmi%20%26%20Petter/ASK07851.jpg",
        "images/Susmi%20%26%20Petter/ASK07859.jpg",
        "images/Susmi%20%26%20Petter/ASK07890.jpg",
        "images/Susmi%20%26%20Petter/ASK07902.jpg",
        "images/Susmi%20%26%20Petter/ASK07915.jpg",
        "images/Susmi%20%26%20Petter/ASK07978.jpg",
        "images/Susmi%20%26%20Petter/ASK07981.jpg",
        "images/Susmi%20%26%20Petter/ASK08017.jpg",
        "images/Susmi%20%26%20Petter/ASK08030.jpg",
        "images/Susmi%20%26%20Petter/ASK08062.jpg",
        "images/Susmi%20%26%20Petter/ASK08137.jpg",
        "images/Susmi%20%26%20Petter/ASK08216.jpg",
        "images/Susmi%20%26%20Petter/ASK08232.jpg",
        "images/Susmi%20%26%20Petter/ASK08388.jpg",
        "images/Susmi%20%26%20Petter/ASK08571.jpg",
        "images/Susmi%20%26%20Petter/ASK08662.jpg",
        "images/Susmi%20%26%20Petter/ASK09861.jpg",
        "images/Susmi%20%26%20Petter/ASK09865.jpg",
        "images/Susmi%20%26%20Petter/DLP_5980.jpg",
        "images/Susmi%20%26%20Petter/DLP_6056.jpg",
        "images/Susmi%20%26%20Petter/DLP_7735.jpg",
        "images/Susmi%20%26%20Petter/DLP_7737.jpg",
        "images/Susmi%20%26%20Petter/SAR0318a0.jpg",
        "images/Susmi%20%26%20Petter/SAR02805.jpg",
        "images/Susmi%20%26%20Petter/SAR02856.jpg",
        "images/Susmi%20%26%20Petter/SAR02891.jpg",
        "images/Susmi%20%26%20Petter/SAR03011.jpg",
        "images/Susmi%20%26%20Petter/SAR03089.jpg",
        "images/Susmi%20%26%20Petter/SAR03167a.jpg",
        "images/Susmi%20%26%20Petter/SAR03180.jpg",
        "images/Susmi%20%26%20Petter/SAR03254.jpg",
        "images/Susmi%20%26%20Petter/SAR03294.jpg",
        "images/Susmi%20%26%20Petter/SAR03743.jpg",
        "images/Susmi%20%26%20Petter/SAR04675.jpg",
        "images/Susmi%20%26%20Petter/SAR04691.jpg",
        "images/Susmi%20%26%20Petter/SAR04906.jpg",
        "images/Susmi%20%26%20Petter/SAR04921.jpg",
        "images/Susmi%20%26%20Petter/SAR04927.jpg",
        "images/Susmi%20%26%20Petter/SAR05618.jpg"
      ]
    },

    "tony": {
      title: "Tony",
      category: "Portrait / Studio",
      cover: "images/Tony/DLP_1000.jpg",
      images: [
        "images/Tony/DLP_1000.jpg",
        "images/Tony/DLP_1034.jpg",
        "images/Tony/DLP_1221.jpg",
        "images/Tony/DLP_1295.jpg",
        "images/Tony/DLP_1304.jpg",
        "images/Tony/DLP_1305.jpg",
        "images/Tony/DLP_2906.jpg",
        "images/Tony/FGC03875.jpg",
        "images/Tony/FGC04004.jpg",
        "images/Tony/FGC04077.jpg",
        "images/Tony/FGC04099.jpg",
        "images/Tony/FGC04152.jpg",
        "images/Tony/FGC05236.jpg",
        "images/Tony/FGC05244.jpg",
        "images/Tony/FGC05273.jpg",
        "images/Tony/FGC05317.jpg",
        "images/Tony/FGC05393.jpg",
        "images/Tony/FGC05513.jpg",
        "images/Tony/FGC05530.jpg",
        "images/Tony/FGC05955.jpg",
        "images/Tony/FGC06276.jpg",
        "images/Tony/FGC06322.jpg",
        "images/Tony/FGC06352.jpg",
        "images/Tony/FGC07959.jpg",
        "images/Tony/FGC08019.jpg",
        "images/Tony/FGC09427.jpg",
        "images/Tony/FGC09510.jpg",
        "images/Tony/FGC09631.jpg"
      ]
    },
    "feba": {
      title: "Feba",
      category: "Portrait / Studio",
      cover: "images/Feba/IMG_2686.JPG",
      images: [
        "images/Feba/IMG_2686.JPG",
        "images/Feba/IMG_2691.JPG"
      ]
    },
    "dr-eldhose-anju": {
      title: "Dr. Eldhose & Dr. Anju",
      category: "Wedding / Ceremony",
      cover: "images/Dr.%20Eldhode%20And%20Dr.%20Anju/01.jpeg",
      images: [
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/01.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/2CBECDAE-DDDF-4BA1-96D1-6881802C8813.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/5EBB462B-FEE9-4E96-A80B-8C3F94C8B515.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/5F2D7AC5-2B24-4363-97B0-ABDE29C9A1A7.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/8A8F967E-24D2-4CEA-8CDF-B4D8D94E425B.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/9BD837D2-2356-48ED-A238-F5D960AE2AFB.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/48A91AF0-DD7D-46B9-9152-A5780486B75B.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/56D99322-6705-4881-BF3A-0520EB39BFC2.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/61D32A3F-01E8-407E-8502-9C6AA4779F0D.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/63CA7C52-0CFE-4FE1-8EE5-12FAACF53764.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/73CA277B-4B93-4E26-9450-AE9B202145A6.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/78D9E097-6F8B-4DA2-B7E8-EBA47ED0D92B.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/215C4CCA-92A7-4A98-94BA-685CA6257793.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/217BDBD1-1009-433A-9BEA-5199570B8AEB.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/304F56A2-D051-407F-90D6-0F60B4ECCEC1.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/754BF865-43B1-4DC6-B9CE-87A15F30F55D.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/70992A77-D24B-4C8B-A997-1097649A0984.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/1825307F-9A80-4083-8FB3-190ADCEA3377.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/A75A0187-20D2-40EE-B665-48371F3C59F0.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/B2C97217-4B70-496E-8D2C-D708B9EA5613.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/B35F5F7B-00E0-4992-965D-4D68C77D36B2.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/C963B9A9-272B-4C7E-A46F-2C567BB17FF0.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/CB92D7AE-35ED-4275-BD8B-2EA4B7833BC6.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/DE441FAC-67FC-4766-A914-6DD93E2C4652.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/F38BC210-F98E-4859-87F3-9B23251FBA39.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/F972114C-BB62-413A-9E17-D616CAEBE6D1.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2450.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2452.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2453.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2455.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2456.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2457.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2458.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2459.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2460.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2475.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2476.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2477.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2478.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2479.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2480.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2481.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2482.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2483.JPG.jpeg",
        "images/Dr.%20Eldhode%20And%20Dr.%20Anju/IMG_2484.JPG.jpeg"
      ]
    },
    "christening": {
      title: "Christening Ceremony",
      category: "Christening / Ceremony",
      cover: "images/BAPTISM/IMG_0518.JPG",
      images: [
        "images/BAPTISM/IMG_0518.JPG",
        "images/BAPTISM/IMG_0519.JPG",
        "images/BAPTISM/IMG_0520.JPG",
        "images/BAPTISM/IMG_0521.JPG",
        "images/BAPTISM/IMG_0522.JPG",
        "images/BAPTISM/IMG_0523.JPG",
        "images/BAPTISM/IMG_0524.JPG",
        "images/BAPTISM/IMG_0525.JPG",
        "images/BAPTISM/IMG_0526.JPG",
        "images/BAPTISM/IMG_0527.JPG",
        "images/BAPTISM/IMG_0528.JPG",
        "images/BAPTISM/IMG_0529.JPG",
        "images/BAPTISM/IMG_0530.JPG",
        "images/BAPTISM/IMG_0531.JPG",
        "images/BAPTISM/IMG_0592.JPG",
        "images/BAPTISM/IMG_0594.JPG",
        "images/BAPTISM/IMG_0595.JPG",
        "images/BAPTISM/IMG_0596.JPG",
        "images/BAPTISM/IMG_0597.JPG",
        "images/BAPTISM/IMG_0598.JPG",
        "images/BAPTISM/IMG_0599.JPG",
        "images/BAPTISM/IMG_0600.JPG",
        "images/BAPTISM/IMG_0601.JPG",
        "images/BAPTISM/IMG_0602.JPG",
        "images/BAPTISM/IMG_0603.JPG",
        "images/BAPTISM/IMG_0606.JPG",
        "images/BAPTISM/IMG_0608.JPG",
        "images/BAPTISM/IMG_0619.JPG",
        "images/BAPTISM/IMG_0620.JPG",
        "images/BAPTISM/IMG_0621.JPG",
        "images/BAPTISM/IMG_0622.JPG",
        "images/BAPTISM/IMG_0623.JPG",
        "images/BAPTISM/IMG_0624.JPG",
        "images/BAPTISM/IMG_0625.JPG",
        "images/BAPTISM/IMG_0626.JPG",
        "images/BAPTISM/IMG_0627.JPG",
        "images/BAPTISM/IMG_0628.JPG",
        "images/BAPTISM/IMG_0629.JPG",
        "images/BAPTISM/IMG_0630.JPG",
        "images/BAPTISM/IMG_0631.JPG",
        "images/BAPTISM/IMG_0632.JPG",
        "images/BAPTISM/IMG_0633.JPG",
        "images/BAPTISM/IMG_0634.JPG",
        "images/BAPTISM/IMG_0638.JPG",
        "images/BAPTISM/IMG_0639.JPG",
        "images/BAPTISM/IMG_0640.JPG",
        "images/BAPTISM/IMG_0642.JPG",
        "images/BAPTISM/IMG_0647.JPG",
        "images/BAPTISM/IMG_0648.JPG",
        "images/BAPTISM/IMG_0649.JPG",
        "images/BAPTISM/IMG_0650.JPG",
        "images/BAPTISM/IMG_0942.JPG",
        "images/BAPTISM/IMG_0943.JPG",
        "images/BAPTISM/IMG_0944.JPG",
        "images/BAPTISM/IMG_0945.JPG",
        "images/BAPTISM/IMG_0946.JPG",
        "images/BAPTISM/IMG_0947.JPG",
        "images/BAPTISM/IMG_0948.JPG",
        "images/BAPTISM/IMG_1016.JPG",
        "images/BAPTISM/IMG_1017.JPG",
        "images/BAPTISM/IMG_1018.JPG",
        "images/BAPTISM/IMG_1019.JPG",
        "images/BAPTISM/IMG_1027.JPG",
        "images/BAPTISM/IMG_1028.JPG",
        "images/BAPTISM/IMG_1029.JPG",
        "images/BAPTISM/IMG_1030.JPG",
        "images/BAPTISM/IMG_1031.JPG",
        "images/BAPTISM/IMG_1032.JPG",
        "images/BAPTISM/IMG_1033.JPG",
        "images/BAPTISM/IMG_1034.JPG",
        "images/BAPTISM/IMG_1035.JPG",
        "images/BAPTISM/IMG_1036.JPG",
        "images/BAPTISM/IMG_1037.JPG",
        "images/BAPTISM/IMG_1039.JPG",
        "images/BAPTISM/IMG_1041.JPG",
        "images/BAPTISM/IMG_1045.JPG",
        "images/BAPTISM/IMG_1046.JPG",
        "images/BAPTISM/IMG_1047.JPG",
        "images/BAPTISM/IMG_1048.JPG",
        "images/BAPTISM/IMG_1049.JPG",
        "images/BAPTISM/IMG_1050.JPG",
        "images/BAPTISM/IMG_1051.JPG",
        "images/BAPTISM/IMG_1052.JPG",
        "images/BAPTISM/IMG_1053.JPG",
        "images/BAPTISM/IMG_1054.JPG",
        "images/BAPTISM/IMG_1055.JPG",
        "images/BAPTISM/IMG_1056.JPG",
        "images/BAPTISM/IMG_1057.JPG",
        "images/BAPTISM/IMG_1058.JPG",
        "images/BAPTISM/IMG_1059.JPG",
        "images/BAPTISM/IMG_1060.JPG",
        "images/BAPTISM/IMG_1061.JPG",
        "images/BAPTISM/IMG_1062.JPG",
        "images/BAPTISM/IMG_1063.JPG",
        "images/BAPTISM/IMG_1064.JPG",
        "images/BAPTISM/IMG_1065.JPG",
        "images/BAPTISM/IMG_1066.JPG",
        "images/BAPTISM/IMG_1067.JPG",
        "images/BAPTISM/IMG_1068.JPG",
        "images/BAPTISM/IMG_1069.JPG",
        "images/BAPTISM/IMG_1070.JPG",
        "images/BAPTISM/IMG_1071.JPG",
        "images/BAPTISM/IMG_1072.JPG"
      ]
    },
    "baby-shoot": {
      title: "Baby Shoot",
      category: "Baby / Portrait",
      cover: "images/Baby%20Shoot/DLP_0277.jpg",
      images: [
        "images/Baby%20Shoot/DLP_0277.jpg",
        "images/Baby%20Shoot/DLP_0335.jpg",
        "images/Baby%20Shoot/DLP_0361.jpg",
        "images/Baby%20Shoot/DLP_0404.jpg",
        "images/Baby%20Shoot/DLP_0423.jpg",
        "images/Baby%20Shoot/DLP_0432.jpg",
        "images/Baby%20Shoot/DLP_0450.jpg",
        "images/Baby%20Shoot/DLP_0459.jpg",
        "images/Baby%20Shoot/DLP_0470.jpg",
        "images/Baby%20Shoot/DLP_0491.jpg",
        "images/Baby%20Shoot/DLP_0513.jpg",
        "images/Baby%20Shoot/DLP_0535.jpg",
        "images/Baby%20Shoot/DLP_0541.jpg",
        "images/Baby%20Shoot/DLP_0545.jpg",
        "images/Baby%20Shoot/DLP_0548.jpg",
        "images/Baby%20Shoot/DLP_0556.jpg",
        "images/Baby%20Shoot/DLP_0565.jpg",
        "images/Baby%20Shoot/DLP_0581.jpg",
        "images/Baby%20Shoot/DLP_0584.jpg",
        "images/Baby%20Shoot/DLP_0587.jpg",
        "images/Baby%20Shoot/DLP_0624.jpg",
        "images/Baby%20Shoot/DLP_0639.jpg",
        "images/Baby%20Shoot/DLP_0644.jpg",
        "images/Baby%20Shoot/DLP_1115.jpg",
        "images/Baby%20Shoot/DLP_1118.jpg",
        "images/Baby%20Shoot/DLP_1171.jpg",
        "images/Baby%20Shoot/DLP_1181.jpg",
        "images/Baby%20Shoot/DLP_1712.jpg",
        "images/Baby%20Shoot/DLP_1753.jpg",
        "images/Baby%20Shoot/DLP_1817.jpg",
        "images/Baby%20Shoot/DLP_2056.jpg",
        "images/Baby%20Shoot/DLP_2064.jpg",
        "images/Baby%20Shoot/DLP_2068.jpg",
        "images/Baby%20Shoot/DLP_2070.jpg",
        "images/Baby%20Shoot/DLP_2118.jpg",
        "images/Baby%20Shoot/DLP_2155.jpg",
        "images/Baby%20Shoot/DLP_2162.jpg",
        "images/Baby%20Shoot/DLP_2318.jpg",
        "images/Baby%20Shoot/DLP_2320.jpg",
        "images/Baby%20Shoot/DLP_2448.jpg",
        "images/Baby%20Shoot/DLP_2594.jpg",
        "images/Baby%20Shoot/DLP_2673.jpg",
        "images/Baby%20Shoot/DLP_5237.jpg",
        "images/Baby%20Shoot/DLP_5246.jpg",
        "images/Baby%20Shoot/DLP_5285.jpg",
        "images/Baby%20Shoot/DLP_5326.jpg",
        "images/Baby%20Shoot/DLP_5574.jpg",
        "images/Baby%20Shoot/DLP_5748.jpg",
        "images/Baby%20Shoot/DLP_5760.jpg",
        "images/Baby%20Shoot/DLP_5852.jpg",
        "images/Baby%20Shoot/DLP_5918.jpg",
        "images/Baby%20Shoot/DLP_9554.jpg",
        "images/Baby%20Shoot/DLP_9561.jpg",
        "images/Baby%20Shoot/DLP_9596.jpg",
        "images/Baby%20Shoot/DLP_9649.jpg",
        "images/Baby%20Shoot/DLP_9672.jpg",
        "images/Baby%20Shoot/DLP_9735.jpg"
      ]
    },
    "maternity": {
      title: "Maternity",
      category: "Maternity / Fine Art",
      cover: "images/Maternity/IMG_0176.JPG",
      images: [
        "images/Maternity/IMG_0176.JPG",
        "images/Maternity/IMG_0177.JPG",
        "images/Maternity/IMG_0179.JPG",
        "images/Maternity/IMG_0180.JPG",
        "images/Maternity/IMG_0181.JPG",
        "images/Maternity/IMG_0182.JPG",
        "images/Maternity/IMG_0183.JPG",
        "images/Maternity/IMG_0184.JPG",
        "images/Maternity/IMG_0185.JPG",
        "images/Maternity/IMG_0186.JPG",
        "images/Maternity/IMG_0187.JPG",
        "images/Maternity/IMG_0188.JPG",
        "images/Maternity/IMG_0189.JPG",
        "images/Maternity/IMG_0190.JPG",
        "images/Maternity/IMG_0191.JPG",
        "images/Maternity/IMG_0192.JPG",
        "images/Maternity/IMG_0193.JPG",
        "images/Maternity/IMG_0194.JPG",
        "images/Maternity/IMG_0438.JPG",
        "images/Maternity/IMG_0439.JPG",
        "images/Maternity/IMG_0440.JPG",
        "images/Maternity/IMG_0441.JPG",
        "images/Maternity/IMG_0442.JPG",
        "images/Maternity/IMG_0443.JPG",
        "images/Maternity/IMG_0444.JPG",
        "images/Maternity/IMG_0445.JPG",
        "images/Maternity/IMG_0446.JPG",
        "images/Maternity/IMG_0447.JPG",
        "images/Maternity/IMG_0448.JPG",
        "images/Maternity/IMG_0449.JPG",
        "images/Maternity/IMG_0450.JPG",
        "images/Maternity/IMG_0451.JPG",
        "images/Maternity/IMG_0452.JPG",
        "images/Maternity/IMG_0453.JPG",
        "images/Maternity/IMG_0454.JPG",
        "images/Maternity/IMG_0455.JPG",
        "images/Maternity/IMG_0456.JPG",
        "images/Maternity/IMG_0457.JPG"
      ]
    }
  };

  let activeSessionImages = [];
  let currentSessionImgIndex = 0;

  document.querySelectorAll(".gallery-item").forEach(card => {
    card.addEventListener("click", () => {
      const sessionId = card.getAttribute("data-id");
      const session = sessionImages[sessionId];
      if (!session) return;

      subTitle.textContent = session.title;
      subTag.textContent = session.category;
      subCoverImg.src = session.cover;

      subGalleryGrid.innerHTML = "";
      activeSessionImages = session.images;

      session.images.forEach((imgUrl, index) => {
        const item = document.createElement("div");
        item.className = "sub-image-card";
        item.innerHTML = `<img src="${imgUrl}" alt="Session Image ${index + 1}" loading="lazy">`;
        item.addEventListener("click", (e) => {
          e.stopPropagation(); // prevent closing overlay
          currentSessionImgIndex = index;
          openLightbox(imgUrl);
        });
        subGalleryGrid.appendChild(item);
      });

      subGalleryOverlay.classList.add("open");
    });
  });

  if (subGalleryClose) {
    subGalleryClose.addEventListener("click", () => {
      subGalleryOverlay.classList.remove("open");
    });
  }

  // --- 7. FULLSCREEN LIGHTBOX MODAL ---
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add("open");
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove("open");
    }
  }

  function navigateLightbox(direction) {
    if (activeSessionImages.length === 0) return;
    currentSessionImgIndex = (currentSessionImgIndex + direction + activeSessionImages.length) % activeSessionImages.length;
    if (lightboxImg) {
      lightboxImg.src = activeSessionImages[currentSessionImgIndex];
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => navigateLightbox(-1));
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => navigateLightbox(1));
  }

  // Bind keyboard navigation for lightbox
  window.addEventListener("keydown", e => {
    if (lightbox && lightbox.classList.contains("open")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    }
  });

  // Close lightbox on clicking backdrop
  if (lightbox) {
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // --- 8. DYNAMIC CALCULATOR & BESPOKE CUSTOMIZER ---
  const customizerModal = document.getElementById("customizer-modal");
  const openCustomizerBtn = document.getElementById("open-customizer-btn");
  const closeCustomizerBtn = document.getElementById("customizer-close");
  const saveCustomizerBtn = document.getElementById("customizer-save-btn");

  const customizerState = {
    baseService: "gold",
    prewedEnabled: false,
    engagementEnabled: false,
    eveEnabled: true,
    dayEnabled: true,
    
    prewedPhotographers: 1,
    prewedVideographers: 0,
    
    engagementPhotographers: 1,
    engagementVideographers: 1,
    
    evePhotographers: 1,
    eveVideographers: 1,
    
    dayPhotographers: 1,
    dayVideographers: 1,
    
    albumsCount: 0,
    framesCount: 1,
    drone: false,
    ai: false,
    livestream: false,
    prewed: false,
    teaserReel: true,
    fullFilm: false,
    socialReels: true,
    parentAlbum: true,
    editedPhotos: "100",
    isCustomized: false
  };

  const defaultTemplates = {
    silver: {
      prewedEnabled: false,
      engagementEnabled: false,
      eveEnabled: true,
      dayEnabled: true,
      prewedPhotographers: 0,
      prewedVideographers: 0,
      engagementPhotographers: 1,
      engagementVideographers: 1,
      evePhotographers: 1,
      eveVideographers: 1,
      dayPhotographers: 1,
      dayVideographers: 1,
      albumsCount: 1,
      framesCount: 1,
      drone: false,
      ai: false,
      livestream: false,
      teaserReel: true,
      fullFilm: false,
      socialReels: false,
      parentAlbum: false,
      editedPhotos: "0"
    },
    gold: {
      prewedEnabled: true,
      engagementEnabled: true,
      eveEnabled: true,
      dayEnabled: true,
      prewedPhotographers: 1,
      prewedVideographers: 0,
      engagementPhotographers: 1,
      engagementVideographers: 1,
      evePhotographers: 1,
      eveVideographers: 1,
      dayPhotographers: 1,
      dayVideographers: 1,
      albumsCount: 1,
      framesCount: 1,
      drone: false,
      ai: false,
      livestream: false,
      teaserReel: true,
      fullFilm: true,
      socialReels: true,
      parentAlbum: false,
      editedPhotos: "30"
    },
    diamond: {
      prewedEnabled: true,
      engagementEnabled: true,
      eveEnabled: true,
      dayEnabled: true,
      prewedPhotographers: 1,
      prewedVideographers: 1,
      engagementPhotographers: 2,
      engagementVideographers: 2,
      evePhotographers: 2,
      eveVideographers: 2,
      dayPhotographers: 2,
      dayVideographers: 2,
      albumsCount: 2,
      framesCount: 1,
      drone: true,
      ai: true,
      livestream: false,
      teaserReel: true,
      fullFilm: true,
      socialReels: true,
      parentAlbum: true,
      editedPhotos: "60"
    }
  };

  function updateCustomizerUI() {
    const serviceDropdown = document.getElementById("booking-service");
    const serviceVal = serviceDropdown ? serviceDropdown.value : "custom";

    const eventDropdown = document.getElementById("booking-event");
    const eventVal = eventDropdown && eventDropdown.value ? eventDropdown.value : "wedding";

    const prewedCard = document.getElementById("session-card-prewed");
    const engagementCard = document.getElementById("session-card-engagement");
    const eveCard = document.getElementById("session-card-eve");
    const dayCard = document.getElementById("session-card-day");
    
    // Day session checkbox label
    const dayLabel = dayCard ? dayCard.querySelector(".session-checkbox-label span") : null;
    
    // Premium features and deliverables control blocks
    const featuresBlock = document.getElementById("customizer-features-block");
    const deliverablesBlock = document.getElementById("customizer-deliverables-block");

    if (eventVal !== "wedding") {
      // Non-wedding event: Hide prewed, engagement, eve sessions
      if (prewedCard) {
        prewedCard.style.display = "none";
        customizerState.prewedEnabled = false;
      }
      if (engagementCard) {
        engagementCard.style.display = "none";
        customizerState.engagementEnabled = false;
      }
      if (eveCard) {
        eveCard.style.display = "none";
        customizerState.eveEnabled = false;
      }
      
      if (dayLabel) {
        dayLabel.textContent = eventVal === "christening" ? "Christening Day Coverage" :
                               eventVal === "fixation" ? "Fixation Ceremony Day Coverage" :
                               eventVal === "bridetobe" ? "Bride-to-be Day Coverage" : "Event Day Coverage";
      }
      
      // Show sections 2 (Premium Features) and 3 (Curation Deliverables)
      if (featuresBlock) featuresBlock.style.display = "block";
      if (deliverablesBlock) deliverablesBlock.style.display = "block";
    } else {
      // Wedding event: Show all applicable sessions
      if (prewedCard) {
        if (serviceVal === "silver") {
          prewedCard.style.display = "none";
          customizerState.prewedEnabled = false;
        } else {
          prewedCard.style.display = "block";
        }
      }
      if (engagementCard) engagementCard.style.display = "block";
      if (eveCard) eveCard.style.display = "block";
      
      if (dayLabel) dayLabel.textContent = "Wedding Day";
      
      if (featuresBlock) featuresBlock.style.display = "block";
      if (deliverablesBlock) deliverablesBlock.style.display = "block";
    }

    // Sync session checkboxes, summaries and values
    const sessions = ["prewed", "engagement", "eve", "day"];
    sessions.forEach(s => {
      const cb = document.getElementById(`add-session-${s}`);
      const card = document.getElementById(`session-card-${s}`);
      const isEnabled = customizerState[`${s}Enabled`];
      if (cb) cb.checked = isEnabled;
      if (card) {
        if (isEnabled) card.classList.add("active");
        else card.classList.remove("active");
      }

      const phVal = document.getElementById(`c-${s}Photographers`);
      const viVal = document.getElementById(`c-${s}Videographers`);
      if (phVal) phVal.textContent = customizerState[`${s}Photographers`];
      if (viVal) viVal.textContent = customizerState[`${s}Videographers`];

      const summaryEl = document.getElementById(`summary-${s}`);
      if (summaryEl) {
        const ph = customizerState[`${s}Photographers`];
        const vi = customizerState[`${s}Videographers`];
        const parts = [];
        if (ph > 0) parts.push(`${ph} Photographer${ph > 1 ? 's' : ''}`);
        if (vi > 0) parts.push(`${vi} Videographer${vi > 1 ? 's' : ''}`);
        summaryEl.textContent = parts.length > 0 ? parts.join(" + ") : "No crew assigned";
      }
    });

    const deliverables = ['framesCount'];
    deliverables.forEach(item => {
      const valEl = document.getElementById(`c-${item}`);
      if (valEl) valEl.textContent = customizerState[item];
    });

    // Sync printed album checkbox
    const albumCheckbox = document.getElementById("add-printedAlbum");
    const albumCard = document.getElementById("card-add-printedAlbum");
    const albumDesc = document.getElementById("customizer-album-desc");
    if (albumCheckbox) {
      const isChecked = customizerState.albumsCount > 0;
      albumCheckbox.checked = isChecked;
      if (albumCard) {
        if (isChecked) albumCard.classList.add("active");
        else albumCard.classList.remove("active");
      }
      
      if (serviceVal === "silver") {
        albumDesc.textContent = "80 Pages Printed Album";
      } else if (serviceVal === "gold") {
        albumDesc.textContent = "120 Pages Luster Printed Album with Premium Box or Bag";
      } else if (serviceVal === "diamond") {
        albumDesc.textContent = "140 Pages Luster Printed Album with Premium Box or Bag";
      } else {
        const eventVal = document.getElementById("booking-event") ? document.getElementById("booking-event").value : "";
        if (eventVal === "christening") {
          albumDesc.textContent = "50 Pages Printed Album with Premium Box or Bag";
        } else if (eventVal === "fixation") {
          albumDesc.textContent = "80 Pages Printed Album with Premium Box or Bag";
        } else if (eventVal === "bridetobe") {
          albumDesc.textContent = "40 Pages Printed Album";
        } else {
          albumDesc.textContent = "Premium Flush-Mount Album";
        }
      }
    }

    // Sync checkboxes
    const addons = ['drone', 'ai', 'livestream', 'prewed', 'teaserReel', 'fullFilm', 'socialReels', 'parentAlbum'];
    addons.forEach(addon => {
      const inputEl = document.getElementById(`add-${addon}`);
      const cardEl = document.getElementById(`card-add-${addon}`);
      if (inputEl) {
        inputEl.checked = customizerState[addon];
        if (cardEl) {
          if (customizerState[addon]) {
            cardEl.classList.add("active");
          } else {
            cardEl.classList.remove("active");
          }
        }
      }
    });

    // Sync select dropdown
    const photosDropdown = document.getElementById("c-photosLimit");
    if (photosDropdown) {
      photosDropdown.value = customizerState.editedPhotos;
    }

    // Render summary counts
    let totalCrew = 0;
    const crewBreakdownEl = document.getElementById("c-sum-crew-breakdown");
    if (crewBreakdownEl) {
      crewBreakdownEl.innerHTML = "";
      sessions.forEach(s => {
        if (customizerState[`${s}Enabled`] && (s !== "prewed" || serviceVal !== "silver")) {
          const ph = customizerState[`${s}Photographers`];
          const vi = customizerState[`${s}Videographers`];
          if (ph > 0 || vi > 0) {
            const li = document.createElement("li");
            const crewText = [];
            if (ph > 0) crewText.push(`${ph} Photo`);
            if (vi > 0) crewText.push(`${vi} Cinema`);
            const labelCapitalized = s === "prewed" ? "Pre/Post-Wed" : s.charAt(0).toUpperCase() + s.slice(1);
            li.textContent = `${labelCapitalized}: ${crewText.join(" + ")}`;
            crewBreakdownEl.appendChild(li);
            totalCrew += (ph + vi);
          }
        }
      });
    }
    const crewTotalEl = document.getElementById("c-sum-crew");
    if (crewTotalEl) crewTotalEl.textContent = `${totalCrew} Crew Member${totalCrew !== 1 ? 's' : ''}`;

    const delivListEl = document.getElementById("c-sum-deliv-list");
    if (delivListEl) {
      delivListEl.innerHTML = "";
      const liPhotos = document.createElement("li");
      liPhotos.textContent = `${customizerState.editedPhotos === "0" ? "No" : customizerState.editedPhotos} Retouched Digital Negatives`;
      delivListEl.appendChild(liPhotos);

      if (customizerState.albumsCount > 0) {
        const li = document.createElement("li");
        const prefix = customizerState.albumsCount > 1 ? `${customizerState.albumsCount} x ` : "";
        if (serviceVal === "silver") {
          li.textContent = "80 Pages Printed Album";
        } else if (serviceVal === "gold") {
          li.textContent = "120 Pages Luster Printed Album with Premium Box or Bag";
        } else if (serviceVal === "diamond") {
          li.textContent = "140 Pages Luster Printed Album with Premium Box or Bag";
        } else {
          const eventVal = document.getElementById("booking-event") ? document.getElementById("booking-event").value : "";
          if (eventVal === "christening") {
            li.textContent = `${prefix}50 Pages Printed Album with Premium Box or Bag`;
          } else if (eventVal === "fixation") {
            li.textContent = `${prefix}80 Pages Printed Album with Premium Box or Bag`;
          } else if (eventVal === "bridetobe") {
            li.textContent = `${prefix}40 Pages Printed Album`;
          } else {
            li.textContent = `${customizerState.albumsCount} x Printed Album(s)`;
          }
        }
        delivListEl.appendChild(li);
      }


      const items = {
        teaserReel: "2-3 Min Cinematic Teaser Reel",
        fullFilm: "Full HD Film (2 hours)",
        socialReels: "Instagram & WhatsApp Reels",
        parentAlbum: "Mini Printed Album(s)"
      };
      for (const item in items) {
        if (customizerState[item]) {
          const li = document.createElement("li");
          li.textContent = items[item];
          delivListEl.appendChild(li);
        }
      }
    }

    const addonsListEl = document.getElementById("c-sum-addons-list");
    if (addonsListEl) {
      addonsListEl.innerHTML = "";
      const addLabels = {
        drone: "Aerial Drone Cinematography",
        ai: "AI Instant QR Sharing System",
        livestream: "Private Live Stream Broadcast Feed",
        prewed: "Pre-Wedding Cinema Session"
      };
      let hasAddons = false;
      for (const addon in addLabels) {
        if (customizerState[addon]) {
          const li = document.createElement("li");
          li.textContent = addLabels[addon];
          addonsListEl.appendChild(li);
          hasAddons = true;
        }
      }
      if (!hasAddons) {
        addonsListEl.innerHTML = "<li>No premium add-ons enabled</li>";
      }
    }
  }

  window.toggleEditCrew = function(session) {
    const panel = document.getElementById(`edit-panel-${session}`);
    if (panel) {
      const isHidden = panel.style.display === "none";
      panel.style.display = isHidden ? "block" : "none";
      const btn = document.getElementById(`btn-edit-${session}`);
      if (btn) btn.textContent = isHidden ? "Close Edit" : "Edit Crew";
    }
  };

  window.toggleCustomizerSession = function(session) {
    const cb = document.getElementById(`add-session-${session}`);
    if (cb) {
      customizerState[`${session}Enabled`] = cb.checked;
    }
    customizerState.isCustomized = true;
    updateCustomizerUI();
    syncSummaryDisplayCard();
  };

  window.adjustSessionCrew = function(session, role, amount) {
    const key = `${session}${role}`;
    customizerState[key] = Math.max(0, Math.min(10, customizerState[key] + amount));
    customizerState.isCustomized = true;
    updateCustomizerUI();
    syncSummaryDisplayCard();
  };

  window.adjustCustomizerDeliverable = function(item, amount) {
    customizerState[item] = Math.max(0, Math.min(5, customizerState[item] + amount));
    customizerState.isCustomized = true;
    updateCustomizerUI();
    syncSummaryDisplayCard();
  };

  window.toggleCustomizerAddon = function(addon) {
    const inputEl = document.getElementById(`add-${addon}`);
    if (inputEl) {
      customizerState[addon] = inputEl.checked;
    }
    customizerState.isCustomized = true;
    updateCustomizerUI();
    syncSummaryDisplayCard();
  };

  window.toggleCustomizerAlbumCheckbox = function() {
    const cb = document.getElementById("add-printedAlbum");
    if (!cb) return;
    
    const isChecked = cb.checked;
    const serviceDropdown = document.getElementById("booking-service");
    const serviceVal = serviceDropdown ? serviceDropdown.value : "custom";
    
    if (isChecked) {
      if (serviceVal === "diamond") {
        customizerState.albumsCount = 2;
      } else {
        customizerState.albumsCount = 1;
      }
    } else {
      customizerState.albumsCount = 0;
    }
    customizerState.isCustomized = true;
    updateCustomizerUI();
    syncSummaryDisplayCard();
  };

  window.updateCustomizerPhotosLimit = function() {
    const photosDropdown = document.getElementById("c-photosLimit");
    if (photosDropdown) {
      customizerState.editedPhotos = photosDropdown.value;
    }
    customizerState.isCustomized = true;
    updateCustomizerUI();
    syncSummaryDisplayCard();
  };

  // Sync state back to main booking form display panel
  function applyCustomizerToBooking() {
    const bookingService = document.getElementById("booking-service");
    const eventDropdown = document.getElementById("booking-event");
    const eventVal = eventDropdown && eventDropdown.value ? eventDropdown.value : "wedding";
    let matchedTier = "custom";
    if (bookingService) {
      if (eventVal === "wedding") {
        // Determine if the customizer state matches a standard template
        for (const tier in defaultTemplates) {
          const template = defaultTemplates[tier];
          let isMatch = true;
          for (const key in template) {
            if (customizerState[key] !== template[key]) {
              isMatch = false;
              break;
            }
          }
          if (isMatch) {
            matchedTier = tier;
            break;
          }
        }
      } else {
        matchedTier = "custom";
      }
      bookingService.value = matchedTier;
    }
    syncSummaryDisplayCard();
    if (customizerModal) {
      customizerModal.classList.remove("open");
    }

    // Instead of scrolling smoothly to booking container immediately, show gift modal first if wedding!
    const targetIdx = sections.findIndex(sec => sec.getAttribute("id") === "booking");
    if (targetIdx !== -1) {
      if (eventVal === "wedding") {
        showGiftModal(customizerState.baseService || matchedTier, () => {
          turnPageTo(targetIdx);
          window.location.hash = "#booking";
        });
      } else {
        turnPageTo(targetIdx);
        window.location.hash = "#booking";
      }
    } else {
      turnPageTo(0);
    }
  }

  function syncSummaryDisplayCard() {
    const placeholder = document.getElementById("summary-container-placeholder");
    const details = document.getElementById("summary-container-details");
    const tierName = document.getElementById("sum-tier-name");
    const crewList = document.getElementById("sum-crew-list");
    const delivList = document.getElementById("sum-deliv-list");
    const addonsList = document.getElementById("sum-addons-list");
    const addonsRow = document.getElementById("sum-addons-row");
    const serviceVal = document.getElementById("booking-service").value;

    if (serviceVal === "") {
      placeholder.style.display = "block";
      details.style.display = "none";
      return;
    }

    placeholder.style.display = "none";
    details.style.display = "block";

    const eventDropdown = document.getElementById("booking-event");
    const eventVal = eventDropdown && eventDropdown.value ? eventDropdown.value : "wedding";
    const tierLabels = {
      silver: "Silver Package (Essential)",
      gold: "Gold Package (Recommended)",
      diamond: "Diamond Package (Luxury)",
      custom: customizerState.isCustomized ? "Custom Bespoke Configuration" : (
        eventVal === "christening" ? "Standard Christening Package" :
        eventVal === "fixation" ? "Standard Fixation Ceremony Package" :
        eventVal === "bridetobe" ? "Standard Bride-to-be Package" :
        "Custom Bespoke Configuration"
      )
    };
    tierName.textContent = tierLabels[serviceVal] || "Custom Package";

    // Render Crew per active session
    crewList.innerHTML = "";
    if (eventVal === "wedding") {
      const sessions = [
        { id: "prewed", label: "Pre/Post Shoot" },
        { id: "engagement", label: "Engagement Day" },
        { id: "eve", label: "Wedding Eve" },
        { id: "day", label: "Wedding Day" }
      ];
      let crewCount = 0;
      sessions.forEach(s => {
        if (customizerState[`${s.id}Enabled`] && (s.id !== "prewed" || serviceVal !== "silver")) {
          const ph = customizerState[`${s.id}Photographers`];
          const vi = customizerState[`${s.id}Videographers`];
          if (ph > 0 || vi > 0) {
            const li = document.createElement("li");
            const crewText = [];
            if (ph > 0) crewText.push(`${ph} Photographer${ph > 1 ? 's' : ''}`);
            if (vi > 0) crewText.push(`${vi} Videographer${vi > 1 ? 's' : ''}`);
            li.textContent = `${s.label}: ${crewText.join(" + ")}`;
            crewList.appendChild(li);
            crewCount += (ph + vi);
          }
        }
      });
      if (crewCount === 0) {
        crewList.innerHTML = "<li>Default crew assignments</li>";
      }
    } else {
      const li = document.createElement("li");
      if (customizerState.isCustomized) {
        const ph = customizerState.dayPhotographers;
        const vi = customizerState.dayVideographers;
        const crewText = [];
        if (ph > 0) crewText.push(`${ph} Photographer${ph > 1 ? 's' : ''}`);
        if (vi > 0) crewText.push(`${vi} Videographer${vi > 1 ? 's' : ''}`);
        li.textContent = `Event Coverage: ${crewText.join(" + ") || "None"}`;
      } else {
        if (eventVal === "bridetobe") {
          li.textContent = "Event Coverage: 1 Photographer";
        } else {
          li.textContent = "Event Coverage: 1 Photographer + 1 Cinematographer";
        }
      }
      crewList.appendChild(li);
    }

    // Render Deliverables
    delivList.innerHTML = "";
    const liPhotos = document.createElement("li");
    liPhotos.textContent = `${customizerState.editedPhotos === "0" ? "No" : customizerState.editedPhotos} Retouched Photos`;
    delivList.appendChild(liPhotos);

    if (customizerState.albumsCount > 0) {
      const li = document.createElement("li");
      const prefix = customizerState.albumsCount > 1 ? `${customizerState.albumsCount} x ` : "";
      if (serviceVal === "silver") {
        li.textContent = "80 Pages Printed Album";
      } else if (serviceVal === "gold") {
        li.textContent = "120 Pages Luster Printed Album with Premium Box or Bag";
      } else if (serviceVal === "diamond") {
        li.textContent = "140 Pages Luster Printed Album with Premium Box or Bag";
      } else {
        const eventVal = document.getElementById("booking-event") ? document.getElementById("booking-event").value : "";
        if (eventVal === "christening") {
          li.textContent = `${prefix}50 Pages Printed Album with Premium Box or Bag`;
        } else if (eventVal === "fixation") {
          li.textContent = `${prefix}80 Pages Printed Album with Premium Box or Bag`;
        } else if (eventVal === "bridetobe") {
          li.textContent = `${prefix}40 Pages Printed Album`;
        } else {
          li.textContent = `${customizerState.albumsCount} x Printed Album(s)`;
        }
      }
      delivList.appendChild(li);
    }


    const delivItems = {
      teaserReel: "2-3 Min Cinematic Teaser Reel",
      fullFilm: "Full HD Film",
      socialReels: "Instagram & WhatsApp Reels",
      parentAlbum: "Mini Printed Album(s)"
    };
    for (const key in delivItems) {
      if (customizerState[key]) {
        const li = document.createElement("li");
        li.textContent = delivItems[key];
        delivList.appendChild(li);
      }
    }

    // Render Add-ons
    addonsList.innerHTML = "";
    const addLabels = {
      drone: "Aerial Drone Cinematography",
      ai: "AI Instant QR Sharing Portal",
      livestream: "Private Event Live Stream Broadcast",
      prewed: "Pre-Wedding Cinema Session"
    };
    let addonsCount = 0;
    for (const key in addLabels) {
      if (customizerState[key]) {
        const li = document.createElement("li");
        li.textContent = addLabels[key];
        addonsList.appendChild(li);
        addonsCount++;
      }
    }
    if (addonsCount > 0) {
      addonsRow.style.display = "block";
    } else {
      addonsRow.style.display = "none";
    }
  }

  // Selection trigger from tailored package grid
  window.selectPackageAndGo = function(tier) {
    const template = defaultTemplates[tier];
    if (!template) return;

    for (const key in template) {
      customizerState[key] = template[key];
    }
    customizerState.baseService = tier;
    customizerState.isCustomized = false;

    const eventDropdown = document.getElementById("booking-event");
    if (eventDropdown) {
      eventDropdown.value = "wedding";
    }

    const serviceDropdown = document.getElementById("booking-service");
    if (serviceDropdown) {
      serviceDropdown.value = tier;
    }

    updateCustomizerUI();
    syncSummaryDisplayCard();

    // Open the customizer modal to give client option to customize pre-loaded settings
    if (customizerModal) {
      customizerModal.classList.add("open");
    }
  };

  // Sync Dropdown change on booking service dropdown to template configs
  const serviceDropdown = document.getElementById("booking-service");
  if (serviceDropdown) {
    serviceDropdown.addEventListener("change", () => {
      const selected = serviceDropdown.value;
      if (selected !== "custom") {
        const template = defaultTemplates[selected];
        if (template) {
          for (const key in template) {
            customizerState[key] = template[key];
          }
          customizerState.baseService = selected;
          customizerState.isCustomized = false;
        }
      }
      updateCustomizerUI();
      syncSummaryDisplayCard();
    });
  }

  // Sync Dropdown change on booking event category to price tabs selector
  const bookingEventSelect = document.getElementById("booking-event");
  if (bookingEventSelect) {
    bookingEventSelect.addEventListener("change", () => {
      const eventKey = bookingEventSelect.value;
      const tabToActivate = document.querySelector(`.pack-tab-btn[data-event="${eventKey}"]`);
      if (tabToActivate) {
        document.querySelectorAll(".pack-tab-btn").forEach(btn => btn.classList.remove("active"));
        tabToActivate.classList.add("active");
        togglePricingLayout(eventKey);
      }
    });
  }

  // Sync Pricing Layout for Non-Wedding items
  const priceTabBtns = document.querySelectorAll(".pack-tab-btn");
  priceTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const eventKey = btn.getAttribute("data-event");

      if (eventKey === "other") {
        // Redirect immediately to WhatsApp with specific message
        const waUrl = "https://wa.me/919446802570?text=" + encodeURIComponent("Hi DoubleLayer Photography, I would like to know the other customizable events and packages available for me. Please share the details.");
        window.open(waUrl, "_blank");
        return;
      }

      priceTabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const bookingEvent = document.getElementById("booking-event");
      if (bookingEvent) {
        bookingEvent.value = eventKey;
      }

      togglePricingLayout(eventKey);
    });
  });

  function adjustServiceDropdownOptions(eventKey) {
    const serviceDropdown = document.getElementById("booking-service");
    if (!serviceDropdown) return;

    if (eventKey !== "wedding") {
      serviceDropdown.value = "custom";
      Array.from(serviceDropdown.options).forEach(opt => {
        if (opt.value === "silver" || opt.value === "gold" || opt.value === "diamond") {
          opt.disabled = true;
          opt.style.display = "none";
        } else {
          opt.disabled = false;
          opt.style.display = "block";
        }
      });
    } else {
      Array.from(serviceDropdown.options).forEach(opt => {
        opt.disabled = false;
        opt.style.display = "block";
      });
    }
  }

  // Toggle layout details for other event types (e.g. Wedding packages vs Baptism templates)
  function togglePricingLayout(eventKey) {
    const packagesCardsGrid = document.getElementById("packages-cards-grid");
    const calculatorBanner = document.getElementById("wedding-calculator-banner");
    const unifiedCard = document.getElementById("unified-package-card");
    const bookingService = document.getElementById("booking-service");
    const serviceContainer = bookingService ? bookingService.closest(".form-item") : null;

    adjustServiceDropdownOptions(eventKey);

    if (eventKey === "wedding") {
      if (packagesCardsGrid) packagesCardsGrid.style.display = "grid";
      if (calculatorBanner) calculatorBanner.style.display = "flex";
      if (unifiedCard) unifiedCard.style.display = "none";
      if (serviceContainer) serviceContainer.style.display = "block";

      // Reset customizer state to Gold Wedding baseline when returning to Wedding
      const goldTemplate = defaultTemplates.gold;
      for (const key in goldTemplate) {
        customizerState[key] = goldTemplate[key];
      }
      customizerState.isCustomized = false;
      if (bookingService) {
        bookingService.value = "gold";
      }
      updateCustomizerUI();
      syncSummaryDisplayCard();
    } else {
      if (packagesCardsGrid) packagesCardsGrid.style.display = "none";
      if (calculatorBanner) calculatorBanner.style.display = "none";
      if (bookingService) bookingService.value = "custom";
      if (serviceContainer) serviceContainer.style.display = "none";
      if (unifiedCard) {
        unifiedCard.style.display = "block";
        
        // Reset unified checkboxes to unchecked state initially
        const checkboxes = unifiedCard.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(cb => {
          cb.checked = false;
          const label = cb.closest(".unified-addon-item");
          if (label) label.classList.remove("active");
        });
        
        // Reset customized flag
        customizerState.isCustomized = false;

        // Set default state properties
        customizerState.drone = false;
        customizerState.ai = false;
        customizerState.livestream = false;
        customizerState.prewedEnabled = false;
        customizerState.engagementEnabled = false;
        customizerState.eveEnabled = false;
        customizerState.dayEnabled = true;
        
        customizerState.prewedPhotographers = 0;
        customizerState.prewedVideographers = 0;
        customizerState.engagementPhotographers = 0;
        customizerState.engagementVideographers = 0;
        customizerState.evePhotographers = 0;
        customizerState.eveVideographers = 0;
        
        customizerState.albumsCount = 1;
        customizerState.framesCount = 1;
        customizerState.socialReels = false;
        customizerState.parentAlbum = false;
        customizerState.editedPhotos = "30";

        // Set the unified package name and details based on the event key
        const packageNameEl = document.getElementById("unified-package-name");
        const unifiedDetailCoverage = document.getElementById("unified-detail-coverage");
        const unifiedDetailAlbum = document.getElementById("unified-detail-album");
        const unifiedDetailFilm = document.getElementById("unified-detail-film");

        if (packageNameEl) {
          const names = {
            christening: "Standard Christening Package",
            fixation: "Standard Fixation Ceremony Package",
            bridetobe: "Standard Bride-to-be Package"
          };
          packageNameEl.textContent = names[eventKey] || "Standard Event Package";
        }

        if (eventKey === "christening") {
          customizerState.fullFilm = true;
          customizerState.teaserReel = true;
          customizerState.dayPhotographers = 1;
          customizerState.dayVideographers = 1;
          if (unifiedDetailCoverage) unifiedDetailCoverage.innerHTML = `<i data-lucide="camera"></i> <div><strong>Coverage</strong><span class="pack-detail-bracket">(1 Function Photographer + 1 Function Cinematographer)</span></div>`;
          if (unifiedDetailAlbum) unifiedDetailAlbum.innerHTML = `<i data-lucide="book-open"></i> <div><strong>Album</strong><span class="pack-detail-bracket">(50 Pages Printed Album with Premium Box or Bag)</span></div>`;
          if (unifiedDetailFilm) {
            unifiedDetailFilm.style.display = "flex";
            unifiedDetailFilm.innerHTML = `<i data-lucide="film"></i> <div><strong>Film</strong><span class="pack-detail-bracket">(Full HD Film + Event Highlights 2-3 Min)</span></div>`;
          }
        } else if (eventKey === "fixation") {
          customizerState.fullFilm = true;
          customizerState.teaserReel = true;
          customizerState.dayPhotographers = 1;
          customizerState.dayVideographers = 1;
          if (unifiedDetailCoverage) unifiedDetailCoverage.innerHTML = `<i data-lucide="camera"></i> <div><strong>Coverage</strong><span class="pack-detail-bracket">(1 Function Photographer + 1 Function Cinematographer)</span></div>`;
          if (unifiedDetailAlbum) unifiedDetailAlbum.innerHTML = `<i data-lucide="book-open"></i> <div><strong>Album</strong><span class="pack-detail-bracket">(80 Pages Printed Album with Premium Box or Bag)</span></div>`;
          if (unifiedDetailFilm) {
            unifiedDetailFilm.style.display = "flex";
            unifiedDetailFilm.innerHTML = `<i data-lucide="film"></i> <div><strong>Film</strong><span class="pack-detail-bracket">(Full HD Film + Event Highlights 2-3 Min)</span></div>`;
          }
        } else if (eventKey === "bridetobe") {
          customizerState.fullFilm = false;
          customizerState.teaserReel = false;
          customizerState.dayPhotographers = 1;
          customizerState.dayVideographers = 0;
          if (unifiedDetailCoverage) unifiedDetailCoverage.innerHTML = `<i data-lucide="camera"></i> <div><strong>Coverage</strong><span class="pack-detail-bracket">(1 Function Photographer)</span></div>`;
          if (unifiedDetailAlbum) unifiedDetailAlbum.innerHTML = `<i data-lucide="book-open"></i> <div><strong>Album</strong><span class="pack-detail-bracket">(40 Pages Printed Album)</span></div>`;
          if (unifiedDetailFilm) {
            unifiedDetailFilm.style.display = "none";
          }
        }
        if (window.lucide) window.lucide.createIcons();
        
        // Sync customizer UI and booking summary
        updateCustomizerUI();
        syncSummaryDisplayCard();
      }
    }
  }

  if (openCustomizerBtn) {
    openCustomizerBtn.addEventListener("click", () => {
      const eventDropdown = document.getElementById("booking-event");
      if (eventDropdown && !eventDropdown.value) {
        eventDropdown.value = "wedding";
      }
      const serviceDropdown = document.getElementById("booking-service");
      if (serviceDropdown && !serviceDropdown.value) {
        serviceDropdown.value = "gold";
        // Pre-load Gold template defaults
        const goldTemplate = defaultTemplates.gold;
        for (const key in goldTemplate) {
          customizerState[key] = goldTemplate[key];
        }
        customizerState.isCustomized = false;
      }

      if (customizerModal) {
        customizerModal.classList.add("open");
        updateCustomizerUI();
      }
    });
  }

  if (closeCustomizerBtn) {
    closeCustomizerBtn.addEventListener("click", () => {
      customizerModal.classList.remove("open");
    });
  }

  if (saveCustomizerBtn) {
    saveCustomizerBtn.addEventListener("click", applyCustomizerToBooking);
  }

  if (customizerModal) {
    customizerModal.addEventListener("click", e => {
      if (e.target === customizerModal) {
        customizerModal.classList.remove("open");
      }
    });
  }

  // --- 9. INTERACTIVE DATE RESERVATION CALENDAR ---
  let calDate = new Date();
  calDate.setDate(1); // Set to first day of month
  let selectedDateStr = "";

  const calDaysGrid = document.getElementById("cal-days-grid");
  const calMonthYearLabel = document.getElementById("cal-month-year");
  const calPrevBtn = document.getElementById("cal-prev");
  const calNextBtn = document.getElementById("cal-next");
  const selectedDateInput = document.getElementById("selected-booking-date");
  const calWrapper = document.getElementById("calendar-wrapper");

  function renderCalendar() {
    if (!calDaysGrid || !calMonthYearLabel) return;

    calDaysGrid.innerHTML = "";

    const year = calDate.getFullYear();
    const month = calDate.getMonth();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    calMonthYearLabel.textContent = `${monthNames[month]} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Disable prev button if looking at current month or earlier
    const today = new Date();
    if (year < today.getFullYear() || (year === today.getFullYear() && month <= today.getMonth())) {
      if (calPrevBtn) calPrevBtn.disabled = true;
    } else {
      if (calPrevBtn) calPrevBtn.disabled = false;
    }

    // Empty cells
    for (let i = 0; i < firstDayIndex; i++) {
      const cell = document.createElement("div");
      cell.className = "cal-day empty";
      calDaysGrid.appendChild(cell);
    }

    // Days cells
    for (let d = 1; d <= totalDays; d++) {
      const cell = document.createElement("div");
      cell.className = "cal-day";
      cell.textContent = d;

      const dateCompare = new Date(year, month, d);
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

      const todayCompare = new Date();
      todayCompare.setHours(0, 0, 0, 0);

      if (dateCompare < todayCompare) {
        cell.classList.add("past");
      } else {
        cell.classList.add("available");

        if (selectedDateStr === dateString) {
          cell.classList.add("selected");
        }

        if (year === today.getFullYear() && month === today.getMonth() && d === today.getDate()) {
          cell.classList.add("today");
        }

        cell.addEventListener("click", () => {
          const prevSelected = calDaysGrid.querySelector(".cal-day.selected");
          if (prevSelected) prevSelected.classList.remove("selected");

          cell.classList.add("selected");
          selectedDateStr = dateString;
          if (selectedDateInput) {
            selectedDateInput.value = dateString;
          }
          if (calWrapper) {
            calWrapper.classList.remove("invalid-glow");
          }
        });
      }
      calDaysGrid.appendChild(cell);
    }
  }

  if (calPrevBtn) {
    calPrevBtn.addEventListener("click", () => {
      calDate.setMonth(calDate.getMonth() - 1);
      renderCalendar();
    });
  }

  if (calNextBtn) {
    calNextBtn.addEventListener("click", () => {
      calDate.setMonth(calDate.getMonth() + 1);
      renderCalendar();
    });
  }

  renderCalendar();

  // Helper to shorten URL using is.gd JSONP API (bypasses CORS)
  function shortenUrlAsync(longUrl, callback) {
    let resolved = false;
    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        callback(longUrl);
      }
    }, 1200);

    const callbackName = "isgd_callback_" + Math.floor(Math.random() * 1000000);
    window[callbackName] = function(data) {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        if (data && data.shorturl) {
          callback(data.shorturl);
        } else {
          callback(longUrl);
        }
        try {
          delete window[callbackName];
          const script = document.getElementById(callbackName);
          if (script) script.remove();
        } catch (e) {}
      }
    };

    const script = document.createElement("script");
    script.id = callbackName;
    script.src = "https://is.gd/create.php?format=json&callback=" + callbackName + "&url=" + encodeURIComponent(longUrl);
    document.body.appendChild(script);
  }

  // --- 10. FORM SUBMISSION WITH WHATSAPP COMPILER ---
  const bookingForm = document.getElementById("booking-form");
  const bookingCardPanel = document.querySelector(".booking-card-panel");

  if (bookingForm && bookingCardPanel) {
    bookingForm.addEventListener("submit", e => {
      e.preventDefault();

      const name = document.getElementById("booking-name").value.trim();
      const phone = document.getElementById("booking-phone").value.trim();
      const email = document.getElementById("booking-email").value.trim();
      const location = document.getElementById("booking-location").value.trim() || "Not specified";
      const eventSelector = document.getElementById("booking-event");
      const eventText = eventSelector.options[eventSelector.selectedIndex].text;
      const serviceSelector = document.getElementById("booking-service");
      const serviceText = serviceSelector.options[serviceSelector.selectedIndex].text;
      const serviceVal = serviceSelector ? serviceSelector.value : "";
      const dateVal = selectedDateInput ? selectedDateInput.value : "";
      const brief = document.getElementById("booking-brief").value || "No description provided";

      // Validate required fields: name, phone, email, and date
      if (!name || !phone || !email || !dateVal) {
        if (!dateVal && calWrapper) {
          calWrapper.classList.add("invalid-glow");
          calWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Format date
      const dateParts = dateVal.split("-");
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const formattedDate = `${months[parseInt(dateParts[1]) - 1]} ${parseInt(dateParts[2])}, ${dateParts[0]}`;

      const budgetSelector = document.getElementById("booking-budget");
      const budgetText = budgetSelector ? budgetSelector.options[budgetSelector.selectedIndex].text : "Not specified";

      // Assemble Package Customizer config values into message
      const eventVal = eventSelector ? eventSelector.value : "";
      const displayServiceText = serviceVal === "custom" && !customizerState.isCustomized ? (
        eventVal === "christening" ? "Standard Christening Package" :
        eventVal === "fixation" ? "Standard Fixation Ceremony Package" :
        eventVal === "bridetobe" ? "Standard Bride-to-be Package" :
        serviceText
      ) : serviceText;
      let packageConfig = `Service Tier: ${displayServiceText}\n`;
      packageConfig += `Crew Details:\n`;
      const sessionsList = [
        { id: "prewed", label: "Pre/Post Shoot" },
        { id: "engagement", label: "Engagement Day" },
        { id: "eve", label: "Wedding Eve" },
        { id: "day", label: "Wedding Day" }
      ];
      let crewDetailsAdded = false;
      sessionsList.forEach(s => {
        if (customizerState[`${s.id}Enabled`] && (s.id !== "prewed" || serviceVal !== "silver")) {
          const ph = customizerState[`${s.id}Photographers`];
          const vi = customizerState[`${s.id}Videographers`];
          if (ph > 0 || vi > 0) {
            const crewText = [];
            if (ph > 0) crewText.push(`${ph} Photographer${ph > 1 ? 's' : ''}`);
            if (vi > 0) crewText.push(`${vi} Videographer${vi > 1 ? 's' : ''}`);
            packageConfig += `- ${s.label}: ${crewText.join(" + ")}\n`;
            crewDetailsAdded = true;
          }
        }
      });
      if (!crewDetailsAdded) packageConfig += "- Default crew selection\n";

      packageConfig += `\nDeliverables:\n`;
      packageConfig += `- Photos: ${customizerState.editedPhotos === '0' ? 'No' : customizerState.editedPhotos} Retouched Images\n`;
      if (customizerState.albumsCount > 0) {
        const eventVal = document.getElementById("booking-event") ? document.getElementById("booking-event").value : "";
        const prefix = customizerState.albumsCount > 1 ? `${customizerState.albumsCount} x ` : "";
        if (serviceVal === "silver") {
          packageConfig += `- Print Album: 80 Pages Printed Album\n`;
        } else if (serviceVal === "gold") {
          packageConfig += `- Print Album: 120 Pages Luster Printed Album with Premium Box or Bag\n`;
        } else if (serviceVal === "diamond") {
          packageConfig += `- Print Album: 140 Pages Luster Printed Album with Premium Box or Bag\n`;
        } else {
          if (eventVal === "christening") {
            packageConfig += `- Print Album: ${prefix}50 Pages Printed Album with Premium Box or Bag\n`;
          } else if (eventVal === "fixation") {
            packageConfig += `- Print Album: ${prefix}80 Pages Printed Album with Premium Box or Bag\n`;
          } else if (eventVal === "bridetobe") {
            packageConfig += `- Print Album: ${prefix}40 Pages Printed Album\n`;
          } else {
            packageConfig += `- Print Album: ${customizerState.albumsCount} x Printed Album(s)\n`;
          }
        }
      }

      
      const items = {
        teaserReel: "2-3 Min Teaser Reel",
        fullFilm: "Full HD Film",
        socialReels: "Instagram & WhatsApp Reels",
        parentAlbum: "Mini Printed Album(s)"
      };
      for (const key in items) {
        if (customizerState[key]) {
          packageConfig += `- ${items[key]}\n`;
        }
      }

      packageConfig += `\nPremium Add-ons:\n`;
      const addons = {
        drone: "Aerial Drone Cinematography",
        ai: "AI Instant QR Sharing System",
        livestream: "Private Live Stream Broadcast"
      };
      let addonCount = 0;
      for (const key in addons) {
        if (customizerState[key]) {
          packageConfig += `- ${addons[key]}\n`;
          addonCount++;
        }
      }
      if (addonCount === 0) packageConfig += "- None\n";

      // Assemble booking details into a structured global object for PDF receipt generation
      const crewDetailsList = [];
      let totalCrewCount = 0;

      if (eventVal === "wedding") {
        const sessionsListForPDF = [
          { id: "prewed", label: "Pre/Post Shoot" },
          { id: "engagement", label: "Engagement Day" },
          { id: "eve", label: "Wedding Eve" },
          { id: "day", label: "Wedding Day" }
        ];
        sessionsListForPDF.forEach(s => {
          if (customizerState[`${s.id}Enabled`] && (s.id !== "prewed" || serviceVal !== "silver")) {
            const ph = customizerState[`${s.id}Photographers`];
            const vi = customizerState[`${s.id}Videographers`];
            if (ph > 0 || vi > 0) {
              const crewText = [];
              if (ph > 0) crewText.push(`${ph} Photographer${ph > 1 ? 's' : ''}`);
              if (vi > 0) crewText.push(`${vi} Videographer${vi > 1 ? 's' : ''}`);
              crewDetailsList.push(`${s.label}: ${crewText.join(" + ")}`);
              totalCrewCount += (ph + vi);
            }
          }
        });
      } else {
        if (customizerState.isCustomized) {
          const ph = customizerState.dayPhotographers;
          const vi = customizerState.dayVideographers;
          const crewText = [];
          if (ph > 0) crewText.push(`${ph} Photographer${ph > 1 ? 's' : ''}`);
          if (vi > 0) crewText.push(`${vi} Videographer${vi > 1 ? 's' : ''}`);
          crewDetailsList.push(`Event Coverage: ${crewText.join(" + ") || "None"}`);
          totalCrewCount = ph + vi;
        } else {
          if (eventVal === "bridetobe") {
            crewDetailsList.push("Event Coverage: 1 Photographer");
            totalCrewCount = 1;
          } else {
            crewDetailsList.push("Event Coverage: 1 Photographer + 1 Cinematographer");
            totalCrewCount = 2;
          }
        }
      }

      const deliverablesList = [];
      deliverablesList.push(`${customizerState.editedPhotos === "0" ? "No" : customizerState.editedPhotos} Retouched Photos`);
      if (customizerState.albumsCount > 0) {
        const prefix = customizerState.albumsCount > 1 ? `${customizerState.albumsCount} x ` : "";
        if (serviceVal === "silver") {
          deliverablesList.push("80 Pages Printed Album");
        } else if (serviceVal === "gold") {
          deliverablesList.push("120 Pages Luster Printed Album with Premium Box or Bag");
        } else if (serviceVal === "diamond") {
          deliverablesList.push("140 Pages Luster Printed Album with Premium Box or Bag");
        } else {
          if (eventVal === "christening") {
            deliverablesList.push(`${prefix}50 Pages Printed Album with Premium Box or Bag`);
          } else if (eventVal === "fixation") {
            deliverablesList.push(`${prefix}80 Pages Printed Album with Premium Box or Bag`);
          } else if (eventVal === "bridetobe") {
            deliverablesList.push(`${prefix}40 Pages Printed Album`);
          } else {
            deliverablesList.push(`${customizerState.albumsCount} x Printed Album(s)`);
          }
        }
      }
      const delivItemsList = {
        teaserReel: "2-3 Min Cinematic Teaser Reel",
        fullFilm: "Full HD Film",
        socialReels: "Instagram & WhatsApp Reels",
        parentAlbum: "Mini Printed Album(s)"
      };
      for (const key in delivItemsList) {
        if (customizerState[key]) {
          deliverablesList.push(delivItemsList[key]);
        }
      }

      const addonsList = [];
      const addonsKeys = {
        drone: "Aerial Drone Cinema",
        ai: "AI Instant QR Sharing",
        livestream: "Live Broadcast Feed",
        prewed: "Pre-Wedding Cinema"
      };
      for (const key in addonsKeys) {
        if (customizerState[key]) {
          addonsList.push(addonsKeys[key]);
        }
      }

      // Calculate serviceValToSend to retain base tier for styling and stars
      let serviceValToSend = serviceVal;
      if (eventVal === "wedding") {
        if (serviceVal === "custom" && customizerState.baseService) {
          serviceValToSend = customizerState.baseService + "-custom";
        }
      } else {
        let isUnifiedCustomized = false;
        const unifiedAddons = ['drone', 'ai', 'livestream', 'prewed', 'extraAlbum'];
        unifiedAddons.forEach(k => {
          const cb = document.getElementById(`unified-addon-${k === 'extraAlbum' ? 'extra-album' : k}`);
          if (cb && cb.checked) {
            isUnifiedCustomized = true;
          }
        });
        serviceValToSend = isUnifiedCustomized ? "custom-unified" : "standard-unified";
      }

      window.latestBookingDetails = {
        name,
        phone,
        email,
        location,
        eventText,
        budgetText,
        formattedDate,
        brief,
        crewDetails: crewDetailsList,
        deliverables: deliverablesList,
        addons: addonsList,
        serviceVal: serviceValToSend,
        crewCount: totalCrewCount
      };

      // Create Base64 payload for dynamic receipt url containing the full details compressed
      let receiptUrl = "";
      try {
        const compressedData = {
          n: name,
          p: phone,
          e: email,
          l: location,
          c: eventText,
          b: budgetText,
          d: formattedDate,
          v: brief,
          w: crewDetailsList,
          r: deliverablesList,
          a: addonsList,
          s: serviceValToSend,
          k: totalCrewCount
        };
        const bookingDataJson = JSON.stringify(compressedData);
        const base64Data = btoa(unescape(encodeURIComponent(bookingDataJson)));
        receiptUrl = `https://doublelayerphotography.com/receipt.html?data=${base64Data}`;
        window.latestReceiptUrl = receiptUrl;
        window.latestBookingDetails.receiptUrl = receiptUrl;
      } catch (err) {
        console.error("Failed to generate receipt url:", err);
        window.latestReceiptUrl = "";
      }

      // Shorten the receipt link asynchronously using is.gd JSONP API
      shortenUrlAsync(receiptUrl, (shortUrl) => {
        window.latestBookingDetails.receiptUrl = shortUrl;

        // Send details silently in the background to Google Sheets (including short receiptUrl)
        const sheetUrl = "https://script.google.com/macros/s/AKfycbz0MS7LPp86ntdPUycWq7nOS4HYCjiEqNkZwRQ5p-Jkg3UoV3nxn8vywj_RVHw5nP1MoQ/exec";
        fetch(sheetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(window.latestBookingDetails)
        }).catch(err => console.error("Google Sheets logging failed:", err));

        // Build WhatsApp message (greeting, client name, and download invoice link)
        let waText = `Hi DoubleLayer, here is a booking request from ${name}.\n\n`;
        if (shortUrl) {
          waText += `📄 Download the full invoice:\n${shortUrl}\n`;
        }

        const waUrl = "https://wa.me/919446802570?text=" + encodeURIComponent(waText);

        // Render success message inside the form panel (including PDF download option)
        bookingCardPanel.innerHTML = `
          <div class="success-screen" style="padding: 30px 15px;">
            <div class="success-icon"><i data-lucide="check"></i></div>
            <h3 class="text-gradient">Request Compiled</h3>
            <p style="margin-bottom: 25px; line-height:1.6;">
              Thank you, <span style="color:#fff; font-weight:600;">${name}</span>. We've compiled your customized visual request for the <strong style="color:var(--gold-accent);">${eventText}</strong> on <strong>${formattedDate}</strong>.
            </p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
              <button type="button" class="btn btn-glass" onclick="downloadBookingReceipt()" style="display:inline-flex; align-items:center; gap:8px;">
                <i data-lucide="download"></i>
                Download PDF Receipt
              </button>
              <a href="${waUrl}" target="_blank" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:8px; text-decoration:none;">
                <i data-lucide="message-square"></i>
                Open WhatsApp
              </a>
            </div>
            <p style="font-size: 11px; color: var(--text-muted); line-height: 1.5;">
              Click <strong>Download PDF Receipt</strong> to save your package receipt first,<br>then click <strong>Open WhatsApp</strong> to send details and complete booking.
            </p>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();

        // Automatically redirect to WhatsApp after 2 seconds
        setTimeout(() => {
          window.location.href = waUrl;
        }, 2000);
      });
    });
  }

  // Global Dynamic PDF print generator function
  window.downloadBookingPDF = function(details) {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const crewHtml = details.crewDetails.length > 0 
      ? details.crewDetails.map(c => `<li>${c}</li>`).join("")
      : "<li>Default crew selection</li>";

    const deliverablesHtml = details.deliverables.map(d => `<li>${d}</li>`).join("");

    const addonsHtml = details.addons.length > 0
      ? details.addons.map(a => `<li>${a}</li>`).join("")
      : "<li>No premium add-ons selected</li>";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>DoubleLayer Booking Receipt - ${details.name}</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #111;
            background: #fff;
            margin: 0;
            padding: 40px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #cffa00; /* Matching gold theme */
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo-area h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 2px;
            color: #000;
          }
          .logo-area p {
            margin: 5px 0 0 0;
            font-size: 11px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .invoice-title {
            text-align: right;
          }
          .invoice-title h2 {
            margin: 0;
            font-size: 18px;
            color: #bfa15f;
            font-weight: 700;
            text-transform: uppercase;
          }
          .invoice-title p {
            margin: 5px 0 0 0;
            font-size: 11px;
            color: #666;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 40px;
          }
          .meta-section h3 {
            margin: 0 0 10px 0;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #bfa15f;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
          }
          .meta-section table {
            width: 100%;
            border-collapse: collapse;
          }
          .meta-section table td {
            padding: 6px 0;
            font-size: 13px;
          }
          .meta-section table td.lbl {
            font-weight: 600;
            color: #555;
            width: 130px;
          }
          .section-title {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #bfa15f;
            border-bottom: 1px solid #bfa15f;
            padding-bottom: 5px;
            margin: 30px 0 15px 0;
          }
          .config-list {
            margin: 0;
            padding-left: 20px;
          }
          .config-list li {
            padding: 6px 0;
            font-size: 13px;
          }
          .footer {
            margin-top: 60px;
            border-top: 1px solid #eee;
            padding-top: 20px;
            text-align: center;
            font-size: 11px;
            color: #888;
          }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-area">
            <h1>DOUBLELAYER</h1>
            <p>Photography & Cinematography</p>
          </div>
          <div class="invoice-title">
            <h2>BOOKING REQUEST RECEIPT</h2>
            <p>Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div class="meta-grid">
          <div class="meta-section">
            <h3>Client Information</h3>
            <table>
              <tr><td class="lbl">Name:</td><td>${details.name}</td></tr>
              <tr><td class="lbl">Phone:</td><td>${details.phone}</td></tr>
              <tr><td class="lbl">Email:</td><td>${details.email}</td></tr>
            </table>
          </div>
          <div class="meta-section">
            <h3>Event Information</h3>
            <table>
              <tr><td class="lbl">Event Category:</td><td>${details.eventText}</td></tr>
              <tr><td class="lbl">Selected Date:</td><td>${details.formattedDate}</td></tr>
              <tr><td class="lbl">Venue Location:</td><td>${details.location}</td></tr>
              <tr><td class="lbl">Estimate Budget:</td><td>${details.budgetText}</td></tr>
            </table>
          </div>
        </div>

        <div class="section-title">Bespoke Curation Setup</div>
        <table style="width: 100%;">
          <tr>
            <td style="width: 50%; vertical-align: top; padding-right: 20px;">
              <h4 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; color: #555;">Visual Curation Crew</h4>
              <ul class="config-list">${crewHtml}</ul>
            </td>
            <td style="width: 50%; vertical-align: top;">
              <h4 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; color: #555;">Included Deliverables</h4>
              <ul class="config-list">${deliverablesHtml}</ul>
            </td>
          </tr>
        </table>

        ${details.addons.length > 0 ? `
        <div class="section-title">Selected Add-ons</div>
        <ul class="config-list">${addonsHtml}</ul>
        ` : ""}

        ${details.brief && details.brief !== "No description provided" ? `
        <div class="section-title">Creative Vision & Brief</div>
        <p style="font-size: 13px; line-height: 1.6; color: #444; margin: 0; white-space: pre-line;">${details.brief}</p>
        ` : ""}

        <div class="footer">
          <p>Thank you for choosing DoubleLayer Photography. We will get back to you shortly to confirm your booking.</p>
          <p>Kolenchery, Kochi, Kerala | Email: doublelayerphotography@gmail.com | Phone: +91 94468 02570</p>
        </div>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  window.downloadBookingReceipt = function() {
    if (window.latestReceiptUrl) {
      window.open(window.latestReceiptUrl, "_blank");
    } else if (window.latestBookingDetails) {
      window.downloadBookingPDF(window.latestBookingDetails);
    }
  };

  // --- 10b. CONTACT FORM SUBMISSION WITH WHATSAPP COMPILER ---
  const simpleContactForm = document.getElementById("simple-contact-form");
  const contactFormPanel = document.getElementById("contact-form-panel");

  if (simpleContactForm && contactFormPanel) {
    simpleContactForm.addEventListener("submit", e => {
      e.preventDefault();

      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const msg = document.getElementById("contact-msg").value.trim();

      // Compile message for WhatsApp
      let waText = `✨ DOUBLELAYER INQUIRY ✨\n\n`;
      waText += `Name: ${name}\n`;
      waText += `Email: ${email}\n\n`;
      waText += `Message:\n${msg}`;

      const waUrl = "https://wa.me/919446802570?text=" + encodeURIComponent(waText);

      // Render success message inside the contact form panel
      contactFormPanel.innerHTML = `
        <div class="success-screen" style="text-align: center; padding: 20px 10px;">
          <div class="success-icon" style="background: rgba(207, 168, 83, 0.1); color: var(--gold-accent); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 24px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check" style="width:28px; height:28px;"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 class="text-gradient" style="font-size: 22px; margin-bottom: 10px; font-family: 'ADAM.CG PRO', sans-serif;">Message Compiled</h3>
          <p style="color: var(--text-muted); font-size: 13.5px; margin-bottom: 20px; line-height: 1.6;">
            Thank you, <span style="color:#fff; font-weight:600;">${name}</span>. We've compiled your inquiry and are redirecting you to WhatsApp to connect with us.
          </p>
          <a href="${waUrl}" target="_blank" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:8px; text-decoration:none; padding: 10px 20px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square" style="width:16px; height:16px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Open WhatsApp & Send
          </a>
        </div>
      `;

      // Auto redirect after 1.5 seconds
      setTimeout(() => {
        window.location.href = waUrl;
      }, 1500);
    });
  }

  // --- 11. LEGAL POLICIES POPUPS ---
  const policyModal = document.getElementById("policy-modal");
  const policyTitle = document.getElementById("policy-title");
  const policyBody = document.getElementById("policy-body");
  const policyClose = document.getElementById("policy-modal-close");

  const policyContent = {
    terms: {
      title: "Terms & Conditions",
      body: `
        <h4>1. Client Consultation & Adjustments</h4>
        <p>Regarding your dreams, concepts, doubts, queries and any adjustments in the package, let's talk it over.</p>
        <h4>2. Selection Timeline & Delivery Schedule</h4>
        <p>We will not be able to keep to the timeline of the output if the photo selection takes more than 30 days. We expect to receive the sorting within one month of the function to be able to stick to this delivery period.</p>
        <h4>3. Album Layout & Image Charges</h4>
        <p>Extra sheets in the album, if required, would be charged at ₹800 per sheet. Extra edited images will be charged at ₹150 per image.</p>
      `
    }
  };

  function openPolicy(type) {
    const data = policyContent[type];
    if (!data || !policyModal) return;

    policyTitle.textContent = data.title;
    policyBody.innerHTML = data.body;
    policyModal.classList.add("open");
  }

  if (policyClose) {
    policyClose.addEventListener("click", () => {
      policyModal.classList.remove("open");
    });
  }

  if (policyModal) {
    policyModal.addEventListener("click", e => {
      if (e.target === policyModal) {
        policyModal.classList.remove("open");
      }
    });
  }

  const triggerTerms = document.getElementById("trigger-terms");

  if (triggerTerms) {
    triggerTerms.addEventListener("click", () => openPolicy("terms"));
  }

  // --- 12. UNIFIED CARD OPTIONS FOR NON-WEDDING EVENTS ---
  window.toggleUnifiedAddon = function(addonKey) {
    const cb = document.getElementById(`unified-addon-${addonKey === 'extraAlbum' ? 'extra-album' : addonKey === 'extraFrame' ? 'extra-frame' : addonKey}`);
    const label = document.getElementById(`unified-addon-card-${addonKey === 'extraAlbum' ? 'extra-album' : addonKey === 'extraFrame' ? 'extra-frame' : addonKey}`);
    
    if (cb) {
      const isChecked = cb.checked;
      
      // Update customizerState based on selected add-on
      if (addonKey === "extraAlbum") {
        customizerState.albumsCount = isChecked ? 2 : 1;
      } else if (addonKey === "extraFrame") {
        customizerState.framesCount = isChecked ? 2 : 1;
      } else {
        customizerState[addonKey] = isChecked;
      }
      
      // Toggle visual border highlight class
      if (label) {
        if (isChecked) {
          label.classList.add("active");
        } else {
          label.classList.remove("active");
        }
      }
      
      customizerState.isCustomized = true;
      
      // Update customizer UI and sync with summary
      updateCustomizerUI();
      syncSummaryDisplayCard();
    }
  };

  window.finalizeUnifiedBooking = function() {
    // Set drop down choice to selected template service option
    const select = document.getElementById("booking-service");
    if (select) {
      select.value = "custom"; // set to custom package
    }

    // Update the event type dropdown
    const eventSelect = document.getElementById("booking-event");
    if (eventSelect) {
      // Find currently active event tab
      const activeTab = document.querySelector(".pack-tab-btn.active");
      if (activeTab) {
        eventSelect.value = activeTab.getAttribute("data-event");
      }
    }

    // Update the visual summary card on the left
    syncSummaryDisplayCard();

    // Scroll smoothly to booking container immediately
    const targetIdx = sections.findIndex(sec => sec.getAttribute("id") === "booking");
    if (targetIdx !== -1) {
      turnPageTo(targetIdx);
      window.location.hash = "#booking";
    } else {
      turnPageTo(0);
    }
  };

  window.openCustomizerForUnified = function() {
    const select = document.getElementById("booking-service");
    if (select) {
      select.value = "custom";
    }

    const eventSelect = document.getElementById("booking-event");
    if (eventSelect) {
      const activeTab = document.querySelector(".pack-tab-btn.active");
      if (activeTab) {
        eventSelect.value = activeTab.getAttribute("data-event");
      }
    }

    if (customizerModal) {
      customizerModal.classList.add("open");
      updateCustomizerUI();
    }
  };

  // --- 13. INTRO SPLASH VIDEO OVERLAY SYSTEM ---
  const introOverlay = document.getElementById("intro-video-overlay");
  const introVideo = document.getElementById("intro-video");
  const logoTrigger = document.getElementById("logo-trigger");

  if (introOverlay && introVideo) {
    let introTimer;
    let introDismissed = false;
    let isPlayingStarted = false;

    function startVideoPlayback() {
      if (introDismissed || isPlayingStarted) return;
      isPlayingStarted = true;

      // Always set muted to true FIRST so mobile browsers (iOS Safari / Android Chrome) permit immediate autoplay
      introVideo.muted = true;
      introVideo.currentTime = 0;

      const playPromise = introVideo.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          clearTimeout(introTimer);
          introTimer = setTimeout(dismissIntro, 10000);
        }).catch(err => {
          console.log("Autoplay error or blocked by mobile policy:", err);
          dismissIntro();
        });
      }
    }

    function playIntro() {
      introDismissed = false;
      isPlayingStarted = false;
      introOverlay.style.display = "flex";
      introOverlay.classList.remove("fade-out");
      document.body.style.overflow = "hidden";

      // Automatically play video when entering the website
      startVideoPlayback();
    }

    function dismissIntro() {
      if (introDismissed) return;
      introDismissed = true;

      try {
        introVideo.pause();
      } catch (err) {
        // Safe catch
      }

      introOverlay.classList.add("fade-out");

      setTimeout(() => {
        introOverlay.style.display = "none";
        
        // Restore page scrolling if no other modal is open
        if (!isModalOverlayActive()) {
          document.body.style.overflow = "";
        }
      }, 800); // sync with CSS fade transition time
    }

    // Dismiss earlier if the video naturally reaches its end
    introVideo.addEventListener("ended", () => {
      clearTimeout(introTimer);
      dismissIntro();
    });

    // Dismiss overlay immediately if user clicks/taps anywhere
    introOverlay.addEventListener("click", (e) => {
      clearTimeout(introTimer);
      dismissIntro();
    });

    // Bind logo clicks to reload the website
    if (logoTrigger) {
      logoTrigger.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = window.location.origin + window.location.pathname;
      });
    }

    // --- HERO BACKGROUND SLIDESHOW CYCLE ---
    const slides = document.querySelectorAll(".hero-slide");
    if (slides.length > 1) {
      let currentIdx = 0;
      setInterval(() => {
        const prevIdx = currentIdx;
        currentIdx = (currentIdx + 1) % slides.length;

        // Reset any older prev slides to clean state (right side)
        slides.forEach((slide, idx) => {
          if (idx !== prevIdx && idx !== currentIdx) {
            slide.classList.remove("prev", "active");
          }
        });

        // Slide out the outgoing slide
        slides[prevIdx].classList.remove("active");
        slides[prevIdx].classList.add("prev");

        // Slide in the incoming slide
        slides[currentIdx].classList.add("active");
      }, 7000); // changes background slide every 7 seconds
    }

    // Launch the video intro splash on initial website load
    playIntro();
  }

  // --- 14. CLIENT REACTIONS (TESTIMONIALS) USER ENGINE ---
  const reactionModal = document.getElementById("reaction-modal");
  const openReactionBtn = document.getElementById("open-reaction-btn");
  const closeReactionBtn = document.getElementById("reaction-modal-close");
  const reactionForm = document.getElementById("reaction-form");
  const testimonialsGrid = document.getElementById("testimonials-grid");
  const ratingStarsSelection = document.getElementById("rating-stars-selection");
  const selectedRatingInput = document.getElementById("selected-rating-value");

  // Inline reaction form elements
  const inlineReactionForm = document.getElementById("inline-reaction-form");
  const inlineRatingStars = document.getElementById("inline-rating-stars");
  const inlineSelectedRating = document.getElementById("inline-selected-rating");
  const inlineReactionCard = document.getElementById("inline-reaction-card");

  // Handle opening reaction modal OR scrolling to inline reaction card
  if (openReactionBtn) {
    openReactionBtn.addEventListener("click", () => {
      if (inlineReactionCard) {
        // Scroll to the inline reaction form
        inlineReactionCard.scrollIntoView({ behavior: "smooth", block: "center" });
        // Add a gold border flash effect
        inlineReactionCard.classList.add("highlight-flash");
        setTimeout(() => {
          inlineReactionCard.classList.remove("highlight-flash");
        }, 2000);
        
        // Focus the name input
        const nameInput = document.getElementById("inline-reaction-name");
        if (nameInput) nameInput.focus();
      } else if (reactionModal) {
        // Fallback to modal if card not found
        reactionModal.classList.add("open");
        document.body.style.overflow = "hidden";
        
        // Reset stars to 5-star active state on open
        if (ratingStarsSelection && selectedRatingInput) {
          selectedRatingInput.value = "5";
          const stars = ratingStarsSelection.querySelectorAll(".rating-star");
          stars.forEach(star => {
            star.classList.add("active");
            star.style.color = "var(--gold-accent)";
            star.style.fill = "var(--gold-accent)";
          });
        }
      }
    });
  }

  // Handle closing reaction modal
  function closeReactionFormModal() {
    if (reactionModal) {
      reactionModal.classList.remove("open");
      if (!isModalOverlayActive()) {
        document.body.style.overflow = "";
      }
    }
  }

  if (closeReactionBtn) {
    closeReactionBtn.addEventListener("click", closeReactionFormModal);
  }

  if (reactionModal) {
    reactionModal.addEventListener("click", e => {
      if (e.target === reactionModal) {
        closeReactionFormModal();
      }
    });
  }

  // Star rating input handling (Modal - with event delegation to support Lucide icons)
  if (ratingStarsSelection && selectedRatingInput) {
    ratingStarsSelection.addEventListener("click", (e) => {
      const star = e.target.closest(".rating-star");
      if (!star) return;
      
      const ratingValue = parseInt(star.getAttribute("data-rating")) || 5;
      selectedRatingInput.value = ratingValue;
      
      // Highlight active stars
      const stars = Array.from(ratingStarsSelection.querySelectorAll(".rating-star"));
      stars.forEach((s, sIdx) => {
        if (sIdx < ratingValue) {
          s.classList.add("active");
          s.style.color = "var(--gold-accent)";
          s.style.fill = "var(--gold-accent)";
        } else {
          s.classList.remove("active");
          s.style.color = "";
          s.style.fill = "";
        }
      });
    });
  }

  // Star rating input handling (Inline Form - with event delegation to support Lucide icons)
  if (inlineRatingStars && inlineSelectedRating) {
    inlineRatingStars.addEventListener("click", (e) => {
      const star = e.target.closest(".inline-rating-star");
      if (!star) return;
      
      const ratingValue = parseInt(star.getAttribute("data-rating")) || 5;
      inlineSelectedRating.value = ratingValue;
      
      // Highlight active stars
      const stars = Array.from(inlineRatingStars.querySelectorAll(".inline-rating-star"));
      stars.forEach((s, sIdx) => {
        if (sIdx < ratingValue) {
          s.classList.add("active");
          s.style.color = "var(--gold-accent)";
          s.style.fill = "var(--gold-accent)";
        } else {
          s.classList.remove("active");
          s.style.color = "";
          s.style.fill = "";
        }
      });
    });
  }

  // Helper to prepend new review to testimonials grid
  function appendReviewToGrid(name, role, text, rating, persist = true) {
    if (!testimonialsGrid) return;
    
    // Compile Star Rating HTML dynamically with golden fill
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      const goldStyle = i <= rating
        ? ` style="color: #d4af37; fill: #d4af37;"`
        : ` style="color: rgba(255,255,255,0.15); fill: none;"`;
      starsHTML += `<i data-lucide="star" class="${i <= rating ? 'star-fill' : ''}"${goldStyle}></i>`;
    }

    // Create new testimonial card node
    const card = document.createElement("div");
    card.className = "glass-card testimonial-card new-testimonial-glow";
    card.innerHTML = `
      <button class="delete-reaction-btn" title="Delete comment">
        <i data-lucide="trash-2"></i>
      </button>
      <div class="testi-stars">
        ${starsHTML}
      </div>
      <p class="testi-quote">"${text}"</p>
      <div class="testi-author">
        <div class="testi-avatar"><i data-lucide="user"></i></div>
        <div class="testi-info">
          <h4>${name}</h4>
          <span>${role}</span>
        </div>
      </div>
    `;

    // Add delete listener
    const deleteBtn = card.querySelector(".delete-reaction-btn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        // Remove card from UI
        card.remove();
        // Remove review from storage
        deleteReviewFromStorage(name, role, text, rating);
      });
    }

    // Prepend the new card (before the inline form card or first review)
    const inlineFormCard = document.getElementById("inline-reaction-card");
    if (inlineFormCard) {
      testimonialsGrid.insertBefore(card, inlineFormCard.nextSibling);
    } else {
      testimonialsGrid.insertBefore(card, testimonialsGrid.firstChild);
    }

    // Trigger Lucide to render the newly injected card icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Persist to localStorage so reviews survive page reloads
    if (persist) {
      saveReview({ name, role, text, rating });
    }
  }

  // Restore reviews saved in localStorage on page load
  loadSavedReviews().forEach(r => {
    appendReviewToGrid(r.name, r.role, r.text, r.rating, false);
  });


  // Handle Modal review form submission
  if (reactionForm) {
    reactionForm.addEventListener("submit", e => {
      e.preventDefault();
      
      const name = document.getElementById("reaction-name").value.trim();
      const role = document.getElementById("reaction-role").value.trim();
      const text = document.getElementById("reaction-text").value.trim();
      const rating = parseInt(selectedRatingInput.value) || 5;

      if (!name || !role || !text) return;

      appendReviewToGrid(name, role, text, rating);

      // Close the modal and reset form
      closeReactionFormModal();
      reactionForm.reset();
    });
  }

  // Handle Inline review form submission
  if (inlineReactionForm) {
    inlineReactionForm.addEventListener("submit", e => {
      e.preventDefault();
      
      const name = document.getElementById("inline-reaction-name").value.trim();
      const role = document.getElementById("inline-reaction-role").value.trim();
      const text = document.getElementById("inline-reaction-text").value.trim();
      const rating = parseInt(inlineSelectedRating.value) || 5;

      if (!name || !role || !text) return;

      appendReviewToGrid(name, role, text, rating);

      // Reset inline form and stars
      inlineReactionForm.reset();
      inlineSelectedRating.value = "5";
      const stars = inlineRatingStars.querySelectorAll(".inline-rating-star");
      stars.forEach(s => {
        s.classList.add("active");
        s.style.color = "var(--gold-accent)";
        s.style.fill = "var(--gold-accent)";
      });
    });
  }

  // --- 15. DEDICATED LEGAL TABS SWITCHER (Disabled as Privacy Policy is removed) ---
  function switchLegalTab(tabKey) {
    // Tab switching disabled. Only Terms & Conditions is active.
  }
  window.switchLegalTab = switchLegalTab;

  // --- MOBILE FLOATING SOCIAL ---
  const mobileSocialBtn = document.getElementById("mobile-social-btn");

  // --- COMPLIMENTARY GIFT POPUP SYSTEM ---
  function triggerConfettiPoppers() {
    const colors = ['#d4af37', '#f1e1a6', '#cfab2f', '#ffffff', '#e6e6e6', '#fadadd'];
    const container = document.body;
    const particleCount = 80;
    const particles = [];
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < particleCount; i++) {
      const side = i % 2; // 0 = left, 1 = right
      const el = document.createElement("div");
      el.className = "confetti-particle";
      
      const sizeW = Math.random() * 8 + 6;
      const sizeH = Math.random() * 6 + 6;
      el.style.width = sizeW + "px";
      el.style.height = sizeH + "px";
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.position = "fixed";
      el.style.zIndex = "2600";
      el.style.pointerEvents = "none";
      el.style.borderRadius = "2px";
      
      let x = side === 0 ? 0 : width;
      let y = height;
      
      el.style.left = "0px";
      el.style.top = "0px";
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      
      container.appendChild(el);

      const angle = side === 0 
        ? (Math.random() * 45 + 15) * Math.PI / 180 
        : (Math.random() * 45 + 120) * Math.PI / 180;
      const speed = Math.random() * 15 + 15;
      
      particles.push({
        el: el,
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        rotation: Math.random() * 360,
        vRotation: Math.random() * 10 - 5,
        opacity: 1,
        life: 1
      });
    }

    const gravity = 0.45;
    const friction = 0.98;

    function update() {
      let active = false;
      for (let p of particles) {
        if (p.life <= 0) continue;
        
        p.x += p.vx;
        p.y += p.vy;
        p.vy += gravity;
        p.vx *= friction;
        p.vy *= friction;
        p.rotation += p.vRotation;
        
        if (p.vy > 0) {
          p.life -= 0.015;
        }
        
        if (p.life <= 0 || p.y > height + 20) {
          p.life = 0;
          p.el.remove();
        } else {
          p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`;
          p.el.style.opacity = p.life;
          active = true;
        }
      }
      if (active) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function showGiftModal(tier, onRedirect) {
    const overlay = document.getElementById("gift-modal-overlay");
    const giftBox = document.getElementById("gift-box-trigger");
    const instruction = document.getElementById("gift-tap-instruction");
    const revealContent = document.getElementById("gift-reveal-content");
    const itemsList = document.getElementById("gift-reveal-items-list");
    const countdownSec = document.getElementById("gift-countdown-sec");

    if (!overlay || !giftBox || !instruction || !revealContent || !itemsList) {
      onRedirect();
      return;
    }

    // Determine gifts based on tier
    let gifts = [];
    if (tier === "silver") {
      gifts = [
        { name: "Visual Wall Calendar", icon: "calendar" },
        { name: "Premium Desktop Photo Frame", icon: "image" }
      ];
    } else if (tier === "gold") {
      gifts = [
        { name: "Pre/Post-Wedding Concept Shoot", icon: "video" },
        { name: "30 Retouched Photos on the Same Day", icon: "sparkles" },
        { name: "Visual Wall Calendar", icon: "calendar" },
        { name: "Premium Desktop Photo Frame", icon: "image" }
      ];
    } else if (tier === "diamond") {
      gifts = [
        { name: "Pre/Post-Wedding Concept Shoot", icon: "video" },
        { name: "60 Retouched Photos on the Same Day", icon: "sparkles" },
        { name: "Mini Printed Album", icon: "book-open" },
        { name: "Visual Wall Calendar (2 Sets)", icon: "calendar" },
        { name: "Premium Curation Wall Frames (2 Sets)", icon: "image" }
      ];
    } else {
      gifts = [
        { name: "Visual Wall Calendar", icon: "calendar" },
        { name: "Premium Desktop Photo Frame", icon: "image" }
      ];
    }

    // Build the list
    itemsList.innerHTML = gifts.map(g => `
      <div class="gift-reveal-item">
        <i data-lucide="${g.icon}"></i>
        <span>${g.name}</span>
      </div>
    `).join("");

    // Initialize/refresh Lucide icons inside the dynamically injected HTML
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({
        attrs: {
          class: 'lucide'
        },
        nameAttr: 'data-lucide'
      });
    }

    // Reset popup state
    overlay.classList.add("open");
    giftBox.classList.remove("opened");
    instruction.style.display = "block";
    revealContent.style.display = "none";
    countdownSec.textContent = "10";

    let opened = false;
    let timer = null;

    function openGift() {
      if (opened) return;
      opened = true;

      // Add opened animations
      giftBox.classList.add("opened");
      instruction.style.display = "none";
      revealContent.style.display = "block";

      // Trigger poppers
      triggerConfettiPoppers();

      // Start countdown
      let count = 10;
      timer = setInterval(() => {
        count--;
        countdownSec.textContent = count;
        if (count <= 0) {
          clearInterval(timer);
          overlay.classList.remove("open");
          onRedirect();
        }
      }, 1000);
    }

    // Single-use listener for clicking anywhere on overlay to open
    const tapHandler = function(e) {
      if (!opened) {
        openGift();
        overlay.removeEventListener("click", tapHandler);
      }
    };
    overlay.addEventListener("click", tapHandler);
  }

  // --- 16. PULL-DOWN-TO-RELOAD MOBILE GESTURE (3 SWIPES ON HOME SECTION) ---
  function showReloadToast(message) {
    let toast = document.getElementById("reload-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "reload-toast";
      toast.style.position = "fixed";
      toast.style.top = "30px";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%)";
      toast.style.background = "rgba(10, 10, 10, 0.95)";
      toast.style.color = "var(--gold-accent)";
      toast.style.border = "1px solid var(--gold-accent)";
      toast.style.padding = "10px 24px";
      toast.style.borderRadius = "30px";
      toast.style.fontSize = "13px";
      toast.style.fontWeight = "600";
      toast.style.zIndex = "999999";
      toast.style.boxShadow = "0 8px 30px rgba(0,0,0,0.6)";
      toast.style.pointerEvents = "none";
      toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";

    // Auto-hide after 2 seconds
    clearTimeout(window.reloadToastTimer);
    window.reloadToastTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(-10px)";
    }, 2000);
  }

  let reloadPullDownCount = 0;
  let reloadPullDownTimeout;
  let reloadTouchStartY = 0;
  let reloadTouchStartX = 0;

  document.addEventListener("touchstart", (e) => {
    // Only detect pull-down on the home landing page (currentSectionIndex === 0)
    if (typeof currentSectionIndex !== "undefined" && currentSectionIndex === 0 && e.touches.length === 1) {
      reloadTouchStartY = e.touches[0].clientY;
      reloadTouchStartX = e.touches[0].clientX;
    }
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    if (typeof currentSectionIndex !== "undefined" && currentSectionIndex === 0 && e.changedTouches.length === 1) {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;

      const deltaY = touchEndY - reloadTouchStartY;
      const deltaX = Math.abs(touchEndX - reloadTouchStartX);

      // If swiped down at least 120px vertically with little horizontal drift
      if (deltaY > 120 && deltaX < 60) {
        reloadPullDownCount++;

        clearTimeout(reloadPullDownTimeout);
        reloadPullDownTimeout = setTimeout(() => {
          reloadPullDownCount = 0;
        }, 3000); // Reset count after 3 seconds of inactivity

        if (reloadPullDownCount === 1) {
          showReloadToast("Pull down 2 more times to reload...");
        } else if (reloadPullDownCount === 2) {
          showReloadToast("Pull down 1 more time to reload...");
        } else if (reloadPullDownCount >= 3) {
          showReloadToast("Reloading website...");
          setTimeout(() => {
            window.location.href = window.location.origin + window.location.pathname;
          }, 600);
        }
      }
    }
  }, { passive: true });

  // --- JOURNAL SECTION SYSTEM & OVERLAY READER ---
  const journalGrid = document.getElementById("journal-grid");
  const readerOverlay = document.getElementById("journal-reader-overlay");
  const readerCloseBtn = document.getElementById("journal-reader-close");
  const readerBanner = document.getElementById("journal-reader-banner");
  const readerCategory = document.getElementById("journal-reader-category");
  const readerDate = document.getElementById("journal-reader-date");
  const readerTitle = document.getElementById("journal-reader-title");
  const readerContent = document.getElementById("journal-reader-content");

  function renderJournalCards() {
    if (!journalGrid || typeof journalPosts === "undefined") return;
    journalGrid.innerHTML = "";

    journalPosts.forEach(post => {
      const card = document.createElement("div");
      card.className = "journal-card";
      card.setAttribute("data-id", post.id);
      
      card.innerHTML = `
        <div class="journal-img-wrapper">
          <img src="${post.thumbnail}" alt="${post.title}" class="journal-img" loading="lazy">
        </div>
        <div class="journal-card-body">
          <div class="journal-card-meta">
            <span class="journal-card-category">${post.category}</span>
            <span class="journal-card-date">${post.date}</span>
          </div>
          <h3 class="journal-card-title">${post.title}</h3>
          <p class="journal-card-summary">${post.summary}</p>
          <div class="journal-card-cta">
            <span>Read Article</span>
            <i data-lucide="arrow-right"></i>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        openJournalArticle(post.id);
      });

      journalGrid.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function openJournalArticle(id) {
    if (typeof journalPosts === "undefined") return;
    const post = journalPosts.find(p => p.id === id);
    if (!post || !readerOverlay) return;

    // Populate Reader contents
    if (readerBanner) readerBanner.style.backgroundImage = `url('${post.thumbnail}')`;
    if (readerCategory) readerCategory.textContent = post.category;
    if (readerDate) readerDate.textContent = post.date;
    if (readerTitle) readerTitle.textContent = post.title;
    if (readerContent) readerContent.innerHTML = post.content;

    // Open Overlay
    readerOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Lock page scroll

    // Refresh icons inside reader if any
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeJournalArticle() {
    if (!readerOverlay) return;
    readerOverlay.classList.remove("active");
    
    // Only restore body overflow if maintenance screen is not active
    const maintenanceOverlay = document.getElementById("maintenance-overlay");
    if (!maintenanceOverlay || maintenanceOverlay.style.display !== "flex") {
      document.body.style.overflow = ""; 
    }
  }

  // Bind close events
  if (readerCloseBtn) {
    readerCloseBtn.addEventListener("click", closeJournalArticle);
  }

  if (readerOverlay) {
    readerOverlay.addEventListener("click", (e) => {
      // If clicked outside the main content card
      if (e.target === readerOverlay) {
        closeJournalArticle();
      }
    });
  }

  // Escape key handler
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && readerOverlay && readerOverlay.classList.contains("active")) {
      closeJournalArticle();
    }
  });

  // Render cards on page load
  renderJournalCards();

});

