import React, { Component } from "react";
import "../css/CardDeck.css";
import Fade from "react-reveal/Fade";

export default class CardDeck extends Component {
  render() {
    return (
      <Fade bottom right duration={2200} delay={2200}>
        <div className="CardDeck" onClick={this.props.onDeckClick}>
          <div className="CardDeck-image">
            <img src="pokeball.png" width="76" alt="Pokeball" />
          </div>
          <h5 className="CardDeck-title">Card ~ Deck</h5>
        </div>
      </Fade>
    );
  }
}
