document.addEventListener("DOMContentLoaded", () => {
    
    if (document.getElementById('user-name')) {
        cargarUsuarioPrincipal();
        cargarAmigos();
        cargarGrafica();
    }
});

// 1. LLAMADA API: Usuario principal
// Documentación: https://randomuser.me/documentation
async function cargarUsuarioPrincipal() {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];

        //DATOS
        document.getElementById('user-name').textContent = `${user.name.first} ${user.name.last}`;
        document.getElementById('user-handle').textContent = `@${user.login.username}`;
        document.getElementById('user-avatar').src = user.picture.large;

    } catch (error) {
        console.error("Error cargando usuario:", error);
    }
}

// 2. LLAMADA API: Lista de "Otros usuarios" 
async function cargarAmigos() {
    try {
        //5 USUARIOS
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data = await response.json();
        const container = document.getElementById('friends-list');

        data.results.forEach(friend => {
            const img = document.createElement('img');
            img.src = friend.picture.medium;
            img.classList.add('friend-avatar');
            img.alt = friend.name.first;
            container.appendChild(img);
        });

    } catch (error) {
        console.error("Error cargando amigos:", error);
    }
}

// 3. LIBRERÍA: Chart.js 
function cargarGrafica() {
    const ctx = document.getElementById('activityChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
                datasets: [{
                    label: 'Km Corridos',
                    data: [5, 8, 3, 12, 6, 15, 10],
                    borderColor: '#e6ff2b',
                    backgroundColor: 'rgba(214, 242, 0, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    pointBackgroundColor: '#FFFFFF'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { ticks: { color: 'white' }, grid: { display: false } },
                    y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
                }
            }
        });
    }
}