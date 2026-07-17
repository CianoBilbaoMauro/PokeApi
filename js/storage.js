const KEY = "equipos";

export function guardarEquipos(equipos) {
    localStorage.setItem(KEY, JSON.stringify(equipos));
}

export function obtenerEquipos() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}