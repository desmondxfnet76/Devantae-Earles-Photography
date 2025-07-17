document.addEventListener("DOMContentLoaded", () => {
  // Smooth Scrolling for Internal Anchor Links
  const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const offsetPosition = targetElement.offsetTop;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          targetElement.setAttribute("tabindex", "-1");
          targetElement.focus();
        }
      });
    });
  };

  // Mobile Navigation Toggle
  const toggleMobileMenu = () => {
    const btn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector(".nav-links");

    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
      const isActive = nav.classList.toggle("active");
      btn.setAttribute("aria-expanded", isActive);
    });

    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".nav-links") &&
        !e.target.closest(".mobile-menu-btn")
      ) {
        nav.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  };

  // Lazy Load Portfolio Images
  const lazyLoadImages = () => {
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

  // Animate Sections on Scroll
  const animateSectionsOnScroll = () => {
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

  // Debounced Resize Handler
  const debounce = (func, delay = 200) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleResize = debounce(() => {
    console.log("Window resized");
    // Insert responsive logic as needed
  });

  // Initialize Functions
  const init = () => {
    smoothScroll();
    toggleMobileMenu();
    lazyLoadImages();
    animateSectionsOnScroll();
  };

  window.addEventListener("resize", handleResize);
  init();
});

<!-- Calendly Widget Script -->
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
