/* ============================
   STRUCTURA LABS - Main JS
============================ */

// Mobile Navigation
const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");

if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("mobile-open");
  });
}

// Close mobile menu after clicking a link
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("mobile-open");
  });
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// Header shadow while scrolling
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 40) {
    header.style.boxShadow = "0 8px 28px rgba(0,0,0,.12)";
    header.style.background = "rgba(255,255,255,.98)";
  } else {
    header.style.boxShadow = "0 2px 18px rgba(0,0,0,.05)";
    header.style.background = "rgba(255,255,255,.96)";
  }

});

// Fade-in animation
const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }

  });

}, {
  threshold: .15
});

document.querySelectorAll(
  ".trust-card,.service-card,.about-grid,.contact-box"
).forEach(el => {

  el.classList.add("hidden");
  observer.observe(el);

});
