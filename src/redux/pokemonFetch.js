import * as ActionTypes from "./ActionTypes";

const maxPokemons = 100;

export const getPokemonData = () => async (dispatch) => {
  dispatch(onLoadingStarted());
  const url = "https://pokeapi.co/api/v2/pokemon/";
  for (let i = 0; i < maxPokemons; i++) {
    try {
      let result = await fetch(url + (i + 1).toString());
      let jsonDataFromServer = await result.json();
      dispatch(addPokemon(convertModel(jsonDataFromServer)));
    } catch (err) {
      console.error(err);
      dispatch(onError(err));
    }
  }
  dispatch(pokemonLoaded());
};

export const addPokemon = (pokemon) => ({
  type: ActionTypes.POKEMON_ADDED,
  payload: pokemon,
});

export const onError = (error) => ({
  type: ActionTypes.POKEMON_LOADING_FAILED,
  payload: error,
});

export const onLoadingStarted = () => ({
  type: ActionTypes.POKEMON_LOADING,
  payload: null,
});

export const pokemonLoaded = () => ({
  type: ActionTypes.POKEMON_DATA_LOADED,
  payload: null,
});

function convertModel({ base_experience = 0, name, id, ...rest }) {
  return {
    base_experience: base_experience,
    name: name,
    id: id,
    type: rest.types[0].type.name,
  };
}
