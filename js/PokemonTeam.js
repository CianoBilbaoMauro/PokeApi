export default class PokemonTeam {
    constructor(nombreEquipo, entrenador, region, pokemons = []) {
        this.nombreEquipo = nombreEquipo;
        this.entrenador = entrenador;
        this.region = region;
        this.pokemons = pokemons;
    }

    agregarPokemon(pokemon) {
        this.pokemons.push(pokemon);
    }

    cantidadPokemons() {
        return this.pokemons.length;
    }
}