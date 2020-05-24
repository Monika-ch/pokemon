import React, { Component } from "react";
import Pokecard from "./Pokecard";

export default class CompletedSet extends Component {
  render() {
    console.log("In completedSet the card passed are;", this.props.pokemon);
    return (
      <div className="Pokedex-cards">
        {this.props.pokemon.map((pokemon) => (
          <div>
            <div>
              <Pokecard
                id={pokemon.id}
                name={pokemon.name}
                type={pokemon.type}
                exp={pokemon.base_experience}
                onClick={() => {}}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
