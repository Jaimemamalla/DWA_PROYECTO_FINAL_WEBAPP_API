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

// SECCIÓN CORREDORES
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

  // ====== FOLLOW STATE (localStorage) ======
  const FOLLOW_KEY = "nextrun_following";
  const getFollowing = () =>
    new Set(JSON.parse(localStorage.getItem(FOLLOW_KEY) || "[]"));
  const saveFollowing = (set) =>
    localStorage.setItem(FOLLOW_KEY, JSON.stringify([...set]));

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
    const following = getFollowing();

    if (!filtered.length) {
      grid.innerHTML = `<p style="opacity:.75">Sin resultados con esos filtros.</p>`;
      return;
    }

    grid.innerHTML = filtered
      .map((r) => {
        const isFollowing = following.has(r.id);
        return `
          <article class="runner-card" data-runner-card="${esc(r.id)}">
            <button
              class="runner-follow ${isFollowing ? "is-following" : ""}"
              type="button"
              data-follow-id="${esc(r.id)}"
              aria-pressed="${isFollowing ? "true" : "false"}"
            >
              ${isFollowing ? "✓" : "Seguir"}
            </button>

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
        `;
      })
      .join("");

    grid.onclick = (e) => {
      const followBtn = e.target.closest("[data-follow-id]");
      if (followBtn) {
        const id = followBtn.getAttribute("data-follow-id");
        if (!id) return;

        const set = getFollowing();
        if (set.has(id)) set.delete(id);
        else set.add(id);

        saveFollowing(set);

        const nowFollowing = set.has(id);
        followBtn.classList.toggle("is-following", nowFollowing);
        followBtn.textContent = nowFollowing ? "✓" : "Seguir";
        followBtn.setAttribute("aria-pressed", nowFollowing ? "true" : "false");
        return;
      }

      const profileBtn = e.target.closest("[data-runner-id]");
      if (profileBtn) {
        const id = profileBtn.getAttribute("data-runner-id");
        const runner = runners.find((x) => x.id === id);
        if (!runner) return;

        localStorage.setItem("nextrun_selected_runner", JSON.stringify(runner));
        window.location.href = "perfil.html";
      }
    };
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

//PERFIL

(function () {
  const ctxActivity = document.getElementById("activityChart");
  if (!ctxActivity) return;

  console.log("Iniciando Dashboard de Perfil...");

  function loadUserProfile() {
    let user = JSON.parse(localStorage.getItem("nextrun_user"));
    const selectedRunner = JSON.parse(
      localStorage.getItem("nextrun_selected_runner")
    );

    let isOwnProfile = true;

    if (selectedRunner) {
      user = {
        fullname: selectedRunner.name,
        username: selectedRunner.username,
        img: selectedRunner.avatar,
      };
      isOwnProfile = false;
      localStorage.removeItem("nextrun_selected_runner");
    } else if (!user) {
      user = {
        fullname: "Jaime Amaya",
        username: "@jaime_runner",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
      };
    } else {
      if (!user.img)
        user.img =
          "https://ui-avatars.com/api/?name=" +
          user.fullname +
          "&background=0b4650&color=fff";
      user.username = "@" + user.fullname.replace(/\s+/g, "").toLowerCase();
    }

    const sidebarHTML = `
           <img src="${user.img}" alt="Foto de perfil">
           <h3>${user.fullname}</h3>
           <p>${user.username || "Runner"}</p>
       `;
    document.getElementById("sidebar-user-info").innerHTML = sidebarHTML;

    const firstName = user.fullname.split(" ")[0];
    document.getElementById("welcome-msg").textContent = isOwnProfile
      ? `Hola de nuevo, ${firstName}`
      : `Perfil de ${firstName}`;

    document.getElementById("deezer-widget").innerHTML = `
           <iframe title="deezer-widget" src="https://widget.deezer.com/widget/dark/playlist/1479458365" width="100%" height="150" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>
       `;
  }

  function initCharts() {
    const colorSecondary = "#0b4650";
    const colorPrimary = "#e6ff2b";

    new Chart(ctxActivity, {
      type: "bar",
      data: {
        labels: ["L", "M", "X", "J", "V", "S", "D"],
        datasets: [
          {
            label: "Km recorridos",
            data: [5, 8, 3, 12, 6, 15, 4],
            backgroundColor: colorSecondary,
            hoverBackgroundColor: colorPrimary,
            borderRadius: 6,
            barThickness: "flex",
            maxBarThickness: 30,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#f0f0f0" },
            border: { display: false },
          },
          x: {
            grid: { display: false },
            border: { display: false },
          },
        },
      },
    });

    const ctxGoal = document.getElementById("goalChart");
    if (ctxGoal) {
      new Chart(ctxGoal, {
        type: "doughnut",
        data: {
          labels: ["Completado", "Restante"],
          datasets: [
            {
              data: [57, 43],
              backgroundColor: [colorPrimary, "#e0e0e0"],
              borderWidth: 0,
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "80%",
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },
        },
      });
    }
  }

  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      if (confirm("¿Cerrar sesión?")) {
        localStorage.removeItem("nextrun_user");
        window.location.href = "index.html";
      }
    });
  }

  loadUserProfile();
  initCharts();
})();

