// Smooth scrolling and interactive elements for Good Vibes Beauty Pageant website

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navLinkItems = document.querySelectorAll(".nav-links .nav-link");

  if (mobileMenuToggle && navLinks) {
    // Toggle open/close
    mobileMenuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      navLinks.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });

    // Close when a link is clicked
    navLinkItems.forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      });
    });
  } else {
    console.error("Mobile menu elements not found:", {
      mobileMenuToggle,
      navLinks,
    });
  }

  // Close when clicking outside
  document.addEventListener("click", function (e) {
    if (navLinks && mobileMenuToggle) {
      if (
        !navLinks.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)
      ) {
        navLinks.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    }
  });
});

// Smooth scrolling for navigation links
const navLinksAll = document.querySelectorAll('.nav-link[href^="#"]');
navLinksAll.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    }
  });
});

// Navbar background change on scroll
const navbar = document.querySelector(".navbar");
let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add/remove scrolled class for navbar styling
  if (scrollTop > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Hide/show navbar on scroll (optional)
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Hero blur effect when scrolling to prizes section
// Different behavior for different screen sizes
let isMobile = window.innerWidth <= 768;
let isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
let isDesktop = window.innerWidth > 1024;

// Configure blur options based on screen size
let heroBlurOptions;
if (isMobile) {
  // Mobile: blur when prizes section is 20% visible
  heroBlurOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  };
} else if (isTablet) {
  // Tablet: blur when prizes section is 50% visible with more margin
  heroBlurOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -200px 0px",
  };
} else {
  // Desktop: blur when prizes section is 10% visible
  heroBlurOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px 0px 0px",
  };
}

const heroBlurObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    const hero = document.querySelector(".hero");
    if (hero) {
      if (entry.isIntersecting) {
        hero.classList.add("blurred");
      } else {
        hero.classList.remove("blurred");
      }
    }
  });
}, heroBlurOptions);

const prizesSection = document.querySelector("#prizes");
if (prizesSection) {
  // Small delay to prevent immediate blur on page load
  setTimeout(
    () => {
      heroBlurObserver.observe(prizesSection);
    },
    isTablet ? 300 : 100
  ); // Longer delay for tablets
}

// Handle resize events to update blur behavior
window.addEventListener("resize", function () {
  let newIsMobile = window.innerWidth <= 768;
  let newIsTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
  let newIsDesktop = window.innerWidth > 1024;

  // Only update if breakpoint changed
  if (
    newIsMobile !== isMobile ||
    newIsTablet !== isTablet ||
    newIsDesktop !== isDesktop
  ) {
    // Disconnect current observer
    heroBlurObserver.disconnect();

    // Update breakpoint variables
    isMobile = newIsMobile;
    isTablet = newIsTablet;
    isDesktop = newIsDesktop;

    // Reconfigure blur options
    if (isMobile) {
      heroBlurOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      };
    } else if (isTablet) {
      heroBlurOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -200px 0px",
      };
    } else {
      heroBlurOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px 0px 0px",
      };
    }

    // Create new observer with updated options
    const newHeroBlurObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        const hero = document.querySelector(".hero");
        if (entry.isIntersecting) {
          hero.classList.add("blurred");
        } else {
          hero.classList.remove("blurred");
        }
      });
    }, heroBlurOptions);

    // Observe prizes section again
    if (prizesSection) {
      newHeroBlurObserver.observe(prizesSection);
    }

    // Update the global reference
    heroBlurObserver = newHeroBlurObserver;
  }
});

// Observe elements for animation
const animateElements = document.querySelectorAll(
  ".prize-card, .step, .value-item, .section-title"
);
animateElements.forEach((el) => {
  observer.observe(el);
});

// // Parallax effect for hero section
// const hero = document.querySelector(".hero");
// if (hero) {
//   window.addEventListener("scroll", function () {
//     const scrolled = window.pageYOffset;
//     const parallax = scrolled * 0.5;
//     hero.style.transform = `translateY(${parallax}px)`;
//   });
// }

// Button hover effects enhancement
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px) scale(1.05)";
  });

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Prize card hover effects
const prizeCards = document.querySelectorAll(".prize-card");
prizeCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Form handling for CTAs (placeholder functionality)
const ctaButtons = document.querySelectorAll(".btn-primary, .btn-secondary");
ctaButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    // Check if it's an Apply button
    if (this.textContent.includes("Apply")) {
      e.preventDefault();
      showApplicationModal();
    } else if (this.textContent.includes("Tickets")) {
      e.preventDefault();
      showTicketsModal();
    }
  });
});

// Modal functions (placeholder)
function showApplicationModal() {
  alert("Application form would open here! This is a demo version.");
}

function showTicketsModal() {
  alert("Ticket purchase would open here! This is a demo version.");
}

// Scroll to top functionality
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = "↑";
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.setAttribute("aria-label", "Scroll to top");
document.body.appendChild(scrollToTopBtn);

// Style the scroll to top button
const scrollToTopStyles = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--primary-gold), var(--accent-purple));
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-3px) scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 18px;
            }
        }
    `;

const styleSheet = document.createElement("style");
styleSheet.textContent = scrollToTopStyles;
document.head.appendChild(styleSheet);

// Show/hide scroll to top button
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Add loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  // ESC key to close mobile menu
  if (e.key === "Escape" && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
  }
});

// Touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener("touchstart", function (e) {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", function (e) {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartY - touchEndY;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe up - could be used for navigation
      console.log("Swipe up detected");
    } else {
      // Swipe down - could be used for navigation
      console.log("Swipe down detected");
    }
  }
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function () {
  // Scroll-based animations and effects
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  //   // Parallax effect for background elements
  // const heroBackground = document.querySelector(".hero::before");
  // if (heroBackground) {
  //   heroBackground.style.transform = `translateY(${rate}px)`;
  // }
}, 16); // ~60fps

window.addEventListener("scroll", throttledScrollHandler);

// Add CSS for animations
const animationStyles = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .navbar.scrolled {
            background: var(--text-dark);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }
        
        body.loaded {
            opacity: 1;
        }
        
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        

    `;

const animationStyleSheet = document.createElement("style");
animationStyleSheet.textContent = animationStyles;
document.head.appendChild(animationStyleSheet);

// Initialize AOS (Animate On Scroll) alternative
function initScrollAnimations() {
  const elements = document.querySelectorAll("[data-aos]");
  elements.forEach((el) => {
    const delay = el.dataset.aosDelay || 0;
    el.style.animationDelay = `${delay}ms`;
  });
}

initScrollAnimations();

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    // Uncomment the following lines if you want to add PWA functionality
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered'))
    //     .catch(error => console.log('SW registration failed'));
  });
}
