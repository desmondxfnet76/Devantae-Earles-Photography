document.addEventListener("DOMContentLoaded", () => {
  // Utility function for debouncing
  const debounce = (func, delay = 200) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // 1. Smooth Scrolling for Internal Anchor Links
  const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Calculate offset, potentially accounting for a fixed header
          const headerOffset =
            document.querySelector(".header")?.offsetHeight || 0;
          const offsetPosition = targetElement.offsetTop - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // For accessibility: give focus to the target element
          targetElement.setAttribute("tabindex", "-1");
          targetElement.focus();
        }
      });
    });
  };

  // 2. Mobile Navigation Toggle with Enhancements
  const setupMobileNavigation = () => {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const header = document.querySelector(".header"); // Get header to potentially push content down

    if (!mobileMenuBtn || !navLinks || !header) {
      console.warn(
        "Mobile menu button, nav links, or header not found. Mobile navigation not initialized."
      );
      return;
    }

    // Toggle menu on button click
    mobileMenuBtn.addEventListener("click", () => {
      const isActive = navLinks.classList.toggle("active");
      mobileMenuBtn.setAttribute("aria-expanded", isActive);

      // Optional: Add/remove a class to body or header to prevent scrolling when menu is open
      // This is crucial for mobile usability
      if (isActive) {
        document.body.classList.add("menu-open");
        header.classList.add("nav-active"); // Add class to header to push content if menu overlaps
      } else {
        document.body.classList.remove("menu-open");
        header.classList.remove("nav-active");
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".nav-links") &&
        !e.target.closest(".mobile-menu-btn") &&
        navLinks.classList.contains("active") // Only close if it's currently open
      ) {
        navLinks.classList.remove("active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
        header.classList.remove("nav-active");
      }
    });

    // Close menu when a navigation link is clicked (for UX on single-page sites)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          mobileMenuBtn.setAttribute("aria-expanded", "false");
          document.body.classList.remove("menu-open");
          header.classList.remove("nav-active");
        }
      });
    });
  };

  // 3. Lazy Load Portfolio Images (Your existing code is good)
  const setupLazyLoadImages = () => {
    const images = document.querySelectorAll('img[loading="lazy"][data-src]');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            obs.unobserve(img);
          }
        });
      },
      {
        rootMargin: "0px 0px 200px 0px",
      }
    );

    images.forEach((img) => observer.observe(img));
  };

  // 4. Animate Sections on Scroll (Your existing code is good)
  const setupAnimateSectionsOnScroll = () => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
  };

  // 5. Initialize Functions
  const initializeAllFeatures = () => {
    setupSmoothScroll();
    setupMobileNavigation();
    setupLazyLoadImages();
    setupAnimateSectionsOnScroll();
    // No explicit call for handleResize here, as it's triggered by window.addEventListener
  };

  // Event Listeners
  window.addEventListener(
    "resize",
    debounce(() => {
      // console.log("Window resized debounced"); // Uncomment for debugging
      // You can add responsive JS logic here if needed beyond CSS media queries
    })
  );

  // Ensure all DOM-dependent functions run after the DOM is fully loaded
  initializeAllFeatures();

  // Set current year in footer (Moved from inline script)
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});

// Calendly Widget Script (Keep this outside the DOMContentLoaded if it's external)
// Your HTML has this correctly placed directly in the <script> block after the main script
// So, this block below is just for completeness if it were in the same file.
/*
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
<script>
  window.addEventListener("load", () => {
    Calendly.initBadgeWidget({
      url: "https://calendly.com/your-username",
      text: "Schedule time with me",
      color: "#00a2ff",
      textColor: "#ffffff",
      branding: true,
    });
  });
</script>
*/