$(document).ready(function () {
  // 1. Perfil API
  fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((data) => {
      const user = data.results[0];
      $("#api-avatar").attr("src", user.picture.large);
      $("#api-name").text(`${user.name.first} ${user.name.last}`);
      $("#api-username").text(`@${user.login.username}`);
      $("#user-greeting").text(user.name.first);
    });

  // 2. Inicializar Gráficos
  initCharts();

  // 3. Calendario
  for (let i = 1; i <= 31; i++) {
    let clase = i === 12 || i === 25 ? "race-day" : "";
    $("#calendar-days").append(`<span class="${clase}">${i}</span>`);
  }
});

function initCharts() {
  // Barras Semanales
  new Chart(document.getElementById("weeklyBarChart"), {
    type: "bar",
    data: {
      labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"],
      datasets: [
        {
          data: [5.2, 8.1, 0, 10.5, 6.2, 15.0, 4.0],
          backgroundColor: (ctx) => (ctx.index === 5 ? "#d4f14e" : "#444"),
          borderRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: "#333" }, ticks: { color: "#888" } },
        x: { grid: { display: false }, ticks: { color: "#888" } },
      },
    },
  });

  // Doughnut Hoy
  new Chart(document.getElementById("todayDoughnut"), {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [75, 25],
          backgroundColor: ["#d4f14e", "#333"],
          borderWidth: 0,
          cutout: "85%",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { tooltip: { enabled: false } },
    },
  });
}

$(document).ready(function () {
  // 1. Datos API Perfil
  fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((data) => {
      const user = data.results[0];
      $("#api-avatar").attr("src", user.picture.large);
      $("#api-name").text(`${user.name.first} ${user.name.last}`);
      $("#api-username").text(`@${user.login.username}`);
      // Mantenemos tu nombre si lo prefieres, o usamos el de la API
      $("#user-greeting").text(user.name.first);
    });

  // 2. Gráficos
  initDashboardCharts();

  // 3. Calendario
  const cal = $("#calendar-days");
  for (let i = 1; i <= 31; i++) {
    cal.append(`<span>${i}</span>`);
  }
});

function initDashboardCharts() {
  // Barras Semanales
  new Chart(document.getElementById("weeklyBarChart"), {
    type: "bar",
    data: {
      labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"],
      datasets: [
        {
          data: [5, 8, 0, 10.5, 6, 15, 4],
          backgroundColor: (ctx) => (ctx.index === 5 ? "#d4f14e" : "#333"),
          borderRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: "#222" }, ticks: { color: "#555" } },
        x: { grid: { display: false }, ticks: { color: "#555" } },
      },
    },
  });

  // Círculo Actividad
  new Chart(document.getElementById("todayDoughnut"), {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [75, 25],
          backgroundColor: ["#d4f14e", "#222"],
          borderWidth: 0,
          cutout: "85%",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { tooltip: { enabled: false } },
    },
  });
}

// ... (código de API y calendario igual) ...

