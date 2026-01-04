// MENÚ HAMBURGUESA

const burgerBtn = document.querySelector(".burger");
const burgerIcon = document.querySelector(".burger > i");
const menu = document.querySelector("#main-menu");

if (burgerBtn && burgerIcon && menu) {
  burgerBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("menu-show");

    burgerBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("no-scroll", isOpen);

    if (isOpen) {
      burgerIcon.classList.remove("fa-bars");
      burgerIcon.classList.add("fa-xmark");
    } else {
      burgerIcon.classList.add("fa-bars");
      burgerIcon.classList.remove("fa-xmark");
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!menu.classList.contains("menu-show")) return;

      menu.classList.remove("menu-show");
      burgerBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");

      burgerIcon.classList.add("fa-bars");
      burgerIcon.classList.remove("fa-xmark");
    });
  });
}

const header = document.querySelector(".site-header");

function syncHeaderHeight() {
  if (!header) return;
  const h = Math.round(header.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--header-h", `${h}px`);
}

window.addEventListener("load", syncHeaderHeight);
window.addEventListener("resize", syncHeaderHeight);

// ACCORDION TARJETAS DE EVENTOS

$(document).ready(function () {
  const $toggles = $(".attraction-toggle");
  const $panels = $(".attraction-panel");

  $panels.each(function () {
    $(this).hide();
  });

  $toggles.on("click", function () {
    const $btn = $(this);
    const $card = $btn.closest(".attraction-card");
    const $panel = $btn.next(".attraction-panel");
    const isOpen = $card.hasClass("is-open");

    $(".attraction-card").removeClass("is-open");
    $(".attraction-toggle").attr("aria-expanded", "false");
    $(".attraction-panel").stop(true, true).slideUp(200);

    if (!isOpen) {
      $card.addClass("is-open");
      $btn.attr("aria-expanded", "true");
      $panel.stop(true, true).slideDown(220);
    }
  });
});

// SLIDESHOW / CARRUSEL

(function () {
  const root = document.querySelector("#toprunners");
  if (!root) return;

  const container = root.querySelector(".slideshow-container");
  if (!container) return;
  if (container.dataset.carouselInit === "1") return;
  container.dataset.carouselInit = "1";

  let slideIndex = 1;
  let autoSlideId = null;
  let locked = false;

  const slides = root.querySelectorAll(".runnerSlide");
  const dots = root.querySelectorAll(".dot");
  const prev = root.querySelector(".prev");
  const next = root.querySelector(".next");

  if (!slides.length) return;

  function stopAutoSlide() {
    if (autoSlideId !== null) {
      clearInterval(autoSlideId);
      autoSlideId = null;
    }
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideId = setInterval(() => nextPrevSlide(1), 1800);
  }

  function showSlide(n) {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    slides.forEach((s) => (s.style.display = "none"));
    dots.forEach((d) => d.classList.remove("active"));

    const active = slides[slideIndex - 1];
    active.style.display = "block";
    dots[slideIndex - 1]?.classList.add("active");
  }

  function nextPrevSlide(step) {
    if (locked) return;
    locked = true;
    slideIndex += step;
    showSlide(slideIndex);
    setTimeout(() => {
      locked = false;
    }, 200);
  }

  showSlide(slideIndex);
  startAutoSlide();

  next?.addEventListener("click", (e) => {
    e.preventDefault();
    stopAutoSlide();
    nextPrevSlide(1);
    startAutoSlide();
  });

  prev?.addEventListener("click", (e) => {
    e.preventDefault();
    stopAutoSlide();
    nextPrevSlide(-1);
    startAutoSlide();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      slideIndex = i + 1;
      showSlide(slideIndex);
      startAutoSlide();
    });
  });

  container.addEventListener("mouseenter", stopAutoSlide);
  container.addEventListener("mouseleave", startAutoSlide);
})();
