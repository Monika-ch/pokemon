import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Pokemons } from "./pokemon";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      pokemons: Pokemons,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
