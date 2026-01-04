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
