import React, { Component } from "react";
import Pokecard from "./Pokecard";

class Pokedex extends Component {
  render() {
    return (
      <div className="Pokedex">
        {/* {title} */}
        {/* {playerName} */}
        <div className="Pokedex-cards">
          {this.props.pokemon.map((p) => (
            <Pokecard
              id={p.id}
              name={p.name}
              type={p.type}
              exp={p.base_experience}
              onClick={this.props.onClick}
              usedAs={
                this.props.isComputer ? "ComputerCardUage" : "HumanCardUsage"
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Pokedex;
