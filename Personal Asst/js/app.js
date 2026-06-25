// Core Application Logic for Dr. Ramesh Gummadi's Portfolio

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Render
  renderAllComponents();

  // 2. Initialize Admin Logic
  if (typeof initAdminPanel === "function") {
    initAdminPanel();
  }

  // 3. Dark/Light Mode Theme Toggle
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

  // Check saved theme
  const savedTheme = localStorage.getItem("ramesh_portfolio_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("ramesh_portfolio_theme", newTheme);
      updateThemeIcon(newTheme);
      
      if (typeof window.showAdminToast === "function") {
        window.showAdminToast(`Switched to ${newTheme === "dark" ? "Dark" : "Light"} Mode!`, "success");
      }
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === "light") {
      themeIcon.className = "fas fa-sun";
    } else {
      themeIcon.className = "fas fa-moon";
    }
  }

  // 4. Header Scroll Action
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 5. Mobile Navigation Menu Drawer
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const drawerOverlay = document.getElementById("drawer-overlay");
  const drawerLinks = document.querySelectorAll(".drawer-link");

  const openDrawer = () => {
    mobileDrawer.classList.add("open");
    drawerOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove("open");
    drawerOverlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  if (mobileMenuToggle) mobileMenuToggle.addEventListener("click", openDrawer);
  if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      closeDrawer();
      
      // Update active state immediately
      drawerLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // 6. Navigation Link Scrolling Spy
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentSectionId = "home";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // accounting for sticky header
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // Update Desktop Nav Links
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });

    // Update Mobile Drawer Links
    drawerLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  // 7. Timeline Experience / Education Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const timelineViews = document.querySelectorAll(".timeline-view");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetViewId = btn.getAttribute("data-tab");

      tabButtons.forEach(b => b.classList.remove("active"));
      timelineViews.forEach(v => v.classList.remove("active"));

      btn.classList.add("active");
      const targetView = document.getElementById(targetViewId);
      if (targetView) targetView.classList.add("active");
    });
  });

  // 8. Publications Category Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filterValue = btn.getAttribute("data-filter");

      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (typeof renderPublications === "function") {
        renderPublications(filterValue);
      }
    });
  });

  // 9. Interactive Counters (Scroll Animation)
  const counterElements = document.querySelectorAll(".achievement-value");
  
  if ("IntersectionObserver" in window && counterElements.length > 0) {
    const animateCounters = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetText = el.textContent;
          const hasPlus = targetText.includes("+");
          const hasK = targetText.includes("K");
          const targetValue = parseInt(el.getAttribute("data-target"));
          
          let currentVal = 0;
          const duration = 1500; // ms
          const stepTime = Math.max(Math.floor(duration / targetValue), 15);
          
          const counterInterval = setInterval(() => {
            currentVal += Math.ceil(targetValue / 50);
            if (currentVal >= targetValue) {
              currentVal = targetValue;
              clearInterval(counterInterval);
            }
            
            let displayVal = currentVal;
            if (hasK) displayVal = currentVal + "K";
            if (hasPlus) displayVal = displayVal + "+";
            el.textContent = displayVal;
          }, stepTime);
          
          observer.unobserve(el); // only animate once
        }
      });
    };

    const counterObserver = new IntersectionObserver(animateCounters, {
      threshold: 0.5
    });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // 10. Title Rotator (Typing Effect)
  const rotatorTextEl = document.getElementById("title-rotator-text");
  if (rotatorTextEl) {
    const titles = PORTFOLIO_DATA.profile.titles || ["Assistant Professor", "AI Researcher", "Technical Trainer", "Content Creator"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
      const currentTitle = titles[titleIndex];
      
      if (isDeleting) {
        rotatorTextEl.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // faster deleting
      } else {
        rotatorTextEl.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 120; // natural typing speed
      }

      if (!isDeleting && charIndex === currentTitle.length) {
        typingSpeed = 2000; // pause at full title
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500; // pause before starting next title
      }

      setTimeout(typeEffect, typingSpeed);
    };

    // Start typing after a short delay
    setTimeout(typeEffect, 1000);
  }

  // 11. Contact Form Validation and Mock Submit
  const contactForm = document.getElementById("portfolio-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      let isValid = true;
      const name = contactForm.elements["name"];
      const email = contactForm.elements["email"];
      const subject = contactForm.elements["subject"];
      const message = contactForm.elements["message"];

      // Clear errors
      document.querySelectorAll(".form-group").forEach(group => group.classList.remove("has-error"));

      // Name check
      if (name.value.trim().length === 0) {
        name.closest(".form-group").classList.add("has-error");
        isValid = false;
      }

      // Email check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.closest(".form-group").classList.add("has-error");
        isValid = false;
      }

      // Subject check
      if (subject.value.trim().length === 0) {
        subject.closest(".form-group").classList.add("has-error");
        isValid = false;
      }

      // Message check
      if (message.value.trim().length === 0) {
        message.closest(".form-group").classList.add("has-error");
        isValid = false;
      }

      if (isValid) {
        const btn = contactForm.querySelector("button[type='submit']");
        const originalBtnText = btn.innerHTML;
        
        // Mock loading spinner/sending effect
        btn.disabled = true;
        btn.innerHTML = 'Sending Message <i class="fas fa-spinner fa-spin"></i>';

        setTimeout(() => {
          // Success Callback
          btn.disabled = false;
          btn.innerHTML = originalBtnText;
          contactForm.reset();
          
          if (typeof window.showAdminToast === "function") {
            window.showAdminToast("Message sent successfully! Dr. Ramesh will respond soon.", "success");
          }
        }, 1500);
      }
    });
  }
});
