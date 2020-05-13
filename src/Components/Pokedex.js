import React, { Component } from "react";
import Pokecard from "./Pokecard";
import TypeList from "./TypeList";
import "../css/Pokedex.css";

class Pokedex extends Component {

  render() {
    let title;
    // if(this.props.isWinner) {
    //   title = <h1 className="Pokedex-winner">Winning Hand</h1>
    // } else {
    //   title = <h1 className="Pokedex-loser">Losing Hand</h1>;
    // }
    let playerName;
    if(this.props.isComputer) {
      playerName = <h1 className="Pokedex-winner">COMPUTER</h1>
    } else {
      playerName = <h1 className="Pokedex-loser">YOU</h1>;
    }
    return (
      <React.Fragment>
        <div className="wrapper">
            <div className="TypeList">
              <TypeList isComputer={this.props.isComputer} pokemon={this.props.pokemon}/>
            </div>
            <div className="Pokedex">
              {title}
              {playerName}
              <h4>Total Experience: {this.props.exp}</h4>
              <div className="Pokedex-cards">
                {this.props.pokemon.map((p) => (
                  <Pokecard
                    id={p.id}
                    name={p.name}
                    type={p.type}
                    exp={p.base_experience}
                  />
                ))}
              </div>
            </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Pokedex;
