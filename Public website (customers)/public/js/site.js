/* ==========================================================================
   SANJAY JEWELLERS — Public Luxury Website Scripts
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Drawer Toggle
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("site-nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", isOpen);
      menuBtn.textContent = isOpen ? "Close ✕" : "Menu ☰";
    });

    // Close mobile nav when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target) && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "Menu ☰";
      }
    });

    // Close when clicking any nav link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "Menu ☰";
      });
    });
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav a:not(.nav-cta)");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("is-active");
    }
  });

  // Category Filtering on Collections Page
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".cards .card[data-category]");

  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        const targetCategory = btn.getAttribute("data-filter");

        productCards.forEach((card) => {
          const cardCat = card.getAttribute("data-category");
          if (targetCategory === "all" || cardCat === targetCategory) {
            card.style.display = "flex";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 10);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(10px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 250);
          }
        });
      });
    });
  }

  // Contact Form Submission Handler
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const statusEl = document.getElementById("contact-status");
      const nameInput = document.getElementById("name");
      const phoneInput = document.getElementById("phone");

      const name = nameInput ? nameInput.value.trim() : "";
      const phone = phoneInput ? phoneInput.value.trim() : "";

      if (!name || !phone) {
        if (statusEl) {
          statusEl.style.color = "#c93530";
          statusEl.textContent = "Kripya apna naam aur phone number darj karein.";
        }
        return;
      }

      if (statusEl) {
        statusEl.style.color = "#0f2d22";
        statusEl.innerHTML = `<strong>Dhanyawad, ${name}!</strong> Aapki enquiry darj kar li gayi hai. SANJAY JEWELLERS desk jald hi aapse contact karegi.`;
      }

      contactForm.reset();
    });
  }

  // Update Daily Rates Timestamp
  const rateTimestampEl = document.getElementById("rate-timestamp");
  if (rateTimestampEl) {
    const today = new Date();
    const options = { day: "numeric", month: "short", year: "numeric" };
    rateTimestampEl.textContent = `Today, ${today.toLocaleDateString("en-IN", options)}`;
  }
});
