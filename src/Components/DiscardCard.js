import React, { Component } from "react";
import "../css/DiscardCard.css";
import Fade from "react-reveal/Fade";

const POKE_API = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

let padToThree = (number) => (number <= 999 ? `00${number}`.slice(-3) : number);

export default class DiscardCard extends Component {
  render() {
    let imgSrc = `${POKE_API}${padToThree(this.props.id)}.png`;
    let width = 110;
    let hidePokemonDetails = false;

    if (this.props.id === -1) {
      imgSrc = "transparent-pokemon-2.png";
      width = 90;
      hidePokemonDetails = true;
    }

    return (
      <Fade bottom left duration={2200} delay={2200}>
        <div
          className="DiscardCard"
          onClick={() => this.props.onClick(this.props.id)}
        >
          <div className="DiscardCard-data" hidden={hidePokemonDetails}>
            Type: {this.props.type}
          </div>
          <div className="DiscardCard-data" hidden={hidePokemonDetails}>
            EXP: {this.props.base_experience}
          </div>
          <div className="DiscardCard-image">
            <img src={imgSrc} alt={this.props.name} width={width} />
          </div>
          <h6 className="DiscardCard-title" hidden={hidePokemonDetails}>
            {this.props.name}
          </h6>
        </div>
      </Fade>
    );
  }
}
