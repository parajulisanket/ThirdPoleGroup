// Open/close logic
const menuBtn = document.getElementById("menuBtn");
const sideNav = document.getElementById("sideNav");
const closeBtn = document.getElementById("closeBtn");
menuBtn.addEventListener("click", () => {
  sideNav.classList.remove("opacity-0", "pointer-events-none");
  sideNav.classList.add("opacity-100");
});
closeBtn.addEventListener("click", () => {
  sideNav.classList.add("opacity-0", "pointer-events-none");
  sideNav.classList.remove("opacity-100");
});
// Optional: ESC closes nav
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    sideNav.classList.add("opacity-0", "pointer-events-none");
    sideNav.classList.remove("opacity-100");
  }
});

// for about part fade up
document.addEventListener("DOMContentLoaded", function () {
  const blocks = document.querySelectorAll(".block-animate");

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("show");
            }, i * 200); // Stagger by index
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    blocks.forEach((block, i) => {
      obs.observe(block);
    });
  } else {
    // Fallback for old browsers
    const reveal = () => {
      blocks.forEach((block, i) => {
        const rect = block.getBoundingClientRect();
        if (
          rect.top < window.innerHeight - 60 &&
          !block.classList.contains("show")
        ) {
          setTimeout(() => block.classList.add("show"), i * 200);
        }
      });
    };
    window.addEventListener("scroll", reveal);
    reveal();
  }
});

// Get the "Back to Top" button
const backToTopButton = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});
backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
