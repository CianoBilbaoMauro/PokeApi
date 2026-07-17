export function mostrarEquipos(equipos) {
    const contenedor = document.querySelector("#contenedorEquipos");
    contenedor.innerHTML = "";

    // Lista de los 8 nombres fijos del JSON que NO se pueden borrar
    const equiposFijos = [
        "Equipo Aurora", "Equipo Fuego", "Equipo Naturaleza", "Equipo Tormenta",
        "Equipo Leyenda", "Equipo Rival", "Equipo Místico", "Equipo Dragón"
    ];

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

        // SI EL EQUIPO NO ES UNO DE LOS 8 FIJOS, LE AGREGAMOS EL BOTÓN NEÓN DE ELIMINAR
        if (!equiposFijos.includes(equipo.nombreEquipo)) {
            card.innerHTML += `
        <button class="btn-eliminar" data-nombre="${equipo.nombreEquipo}" 
            style="background: #222227; 
                   color: #ff0055; 
                   border: 1px solid rgba(255, 0, 85, 0.4); 
                   padding: 10px; 
                   cursor: pointer; 
                   margin-top: 20px; 
                   width: 100%; 
                   border-radius: 8px; 
                   font-family: 'Orbitron', sans-serif; 
                   font-weight: bold; 
                   font-size: 0.85rem; 
                   letter-spacing: 1px; 
                   text-transform: uppercase; 
                   transition: all 0.3s ease; 
                   box-shadow: 0 0 10px rgba(255, 0, 85, 0.1);">
            Eliminar Equipo
        </button>
    `;
        }

        contenedor.appendChild(card);
    });
}