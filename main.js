/* ==========================================
   STRUCTURA LABS - Main JavaScript
   ========================================== */

// ================= MOBILE MENU =================

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

if (hamburger && menu) {

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });

}

// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(e){

    const target = document.querySelector(this.getAttribute("href"));

    if(!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });

  });

});

// ================= HEADER EFFECT =================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

  if(window.scrollY > 40){

    header.style.background="rgba(255,255,255,.98)";
    header.style.boxShadow="0 8px 28px rgba(0,0,0,.12)";

  }else{

    header.style.background="rgba(255,255,255,.96)";
    header.style.boxShadow="0 3px 18px rgba(0,0,0,.06)";

  }

});

// ================= FADE-IN ANIMATION =================

const observer = new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      entry.target.classList.add("show");

    }

  });

},{
  threshold:.15
});

document.querySelectorAll(".card,.about,.contact-box,.feature").forEach(el=>{

  el.classList.add("hidden");
  observer.observe(el);

});