function initDashboardCharts() {
  // Barras Semanales
  new Chart(document.getElementById("weeklyBarChart"), {
    type: "bar",
    data: {
      labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"],
      datasets: [
        {
          data: [5, 8, 0, 10.5, 6, 15, 4],
          backgroundColor: (ctx) => (ctx.index === 5 ? "#d4f14e" : "#333"),
          borderRadius: 6, // Bordes más redondeados
          barThickness: "flex", // Ancho de barra flexible
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // ¡CRUCIAL! Llenará el espacio
      plugins: { legend: { display: false } },
      scales: {
        y: { display: false }, // Ocultamos eje Y para más limpieza
        x: {
          grid: { display: false },
          ticks: { color: "#666", font: { size: 11 } },
        },
      },
      layout: { padding: { top: 10 } }, // Un poco de aire arriba
    },
  });

  // Círculo Actividad (Sin cambios)
  new Chart(document.getElementById("todayDoughnut"), {
    type: "doughnut",
    data: {
      /* ... */
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { tooltip: { enabled: false } },
      cutout: "85%",
    },
  });
}

// Marcas

$(document).ready(function () {
  // 1. Consumo de API para el perfil
  fetch("https://randomuser.me/api/")
    .then((response) => response.json())
    .then((data) => {
      const user = data.results[0];
      // Actualizamos la sidebar con datos reales de la API
      $(".avatar-circle")
        .css("background-image", `url(${user.picture.large})`)
        .css("background-size", "cover");
      // Mantenemos el nombre de Aitor si prefieres, o usamos el de la API:
      // $('.profile-top h2').text(`${user.name.first} ${user.name.last}`);
    });

  // 2. Efecto Hover dinámico en los retos
  $(".card-challenge").hover(
    function () {
      $(this).css(
        "border",
        `1px solid ${getComputedStyle(
          document.documentElement
        ).getPropertyValue("--accent")}`
      );
    },
    function () {
      $(this).css("border", "1px solid transparent");
    }
  );

  // 3. Generación simple de calendario para visualización
  const calendarGrid = $(".calendar-grid");
  for (let i = 1; i <= 31; i++) {
    calendarGrid.append(`<span>${i}</span>`);
  }
});

// SECCIÓN EVENTOS

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script cargado correctamente");

  // Ejecutar solo en eventos.html
  const isEventosPage = (location.pathname || "")
    .toLowerCase()
    .includes("eventos");
  if (!isEventosPage) return;

  // ============================================================
  // (A) EVENTOS (ARRIBA): grid + filtros + buscador + modal
  // ============================================================

  const eventsGrid = document.getElementById("eventsGrid");
  const eventsCount = document.getElementById("eventsCount");
  const eventsEmpty = document.getElementById("eventsEmpty");

  const searchInput = document.getElementById("eventsSearch");
  const typeWrap = document.getElementById("typeFilters");
  const cityWrap = document.getElementById("cityFilters");

  // Modal
  const modal = document.getElementById("eventModal");
  const closeModalBtn = document.getElementById("closeEventModal");
  const modalTitle = document.getElementById("eventModalTitle");
  const modalMeta = document.getElementById("eventModalMeta");
  const modalDetails = document.getElementById("eventModalDetails");
  const modalPrice = document.getElementById("eventModalPrice");
  const signupBtn = document.getElementById("eventSignupBtn");
  const signupToast = document.getElementById("signupToast");

  // Guard: si no existe el bloque de eventos aún, no rompe
  if (!eventsGrid || !searchInput || !typeWrap || !cityWrap) {
    console.warn(
      "[NextRun] Faltan IDs de EVENTOS (eventsGrid/eventsSearch/typeFilters/cityFilters)."
    );
    return;
  }

  // Data mock (inventada, está bien)
  const eventsData = [
    {
      id: "ev-1",
      title: "Maratón Popular 2026",
      type: "Maratón",
      city: "Madrid",
      dateISO: "2026-04-24",
      place: "Alcobendas, Madrid",
      distanceKm: 42.195,
      elevationM: 320,
      aidStations: 8,
      recommended: "Zapatillas mixtas (asfalto)",
      priceEUR: 35,
      details:
        "Recorrido urbano con tramos rápidos. Avituallamiento cada 5 km. Categorías por edad. Guardarropa disponible.",
      image: "media/eventos/maratonvale.png",
    },
    {
      id: "ev-2",
      title: "Media Maratón Ciudad",
      type: "Media Maratón",
      city: "Madrid",
      dateISO: "2026-05-10",
      place: "Centro, Madrid",
      distanceKm: 21.097,
      elevationM: 180,
      aidStations: 5,
      recommended: "Zapatillas de asfalto (ligeras)",
      priceEUR: 22,
      details:
        "Circuito homologado. Cajones por ritmo. Puestos de hidratación y geles.",
      image: "media/eventos/maratoncentro.jpg",
    },
    {
      id: "ev-3",
      title: "Cross Sierra",
      type: "Cross",
      city: "Sevilla",
      dateISO: "2026-03-15",
      place: "Parque Natural",
      distanceKm: 12,
      elevationM: 420,
      aidStations: 2,
      recommended: "Trail / tacos",
      priceEUR: 18,
      details:
        "Terreno mixto con desnivel. Recomendable trail. Tiempo límite 2h.",
      image: "media/eventos/maratonpopu.png",
    },
    {
      id: "ev-4",
      title: "10K Nocturna Valencia",
      type: "10K",
      city: "Valencia",
      dateISO: "2026-06-08",
      place: "Valencia (Centro)",
      distanceKm: 10,
      elevationM: 40,
      aidStations: 2,
      recommended: "Asfalto (reactivas)",
      priceEUR: 15,
      details:
        "Carrera nocturna con ambiente y música. Circuito rápido, ideal para marca personal.",
      image: "media/eventos/maratonpopu.jpg",
    },
    {
      id: "ev-5",
      title: "5K Popular Barcelona",
      type: "5K",
      city: "Barcelona",
      dateISO: "2026-02-02",
      place: "Barcelona (Parc de la Ciutadella)",
      distanceKm: 5,
      elevationM: 20,
      aidStations: 1,
      recommended: "Asfalto (ligeras)",
      priceEUR: 10,
      details:
        "Carrera corta para todos los niveles. Perfecta para principiantes o para hacer series.",
      image: "media/eventos/maratonbarce.png",
    },
    {
      id: "ev-6",
      title: "Media Maratón Sevilla Río",
      type: "Media Maratón",
      city: "Sevilla",
      dateISO: "2026-03-22",
      place: "Sevilla (Triana)",
      distanceKm: 21.097,
      elevationM: 110,
      aidStations: 5,
      recommended: "Asfalto (mixtas)",
      priceEUR: 20,
      details:
        "Recorrido llano bordeando el río. Cajones por ritmo y avituallamiento cada 5 km.",
      image: "media/eventos/maratonpopu.png",
    },
    {
      id: "ev-7",
      title: "Maratón Barcelona 2026",
      type: "Maratón",
      city: "Barcelona",
      dateISO: "2026-04-12",
      place: "Barcelona (Salida en Plaça Catalunya)",
      distanceKm: 42.195,
      elevationM: 260,
      aidStations: 9,
      recommended: "Asfalto (rodadoras)",
      priceEUR: 45,
      details:
        "Maratón urbano con tramos turísticos. Puntos de hidratación y geles. Guardarropa disponible.",
      image: "media/eventos/maratonpopu.png",
    },
    {
      id: "ev-8",
      title: "Maratón Madrid Río",
      type: "Maratón",
      city: "Madrid",
      dateISO: "2026-04-05",
      place: "Madrid Río · Casa de Campo",
      distanceKm: 42.195,
      elevationM: 280,
      aidStations: 9,
      recommended: "Asfalto (rodadoras)",
      priceEUR: 42,
      details:
        "Recorrido urbano bordeando el río Manzanares. Tramos verdes y rápidos.",
      image: "media/eventos/maratonrio.jpg",
    },
    {
      id: "ev-9",
      title: "Maratón Castellana",
      type: "Maratón",
      city: "Madrid",
      dateISO: "2026-05-17",
      place: "Paseo de la Castellana",
      distanceKm: 42.195,
      elevationM: 310,
      aidStations: 8,
      recommended: "Asfalto (mixtas)",
      priceEUR: 40,
      details: "Maratón urbano atravesando el eje norte-sur de Madrid.",
      image: "media/eventos/maratoncaste.webp",
    },
  ];

  let activeType = "all";
  let activeCity = "Madrid";
  let selectedEvent = null;

  const esc = (s) =>
    String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  function formatDateES(iso) {
    const [y, m, d] = String(iso)
      .split("-")
      .map((x) => parseInt(x, 10));
    if (!y || !m || !d) return iso;
    const date = new Date(y, m - 1, d);
    const opts = { day: "2-digit", month: "short" };
    const dayMonth = date.toLocaleDateString("es-ES", opts).replace(".", "");
    return `${dayMonth} · ${y}`;
  }

  function setActiveBtn(container, selector, btn) {
    container
      .querySelectorAll(selector)
      .forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  }

  function applyEventsFilters(list) {
    const q = (searchInput?.value || "").trim().toLowerCase();
    let out = [...list];

    if (activeType !== "all") out = out.filter((e) => e.type === activeType);
    if (activeCity !== "all") out = out.filter((e) => e.city === activeCity);

    if (q) {
      out = out.filter((e) => {
        const hay =
          `${e.title} ${e.type} ${e.city} ${e.place} ${e.dateISO}`.toLowerCase();
        return hay.includes(q);
      });
    }

    return out;
  }

  function renderEvents() {
    const filtered = applyEventsFilters(eventsData);

    if (eventsCount) eventsCount.textContent = ``;

    if (!filtered.length) {
      eventsGrid.innerHTML = "";
      if (eventsEmpty) eventsEmpty.hidden = false;
      return;
    }
    if (eventsEmpty) eventsEmpty.hidden = true;

    eventsGrid.innerHTML = filtered
      .map(
        (e) => `
        <article class="event-card" data-event-id="${esc(e.id)}">
          <div class="event-card__top">${esc(formatDateES(e.dateISO))} · ${esc(
          e.place
        )}</div>
          <div class="event-card__body">
            <h3 class="event-card__name">${esc(e.title)}</h3>
            <p class="event-card__meta">${esc(e.type)} · ${esc(e.city)}</p>

            <div class="event-card__actions">
              <button class="event-btn event-btn--primary" type="button" data-action="details">
                Detalles
              </button>
            </div>
          </div>
        </article>
      `
      )
      .join("");
  }

  function openEventModal(ev) {
    selectedEvent = ev;
    const modalImg = document.getElementById("eventModalImg");
    if (modalImg) {
      modalImg.src = ev.image || "media/img/eventos/placeholder.jpg";
      modalImg.alt = ev.title ? `Imagen de ${ev.title}` : "Imagen del evento";
    }

    if (modalTitle) modalTitle.textContent = ev.title;
    if (modalMeta)
      modalMeta.textContent = `${formatDateES(ev.dateISO)} · ${ev.place}`;

    if (modalDetails) {
      modalDetails.innerHTML = `
        <p><strong>Distancia:</strong> ${esc(ev.distanceKm)} km</p>
        <p><strong>Desnivel:</strong> ${esc(ev.elevationM)} m</p>
        <p><strong>Avituallamiento:</strong> ${esc(ev.aidStations)} puntos</p>
        <p><strong>Recomendación:</strong> ${esc(ev.recommended)}</p>
        <p style="margin-top:12px; opacity:.9">${esc(ev.details)}</p>
      `;
    }

    if (modalPrice) modalPrice.textContent = `${ev.priceEUR}€`;

    if (signupBtn) {
      signupBtn.disabled = false;
      signupBtn.textContent = "Inscribirse";
    }

    // ✅ Soporta <dialog> o modal con clase
    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
    } else if (modal) {
      modal.classList.add("is-open");
      modal.removeAttribute("hidden");
    }
  }

  function closeEventModal() {
    if (!modal) return;

    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.classList.remove("is-open");
      modal.setAttribute("hidden", "true");
    }
  }

  closeModalBtn?.addEventListener("click", closeEventModal);

  // Cerrar clic fuera (solo si es <dialog>)
  modal?.addEventListener("click", (e) => {
    if (!modal || typeof modal.close !== "function") return;

    const rect = modal.getBoundingClientRect();
    const clickOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;
    if (clickOutside) closeEventModal();
  });

  function showToastAndRedirect() {
    if (!signupToast) return;
    signupToast.hidden = false;
    window.setTimeout(() => (window.location.href = "index.html"), 1500);
  }

  signupBtn?.addEventListener("click", () => {
    if (!selectedEvent || !signupBtn) return;

    signupBtn.disabled = true;
    signupBtn.textContent = "Procesando...";

    window.setTimeout(() => {
      closeEventModal();
      showToastAndRedirect();
    }, 3000);
  });

  typeWrap.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-type]");
    if (!btn) return;
    activeType = btn.dataset.type;
    setActiveBtn(typeWrap, "button[data-type]", btn);
    renderEvents();
  });

  cityWrap.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-city]");
    if (!btn) return;
    activeCity = btn.dataset.city;
    setActiveBtn(cityWrap, "button[data-city]", btn);
    renderEvents();
  });

  searchInput.addEventListener("input", renderEvents);

  eventsGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const card = btn.closest("[data-event-id]");
    if (!card) return;

    const id = card.getAttribute("data-event-id");
    const ev = eventsData.find((x) => x.id === id);
    if (!ev) return;

    if (btn.getAttribute("data-action") === "details") openEventModal(ev);
  });

  // ✅ Init chips activos coherentes con tu estado
  const initTypeBtn = typeWrap.querySelector('button[data-type="all"]');
  if (initTypeBtn) setActiveBtn(typeWrap, "button[data-type]", initTypeBtn);

  const initCityBtn =
    cityWrap.querySelector(`button[data-city="${activeCity}"]`) ||
    cityWrap.querySelector('button[data-city="all"]');
  if (initCityBtn) setActiveBtn(cityWrap, "button[data-city]", initCityBtn);

  renderEvents();

  // ============================================================
  // RESULTADOS (ABAJO): podio + tabla + tabs

  const runnersData = [
    {
      pos: 1,
      dorsal: 7,
      nombre: "Levy",
      apellidos: "Kibet Chematot",
      tiempo: "01:00:45",
      neto: "01:00:45",
      nacionalidad: "Kenia",
      flag: "https://flagcdn.com/ke.svg",
      club: "Adidas",
      categoria: "Media Maratón",
      ciudad: "Madrid",
    },
    {
      pos: 2,
      dorsal: 12,
      nombre: "Titus",
      apellidos: "Kiprotich Kibet",
      tiempo: "01:00:48",
      neto: "01:00:48",
      nacionalidad: "Kenia",
      flag: "https://flagcdn.com/ke.svg",
      club: "N/A",
      categoria: "Media Maratón",
      ciudad: "Madrid",
    },
    {
      pos: 3,
      dorsal: 3,
      nombre: "Daniel",
      apellidos: "Sinda",
      tiempo: "01:01:04",
      neto: "01:01:04",
      nacionalidad: "Tailandia",
      flag: "https://flagcdn.com/th.svg",
      club: "Nike",
      categoria: "Media Maratón",
      ciudad: "Madrid",
    },
  ];

  const tableBody = document.getElementById("runners-table-body");
  const podiumContainer = document.getElementById("podium-container");

  function renderResults(data) {
    if (!tableBody || !podiumContainer) return;

    tableBody.innerHTML = "";
    podiumContainer.innerHTML = "";

    data.forEach((r) => {
      tableBody.innerHTML += `
        <tr>
          <td><strong>${r.pos}</strong></td>
          <td>${r.dorsal}</td>
          <td>${r.nombre}</td>
          <td>${r.apellidos}</td>
          <td>${r.tiempo}</td>
          <td>${r.neto}</td>
          <td><img src="${r.flag}" width="20" alt="Bandera ${r.nacionalidad}"> ${r.nacionalidad}</td>
          <td>${r.club}</td>
        </tr>`;

      if (r.pos <= 3) {
        podiumContainer.innerHTML += `
          <div class="podium-card">
            <div class="pos">${r.pos}</div>
            <div>
              <span class="name"><strong>${r.nombre} ${r.apellidos}</strong></span><br>
              <small class="club">${r.club}</small>
              <div class="time">⏱ ${r.tiempo}</div>
            </div>
          </div>`;
      }
    });
  }

  // Tabs SOLO de resultados
  const resultTabs = document.querySelectorAll(".board__tabs .tab");

  resultTabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      resultTabs.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderResults(runnersData);
    });
  });

  renderResults(runnersData);
});
