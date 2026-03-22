/* NEXTGEN CORPORATION - Script */

/* LOADER - smooth fade out */
function hideLoader() {
  var loader = document.getElementById("loader");
  if (!loader) return;
  loader.classList.add("fade-out");
  setTimeout(function() { loader.style.display = "none"; }, 600);
}

window.onload = function() { hideLoader(); };
setTimeout(hideLoader, 2000);

/* STICKY HEADER */
window.addEventListener("scroll", function() {
  var header = document.getElementById("mainHeader");
  if (!header) return;
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* HAMBURGER */
function toggleMenu() {
  document.getElementById("mobileNav").classList.toggle("open");
}
function closeMenu() {
  document.getElementById("mobileNav").classList.remove("open");
}

/* SCROLL TO SERVICES */
function scrollToSection() {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
}

/* HERO SLIDESHOW */
var slides = document.querySelectorAll(".slide");
var currentSlide = 0;

function changeSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");

  var dots = document.querySelectorAll(".dot");
  dots.forEach(function(d) { d.classList.remove("active"); });
  if (dots[currentSlide]) dots[currentSlide].classList.add("active");
}

if (slides.length > 0) {
  /* Build dots */
  var dotsContainer = document.getElementById("slideDots");
  if (dotsContainer) {
    for (var i = 0; i < slides.length; i++) {
      var dot = document.createElement("div");
      dot.className = "dot" + (i === 0 ? " active" : "");
      (function(idx) {
        dot.onclick = function() {
          slides[currentSlide].classList.remove("active");
          currentSlide = idx;
          slides[currentSlide].classList.add("active");
          document.querySelectorAll(".dot").forEach(function(d) { d.classList.remove("active"); });
          dotsContainer.querySelectorAll(".dot")[idx].classList.add("active");
        };
      })(i);
      dotsContainer.appendChild(dot);
    }
  }
  setInterval(changeSlide, 5000);
}

/* COUNTERS */
var counters = document.querySelectorAll(".counter");
var counted = false;

function runCounters() {
  if (counted) return;
  counted = true;
  counters.forEach(function(counter) {
    var target = parseInt(counter.getAttribute("data-target"));
    var current = 0;
    var step = Math.ceil(target / 60);
    var timer = setInterval(function() {
      current += step;
      if (current >= target) {
        counter.innerText = target;
        clearInterval(timer);
      } else {
        counter.innerText = current;
      }
    }, 30);
  });
}

window.addEventListener("scroll", function() {
  var statsSection = document.querySelector(".stats");
  if (!statsSection) return;
  var rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    runCounters();
  }
});

/* FADE IN ON SCROLL */
function checkFades() {
  var fadeEls = document.querySelectorAll(".fade-in");
  fadeEls.forEach(function(el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", checkFades);
checkFades();

/* STAGGERED DELAYS for service boxes and product cards */
var staggerEls = document.querySelectorAll(".service-box.fade-in, .product.fade-in");
staggerEls.forEach(function(el, i) {
  el.style.transitionDelay = (i * 0.1) + "s";
});