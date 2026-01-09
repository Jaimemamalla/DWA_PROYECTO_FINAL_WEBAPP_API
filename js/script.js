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

// SECCIOÓN CORREDORES
(() => {
  const isRunnersPage = (location.pathname || "")
    .toLowerCase()
    .includes("corredores");
  if (!isRunnersPage) return;

  const grid = document.getElementById("runnersGrid");
  const status = document.getElementById("runnersStatus");
  const searchInput = document.getElementById("searchRunner");
  const filterBtns = Array.from(
    document.querySelectorAll(".chip[data-filter]")
  );

  if (!grid) return;

  let runners = [];
  let activeFilter = "all";

  const esc = (s) =>
    String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  function setActiveChip(filter) {
    filterBtns.forEach((b) =>
      b.classList.toggle("is-active", b.dataset.filter === filter)
    );
  }

  function buildUsername(user, i) {
    const base = user?.login?.username
      ? user.login.username
      : `${user.name.first}${user.name.last}${String(2000 + i)}`;
    return "@" + base.replace(/\s+/g, "").toLowerCase();
  }

  function makeRunner(user, i) {
    const km = Math.floor(Math.random() * 160) + 40;
    const trophies = Math.floor(Math.random() * 18) + 1;
    const joinedDaysAgo = Math.floor(Math.random() * 120);

    return {
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now() + i),
      name: `${user.name.first} ${user.name.last}`,
      username: buildUsername(user, i),
      city: user.location?.city || "—",
      country: user.location?.country || "—",
      nat: user.nat || "",
      avatar: user.picture?.large || user.picture?.medium || "",
      km,
      trophies,
      joinedDaysAgo,
      score: km * 0.7 + trophies * 8,
      isNew: joinedDaysAgo <= 14,
    };
  }

  async function loadRunners() {
    const n = 24;
    if (status) status.textContent = "";
    grid.innerHTML = "";

    try {
      const url =
        "https://randomuser.me/api/?" +
        new URLSearchParams({
          results: String(n),
          inc: "name,location,picture,nat,login",
        });

      const res = await fetch(url);
      if (!res.ok) throw new Error("RandomUser error");
      const data = await res.json();

      runners = (data.results || []).map(makeRunner);
      render();
    } catch (err) {
      console.error(err);
      if (status) status.textContent = "No se pudieron cargar corredores.";
    }
  }

  function applyFilters(list) {
    const q = (searchInput?.value || "").trim().toLowerCase();
    let out = list;

    if (activeFilter === "top") {
      out = [...out].sort((a, b) => b.score - a.score).slice(0, 10);
    } else if (activeFilter === "new") {
      out = out.filter((r) => r.isNew);
    } else if (activeFilter === "near") {
      const myNat = out[0]?.nat || "";
      out = out.filter((r) => r.nat === myNat);
    }

    if (q) {
      out = out.filter((r) => {
        const hay =
          `${r.name} ${r.username} ${r.city} ${r.country} ${r.nat}`.toLowerCase();
        return hay.includes(q);
      });
    }

    return out;
  }

  function render() {
    const filtered = applyFilters(runners);

    if (!filtered.length) {
      grid.innerHTML = `<p style="opacity:.75">Sin resultados con esos filtros.</p>`;
      return;
    }

    grid.innerHTML = filtered
      .map(
        (r) => `
          <article class="runner-card">
            <div class="runner-card__top"></div>
            <div class="runner-card__body">
              <img class="runner-avatar" src="${esc(
                r.avatar
              )}" alt="Foto de ${esc(r.name)}" loading="lazy" />
              <h3 class="runner-name">${esc(r.name)}</h3>
              <p class="runner-handle">${esc(r.username)}</p>

              <div class="runner-stats">
                <span><i class="fa-solid fa-person-running" aria-hidden="true"></i> ${
                  r.km
                }k</span>
                <span><i class="fa-solid fa-trophy" aria-hidden="true"></i> ${
                  r.trophies
                }</span>
              </div>

              <button class="runner-btn" type="button" data-runner-id="${esc(
                r.id
              )}">Ver perfil</button>
            </div>
          </article>
        `
      )
      .join("");

    grid.querySelectorAll("[data-runner-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-runner-id");
        const runner = runners.find((x) => x.id === id);
        if (!runner) return;

        localStorage.setItem("nextrun_selected_runner", JSON.stringify(runner));
        window.location.href = "perfil.html";
      });
    });
  }

  searchInput?.addEventListener("input", render);

  filterBtns.forEach((b) => {
    b.addEventListener("click", () => {
      activeFilter = b.dataset.filter;
      setActiveChip(activeFilter);
      render();
    });
  });

  setActiveChip(activeFilter);
  loadRunners();
})();
