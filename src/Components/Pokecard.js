import React, { Component } from "react";
import "../css/Pokecard.css";

// const POKE_API =
//   "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const POKE_API = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

let padToThree = (number) => (number <= 999 ? `00${number}`.slice(-3) : number);
class Pokecard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let hidePokemonDetails = false;
    let imgSrc = `${POKE_API}${padToThree(this.props.id)}.png`;
    let name = this.props.name;
    let type = this.props.type;
    let exp = this.props.exp;
    let width = 110;

    switch (this.props.usedAs) {
      case "ComputerCardUage":
        hidePokemonDetails = "true";

        imgSrc = "black-pokeball.png";
        name = "Pokemon";
        type = "??";
        exp = "??";
        width = 80;
        break;
      case "DiscardedCardUsage":
        if (this.props.id == -1) {
          hidePokemonDetails = true;
          imgSrc = "pokeball.png";
          width = 85;
        }
    }

    return (
      <div
        className="Pokecard"
        onClick={() => this.props.onClick(this.props.id)}
      >
        <h6 className="Pokecard-title">{name}</h6>
        <div className="Pokecard-image">
          <img src={imgSrc} alt={this.props.name} width={width} />
        </div>
        <div className="Pokecard-data">Type: {type}</div>
        <div className="Pokecard-data">EXP: {exp}</div>
      </div>
    );
  }
}

export default Pokecard;
