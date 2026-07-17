const URL = "https://pokeapi.co/api/v2/pokemon";

export async function obtenerPokemons(limite = 30) {
    try {
        const respuesta = await fetch(`${URL}?limit=${limite}`);
        const datos = await respuesta.json();
        return datos.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function obtenerDetallePokemon(url) {
    try {
        const respuesta = await fetch(url);
        const pokemon = await respuesta.json();

        return {
            nombre: pokemon.name,
            imagen: pokemon.sprites.front_default,
            tipo: pokemon.types[0].type.name,
            altura: pokemon.height,
            peso: pokemon.weight
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}