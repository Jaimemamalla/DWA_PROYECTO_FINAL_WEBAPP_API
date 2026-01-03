document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("user-name")) {
    gestionarUsuarios();
    cargarGrafica();
  }
});

// LLAMADA API: Usuario principal
// Documentación: https://randomuser.me/documentation
async function gestionarUsuarios() {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?results=20&nat=es,fr,de,gb,it,nl,ie,ch,no,fi,dk"
    );
    const data = await response.json();

    //DATOS
    const usuariosValidos = data.results.filter(
      (user) => user.dob.age >= 18 && user.dob.age <= 60
    );

    if (usuariosValidos.length < 6) return;

    const user = usuariosValidos[0];
    document.getElementById(
      "user-name"
    ).textContent = `${user.name.first} ${user.name.last}`;
    document.getElementById(
      "user-handle"
    ).textContent = `@${user.login.username}`;
    document.getElementById("user-avatar").src = user.picture.large;

    const container = document.getElementById("friends-list");
    const amigos = usuariosValidos.slice(1, 6);

    amigos.forEach((friend) => {
      const img = document.createElement("img");
      img.src = friend.picture.medium;
      img.classList.add("friend-avatar");
      img.alt = friend.name.first;
      container.appendChild(img);
    });
  } catch (error) {
    console.error(error);
  }
}

// LIBRERÍA: Chart.js
function cargarGrafica() {
  const ctx = document.getElementById("activityChart");
  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
        datasets: [
          {
            label: "Kilómetros recorridos",
            data: [5, 8, 3, 12, 6, 15, 10],
            borderColor: "#e6ff2b",
            backgroundColor: "rgba(214, 242, 0, 0.2)",
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: "#FFFFFF",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { ticks: { color: "white" }, grid: { display: false } },
          y: {
            ticks: { color: "white" },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
        },
      },
    });
  }
}

/* METIDO POR ALE */
$(document).ready(function () {
  // Al hacer clic en un elemento del menú
  $(".nav-item").on("click", function () {
    // 1. Eliminar la clase 'active' de todos los elementos
    $(".nav-item").removeClass("active");

    // 2. Añadir la clase 'active' al elemento clicado
    $(this).addClass("active");

    // 3. Obtener la sección para cargar contenido dinámico (opcional)
    const section = $(this).data("section");
    console.log("Cargando sección: " + section);

    // Aquí podrías añadir la lógica para mostrar/ocultar tus contenedores de la API
  });
});
