class PokemonCache {
  static cache = [];
  triggerDownload(maxPokemons) {
    this.getPokemonData(maxPokemons);
  }
  async getPokemonData(maxPokemons) {
    if (PokemonCache.cache.length != 0) return this.cache;

    const url = "https://pokeapi.co/api/v2/pokemon/";
    for (let i = 0; i < maxPokemons; i++) {
      await fetch(url + (i + 1).toString())
        .then((result) => result.json())
        .then((result) => {
          PokemonCache.cache.push(this.convertModel(result));
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return this.cache;
  }

  convertModel({ base_experience = 0, name, id, ...rest }) {
    return {
      base_experience: base_experience,
      name: name,
      id: id,
      type: rest.types[0].type.name,
    };
  }

  constructor(maxPokemons = 100) {
    this.triggerDownload(maxPokemons);
  }
}

export default PokemonCache;
