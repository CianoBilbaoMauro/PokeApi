import PokemonTeam from "./PokemonTeam.js";
import { mostrarEquipos } from "./ui.js";
import { obtenerDetallePokemon } from "./api.js";
// SUMAMOS EL IMPORT DE LA FUNCIÓN PARA ELIMINAR
import { obtenerEquipos, eliminarEquipoStorage } from "./storage.js"; 

async function iniciar() {
    try {
        // 1. Cargamos los equipos precargados del JSON
        const respuesta = await fetch("./data/equipos.json");
        const datosJson = await respuesta.json();
        const equiposCargados = [];

        for (const item of datosJson) {
            const pokemons = [];
            for (const p of item.pokemons) {
                const detalle = await obtenerDetallePokemon(p.url);
                if (detalle) {
                    pokemons.push(detalle);
                }
            }
            equiposCargados.push(
                new PokemonTeam(
                    item.nombreEquipo,
                    item.entrenador,
                    item.region,
                    pokemons
                )
            );
        }

        // 2. Cargamos los equipos creados por el usuario desde localStorage
        const datosStorage = obtenerEquipos(); 
        const equiposCreados = [];

        for (const item of datosStorage) {
            equiposCreados.push(
                new PokemonTeam(
                    item.nombreEquipo,
                    item.entrenador,
                    item.region,
                    item.pokemons 
                )
            );
        }

        // 3. Fusionamos ambos arrays usando el operador spread (...)
        const todosLosEquipos = [...equiposCargados, ...equiposCreados];

        // 4. Los mandamos a la interfaz para que dibuje todas las cards juntas
        mostrarEquipos(todosLosEquipos);

        // 5. ESCUCHAMOS EL CLIC EN EL BOTÓN DE ELIMINAR
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-eliminar")) {
                const nombreAEliminar = e.target.dataset.nombre;
                
                if (confirm(`¿Estás seguro de que querés eliminar el ${nombreAEliminar}?`)) {
                    eliminarEquipoStorage(nombreAEliminar); // Lo saca del storage
                    window.location.reload(); // Recarga para limpiar la pantalla
                }
            }
        });

    } catch (error) {
        console.error("Error al iniciar la aplicación:", error);
    }
}

iniciar();