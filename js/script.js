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

// JQUERY ACCORDION

$(document).ready(function () {
  const $toggles = $(".event-toggle");
  const $panels = $(".event-panel");

  $panels.each(function () {
    $(this).hide();
  });

  $toggles.on("click", function () {
    const $btn = $(this);
    const $card = $btn.closest(".event-card");
    const $panel = $btn.next(".event-panel");
    const isOpen = $card.hasClass("is-open");

    $(".event-card").removeClass("is-open");
    $(".event-toggle").attr("aria-expanded", "false");
    $(".event-panel").stop(true, true).slideUp(200);

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
    autoSlideId = setInterval(() => nextPrevSlide(1), 1650);
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

// FORMULARIO

(function () {
  const form = document.getElementById("signupForm");
  if (!form) return;

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const fullname = document.getElementById("fullname");
  const btnSubmit = document.getElementById("signupSubmit");
  const btnGoogle = document.getElementById("signupGoogle");

  const emailErr = document.getElementById("emailErr");
  const passwordErr = document.getElementById("passwordErr");
  const fullnameErr = document.getElementById("fullnameErr");

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const pwdRe = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  function setError(el, errEl, msg) {
    errEl.textContent = msg || "";
    el.setAttribute("aria-invalid", msg ? "true" : "false");
  }

  function validate() {
    let valid = true;

    if (!email.value.trim()) {
      setError(email, emailErr, "El email es obligatorio.");
      valid = false;
    } else if (!emailRe.test(email.value.trim())) {
      setError(email, emailErr, "Introduce un email válido.");
      valid = false;
    } else {
      setError(email, emailErr, "");
    }

    if (!password.value) {
      setError(password, passwordErr, "La contraseña es obligatoria.");
      valid = false;
    } else if (!pwdRe.test(password.value)) {
      setError(password, passwordErr, "Mín. 8 car., 1 mayúscula y 1 número.");
      valid = false;
    } else {
      setError(password, passwordErr, "");
    }

    if (!fullname.value.trim()) {
      setError(fullname, fullnameErr, "El nombre es obligatorio.");
      valid = false;
    } else if (fullname.value.trim().length < 2) {
      setError(fullname, fullnameErr, "Introduce tu nombre completo.");
      valid = false;
    } else {
      setError(fullname, fullnameErr, "");
    }

    btnSubmit.disabled = !valid;
    return valid;
  }

  ["input", "blur"].forEach((evt) => {
    email.addEventListener(evt, validate);
    password.addEventListener(evt, validate);
    fullname.addEventListener(evt, validate);
  });

  const toggle = document.querySelector(".password__toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const isPwd = password.getAttribute("type") === "password";
      password.setAttribute("type", isPwd ? "text" : "password");
      toggle.firstElementChild?.classList.toggle("fa-eye");
      toggle.firstElementChild?.classList.toggle("fa-eye-slash");
      toggle.setAttribute(
        "aria-label",
        isPwd ? "Ocultar contraseña" : "Mostrar contraseña"
      );
      password.focus();
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    const user = {
      email: email.value.trim(),
      fullname: fullname.value.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("nextrun_user", JSON.stringify(user));
      btnSubmit.textContent = "Creando cuenta…";
      btnSubmit.disabled = true;

      setTimeout(() => {
        window.location.href = "perfil.html";
      }, 800);
    } catch (err) {
      alert(
        "No se pudo crear la cuenta en este dispositivo. Inténtalo de nuevo."
      );
      btnSubmit.textContent = "Continuar";
      validate();
    }
  });

  if (btnGoogle) {
    btnGoogle.addEventListener("click", () => {
      alert("Google Sign-In aún no está conectado.");
    });
  }

  validate();
})();
