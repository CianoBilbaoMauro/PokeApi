export function mostrarEquipos(equipos) {
    const contenedor = document.querySelector("#contenedorEquipos");
    contenedor.innerHTML = "";

    equipos.forEach(equipo => {
        const card = document.createElement("article");
        card.className = "card";

        card.innerHTML = `
            <h2>${equipo.nombreEquipo}</h2>
            <p><strong>Entrenador:</strong> ${equipo.entrenador}</p>
            <p><strong>Región:</strong> ${equipo.region}</p>
            
            <h3>Pokémon</h3>
            
            ${equipo.pokemons.map(p => `
                <div class="pokemon">
                    <img src="${p.imagen}" alt="${p.nombre}">
                    <strong>${p.nombre}</strong>
                    <p>Tipo: ${p.tipo}</p>
                    <p>Altura: ${p.altura}</p>
                    <p>Peso: ${p.peso}</p>
                </div>
            `).join("")}
        `;

        contenedor.appendChild(card);
    });
}