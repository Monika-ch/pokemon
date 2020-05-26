import React, { Component } from "react";
import Pokecard from "./Pokecard";
import "../css/CompletedSet.css";

export default class CompletedSet extends Component {
  render() {
    return (
      <div className="Pokedex-cards">
        {this.props.pokemon
          .map((pokemon) => (
            <div>
              <div className="Border-Completed-Set">
                <Pokecard
                  id={pokemon.id}
                  name={pokemon.name}
                  type={pokemon.type}
                  exp={pokemon.base_experience}
                  onClick={() => {}}
                />
              </div>
            </div>
          ))
          .slice(0, 1)}
      </div>
    );
  }
}
