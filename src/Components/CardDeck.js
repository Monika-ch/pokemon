import React, { Component } from "react";
import "../css/CardDeck.css";

export default class CardDeck extends Component {
  render() {
    return (
      <div>
        <div className="CardDeck" onClick={this.props.onDeckClick}>
          <div className="CardDeck-image">
            <img src="pokeball.png" width="76" alt="Pokeball" />
          </div>
          <h5 className="CardDeck-title">Card ~ Deck</h5>
        </div>
      </div>
    );
  }
}
