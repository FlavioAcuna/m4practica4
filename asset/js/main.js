document.addEventListener("DOMContentLoaded", () => {
  // Obtener referencias a los contenedores por sección
  const contenedorPersonaje1 = document.getElementById("contenedorPersonaje1");
  const contenedorPersonaje2 = document.getElementById("contenedorPersonaje2");
  const contenedorPersonaje3 = document.getElementById("contenedorPersonaje3");

  // Definir los rangos de personajes
  const rangos = {
    "rango-1-5": [1, 2, 3, 4, 5],
    "rango-6-11": [6, 7, 8, 9, 10],
    "rango-12-17": [12, 13, 14, 15, 16],
  };

  // Obtener datos de un personaje desde la API
  const consultarPersonaje = async (id) => {
    try {
      const respuesta = await fetch(`https://swapi.dev/api/people/${id}/`);
      if (!respuesta.ok) throw new Error("Error de conexión en la API");
      const element = await respuesta.json();
      return {
        nombre: element.name || "Desconocido",
        altura: element.height !== "unknown" ? element.height : "N/A",
        peso: element.mass !== "unknown" ? element.mass : "N/A",
      };
    } catch (error) {
      console.error("Error: ", error);
      return null;
    }
  };

  // Mostrar los datos de los personajes en el contenedor adecuado
  const mostrarPersonajes = async (rango, contenedor, iconClass) => {
    // Verificar si los datos ya se han cargado
    if (contenedor.classList.contains('datos-cargados')) return;

    // Obtener los elementos hijos del contenedor
    const hijos = Array.from(contenedor.children);
    // Mantener el primer elemento en el contenedor
    const primerElemento = hijos[0];
    
    // Limpiar el contenedor pero mantener el primer elemento
    contenedor.innerHTML = "";
    contenedor.appendChild(primerElemento);

    for (const id of rango) {
      const datosPersonaje = await consultarPersonaje(id);
      if (datosPersonaje) {
        // Crear el HTML para mostrar los datos del personaje
        const personajeHTML = `
          <div class="col-12 col-md-6 col-lg-4">
            <div class="single-timeline-content d-flex">
              <div class="timeline-icon ${iconClass}">
                <i class="fa fa-address-card" aria-hidden="true"></i>
              </div>
              <div class="timeline-text">
                <h6>${datosPersonaje.nombre}</h6>
                <p>Altura: ${datosPersonaje.altura} cm</p>
                <p>Peso: ${datosPersonaje.peso} kg</p>
              </div>
            </div>
          </div>
        `;
        // Insertar el HTML en el contenedor
        contenedor.innerHTML += personajeHTML;
      }
    }

    // Marcar como cargado para evitar duplicaciones
    contenedor.classList.add('datos-cargados');
  };

  // Asignar el evento 'mouseenter' a cada rango
  document.getElementById("firstElement").addEventListener("mouseenter", () => {
    mostrarPersonajes(rangos["rango-1-5"], contenedorPersonaje1, "timeline-icon");
  });

  document.getElementById("secondElement").addEventListener("mouseenter", () => {
    mostrarPersonajes(rangos["rango-6-11"], contenedorPersonaje2, "timeline-icon-green");
  });

  document.getElementById("thirdElement").addEventListener("mouseenter", () => {
    mostrarPersonajes(rangos["rango-12-17"], contenedorPersonaje3, "timeline-icon-blue");
  });
});
