import React, { Component } from "react";
import Pokecard from "./Pokecard";
import ScoreList from "./ScoreList";
import "../css/Pokedex.css";

class Pokedex extends Component {
  render() {
    // let title;
    // if(this.props.isWinner) {
    //   title = <h1 className="Pokedex-winner">Winning Hand</h1>
    // } else {
    //   title = <h1 className="Pokedex-loser">Losing Hand</h1>;
    // }
    // let playerName;
    // if (this.props.isComputer) {
    //   playerName = <h1 className="Pokedex-computer">COMPUTER</h1>;
    // } else {
    //   playerName = <h1 className="Pokedex-human">YOU</h1>;
    // }

    return (
      <React.Fragment>
        <div className="row">
          <div className="wrapper">
            <div className="ScoreList">
              <ScoreList
                isComputer={this.props.isComputer}
                pokemon={this.props.pokemon}
                exp={this.props.exp}
              />
            </div>
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
                      this.props.isComputer
                        ? "ComputerCardUage"
                        : "HumanCardUsage"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Pokedex;
