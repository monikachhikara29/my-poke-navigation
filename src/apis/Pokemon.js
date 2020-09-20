export default class Pokemon {
  static async all(pageSize, offset) {
    return(fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`)
    .then(response => response.json())
    .then(async allpokemon => {
      let promises = allpokemon.results.map(async(pokemon) => {
        return await this.get(pokemon.url)
      });
      let newPokemons = await Promise.all(promises);
      return(newPokemons);
    }));
  }

  static get(url) {
    return(
      fetch(url)
        .then(response => response.json())
        .then(pokedata => pokedata)
    )
  }
}
