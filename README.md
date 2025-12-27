# DWA_PROYECTO_FINAL_WEBAPP_API

Proyecto web desarrollado como proyecto final de la asignatura Diseño Web Avanzado del Grado en Diseño Multimedia y Gráfico.

Nuestra propuesta consiste en el diseño y desarrollo de una WebApp centrada en el mundo del atletismo y el running, cuyo contenido se obtiene de APIs externas, permitiendo la visualización de eventos deportivos, estadísticas personales y la interacción entre usuarios.

## Descripción del proyecto

La aplicación web está orientada a corredores y aficionados al atletismo. A través del consumo de varias APIs deportivas, la web muestra información sobre eventos de running como maratones, medias maratones, cross y carreras populares como la de San Silvestre.

Cada usuario dispone de un perfil personal, desde el cual puede consultar sus marcas, estadísticas y datos biométricos asociados a las carreras en las que ha participado. Además, los usuarios pueden acceder a los perfiles de otros corredores, fomentando la interacción social dentro de la plataforma web.

El sistema realiza múltiples interacciones con la API, incluyendo:

- Listados de eventos deportivos.
- Visualización detallada de un evento (recorrido, mapa, distancia, ciudad, fecha).
- Consulta de estadísticas y datos asociados a los usuarios.

## Características principales

- Web temática centrada en atletismo y running.
- Listado dinámico de eventos deportivos (maratones, medias, cross, carreras populares).
- Visualización detallada de eventos con información ampliada (mapa, recorrido, distancia y localización).
- Perfiles de usuario con acceso a marcas personales y estadísticas deportivas.
- Visualización de datos biométricos asociados al rendimiento deportivo.
- Interacción entre usuarios y con los eventos deportivos.
- Posible integración con dispositivos de salud (relojes inteligentes, sensores deportivos).
- Integración de servicios externos como música o playlists para entrenamientos.
- Responsive Web Design: diseño responsive adaptable a cualquier dispositivo.
- Navegación dinámica controlada con JavaScript.
- Compatible con navegadores modernos.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Librerías externas de JavaScript: jQuery
- APIs externas para la obtención de datos deportivos

## APIs escogidas

- https://www.clubrunning.es/api/
- https://docs.gitlab.com/api/runners/
- **Música:**
  - Web: https://developers.deezer.com/api
  - API: https://api.deezer.com/version/service/id/method/?parameters
- **Usuarios:**
  - Web: https://randomuser.me/
  - API: https://randomuser.me/api/
- **Tiempo:**
  - Web: https://open-meteo.com/
  - API: https://api.open-meteo.com/v1/forecast
- **Rutas:**
  - Web: https://openrouteservice.org/dev/#/api-docs
  - API: https://api.openrouteservice.org/v2/directions/driving-car?api_key=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjNjYWFkZWQ5NDczODRmYjJiZDMwNTIxYmM3M2YzNDY3IiwiaCI6Im11cm11cjY0In0=

## Autores

- Jaime Amaya Sánchez
- José María Cancho Jiménez
- Alejandro Hernández Domínguez
- Micaela Noriega Meriño
- Aitor Ochoa Arrastio

## Instalación y uso

Clonar el repositorio:

```bash
git clone https://github.com/Jaimemamalla/DWA_PROYECTO_FINAL_WEBAPP_API
```

Abrir el archivo index.html en el navegador.
