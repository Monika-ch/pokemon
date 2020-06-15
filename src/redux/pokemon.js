import * as ActionTypes from "./ActionTypes";

export const Pokemons = (
  state = { isLoading: true, errMess: null, pokemons: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POKEMON_DATA_LOADED:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        pokemons: state.pokemons,
      };

    case ActionTypes.POKEMON_LOADING:
      return { ...state, isLoading: true, errMess: null, pokemons: [] };

    case ActionTypes.POKEMON_LOADING_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.POKEMON_ADDED:
      return {
        ...state,
        isLoading: true,
        pokemons: state.pokemons.concat(action.payload),
      };
    default:
      return state;
  }
};
