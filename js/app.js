import PokemonTeam from "./PokemonTeam.js";
import { mostrarEquipos } from "./ui.js";
import { obtenerDetallePokemon } from "./api.js";
import { obtenerEquipos } from "./storage.js"; // Importamos tu lector de localStorage

async function iniciar() {
    try {
        // 1. Cargamos los 5 equipos precargados del JSON
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
        const datosStorage = obtenerEquipos(); // Esto ya nos devuelve un Array mapeado
        const equiposCreados = [];

        for (const item of datosStorage) {
            // Re-instanciamos como clase PokemonTeam por si el usuario necesita usar sus métodos
            equiposCreados.push(
                new PokemonTeam(
                    item.nombreEquipo,
                    item.entrenador,
                    item.region,
                    item.pokemons // Estos ya tienen sus detalles guardados de cuando se creó el equipo
                )
            );
        }

        // 3. Fusionamos ambos arrays usando el operador spread (...)
        const todosLosEquipos = [...equiposCargados, ...equiposCreados];

        // 4. Los mandamos a la interfaz para que dibuje todas las cards juntas
        mostrarEquipos(todosLosEquipos);

    } catch (error) {
        console.error("Error al iniciar la aplicación:", error);
    }
}

iniciar();