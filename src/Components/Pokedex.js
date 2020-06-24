import React, { Component } from "react";
import Pokecard from "./Pokecard";
import Flip from "react-reveal/Flip";

class Pokedex extends Component {
  render() {
    return (
      <Flip bottom cascade duration={1600}>
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
      </Flip>
    );
  }
}

export default Pokedex;
