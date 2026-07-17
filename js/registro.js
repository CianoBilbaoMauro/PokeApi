import { obtenerPokemons, obtenerDetallePokemon } from "./api.js";
import PokemonTeam from "./PokemonTeam.js";
import { guardarEquipos } from "./storage.js";

const select = document.querySelector("#pokemon");
let listaPokemon = [];

async function cargarPokemon() {
    try {
        listaPokemon = await obtenerPokemons();
        listaPokemon.forEach(p => {
            const option = document.createElement("option");
            option.value = p.url;
            option.textContent = p.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar la lista de Pokémon:", error);
    }
}

cargarPokemon();

document.querySelector("#formEquipo").addEventListener("submit", async (e) => {
    e.preventDefault();

    const seleccionados = [...select.selectedOptions];
    const pokemons = [];

    for (const option of seleccionados) {
        const detalle = await obtenerDetallePokemon(option.value);
        if (detalle) {
            pokemons.push(detalle); // Seguridad: solo agregamos si la API respondió bien
        }
    }

    const equipo = new PokemonTeam(
        document.querySelector("#nombreEquipo").value,
        document.querySelector("#entrenador").value,
        document.querySelector("#region").value,
        pokemons
    );

    // Recuperamos los equipos existentes o iniciamos un array vacío
    const equipos = JSON.parse(localStorage.getItem("equipos")) || [];
    equipos.push(equipo);

    // Guardamos usando tu función importada
    guardarEquipos(equipos);

    alert("Equipo creado");
    location.href = "index.html";
});