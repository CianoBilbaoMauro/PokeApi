const KEY = "equipos";

export function guardarEquipos(equipos) {
    localStorage.setItem(KEY, JSON.stringify(equipos));
}

export function obtenerEquipos() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
} 

export function eliminarEquipoStorage(nombreEquipo) {
    let equipos = obtenerEquipos();
    // Filtramos para dejar todos los equipos MENOS el que queremos borrar
    equipos = equipos.filter(e => e.nombreEquipo !== nombreEquipo);
    // Guardamos la nueva lista limpia
    localStorage.setItem("equipos", JSON.stringify(equipos));
}