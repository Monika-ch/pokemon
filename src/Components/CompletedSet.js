import React, { Component } from "react";
import "../css/CompletedSet.css";

// This function takes an array of pokemons
// and return an array where its guaranteed that there will be only one pokemon per type
// for eg [{fire}, {fire}, {water}]
// return [{fire}, {water}]
function getOnePerType(pokemonArray) {
  var dictionary = new Map(
    pokemonArray.map((pokemon) => [pokemon.type, pokemon])
  );
  return Array.from(dictionary.values());
}

export default class CompletedSet extends Component {
  render() {
    return (
      <div className="CompletedSet-wrapper">
        {getOnePerType(this.props.pokemon).map((pokemon) => (
          <div className="CompletedSet">
            <div className="CompletedSet-content">
              <div id={pokemon.id}>{pokemon.type}</div> <br />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
