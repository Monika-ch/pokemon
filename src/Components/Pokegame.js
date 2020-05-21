import React, { Component } from "react";
import Pokedex from "./Pokedex";
import DiscardCard from "./DiscardCard";

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

const maxHandsPossible = 4;
class Pokegame extends Component {
  getNRandomPokemon(n) {
    return getRandom(this.props.pokemon, n);
  }

  constructor(props) {
    super(props);
    let hand1 = [];
    let hand2 = [...this.getNRandomPokemon(maxHandsPossible * 2)];
    while (hand1.length < hand2.length) {
      let randIdx = Math.floor(Math.random() * hand2.length);
      let randPokemon = hand2.splice(randIdx, 1)[0];
      hand1.push(randPokemon);
    }
    this.state = {
      discardedCard: { id: -1, name: "", type: "", exp: "" },
      hand1: hand1,
      hand2: hand2,
    };
  }

  makeMove(hand, id) {
    let idx = hand.findIndex((card) => card.id === id);
    let discardedCard = hand[idx];
    let newCard = this.getNRandomPokemon(1)[0];
    let newHand = [...hand.slice(0, idx), ...hand.slice(idx + 1)];
    return [discardedCard, newHand];
  }

  getCardFromDeck(hand) {
    let newCard = this.getNRandomPokemon(1)[0];
    return hand.concat(newCard);
  }

  isAWinningHand(hand) {
    const ifWinning = Array.from(
      hand
        .map((x) => x.type)
        .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
    ).some(([c, cnt]) => cnt > 2);
    console.log(
      Array.from(
        hand
          .map((x) => x.type)
          .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
      )
    );
    console.log("Checked if is any winningg");
    return ifWinning;
  }

  checkWinner() {
    if (this.isAWinningHand(this.state.hand1)) {
      alert("Computer won ! Try your luck in next BATTLE !");
    }
    if (this.isAWinningHand(this.state.hand2)) {
      alert("Congratulations ! You WON !");
    }
  }
  render() {
    let hand1 = this.state.hand1;
    let hand2 = this.state.hand2;
    let exp1 = hand1.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);
    let exp2 = hand2.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);

    const onclick = (id) => {
      // if only 1 card remaining dont do anything
      if (this.state.hand2.length == 1) {
        alert("Can't make a move. Pick something from deck");
        return;
      }

      // Hand2 is always human so we will only search in humans hand
      discardCardAndSetState("hand2", this.state.hand2, id);
      makeComputerMove();
      this.checkWinner();
    };

    const discardCardAndSetState = (handName, hand, id) => {
      let [discardedCard, newHand2] = this.makeMove(hand, id);
      this.setState({ discardedCard: discardedCard });
      this.setState({ [handName]: newHand2 });
    };

    const makeComputerMove = () => {
      let shouldPickFromDeck =
        Math.random() > 0.5 || this.state.hand1.length == 1;
      if (this.state.hand1.length == maxHandsPossible || !shouldPickFromDeck) {
        let randomIdxToDiscard =
          Math.floor(Math.random() * 100) % this.state.hand1.length;
        discardCardAndSetState(
          "hand1",
          hand1,
          this.state.hand1[randomIdxToDiscard].id
        );
        return;
      }

      if (this.state.hand1.length == 1 || shouldPickFromDeck) {
        let newHand = this.getCardFromDeck(hand1);
        this.setState({ hand1: newHand });
      }
    };
    const onDeckClicked = () => {
      if (this.state.hand2.length >= maxHandsPossible) {
        alert("Cant add more cards to hand. discard few cards");
        return;
      }
      let newHand = this.getCardFromDeck(hand2);
      this.setState({ hand2: newHand });
      makeComputerMove();
      this.checkWinner();
    };

    return (
      <React.Fragment>
        {/* <div className="bg"> */}
        <div className="game-wrapper">
          <Pokedex
            pokemon={hand1}
            exp={exp1}
            isComputer
            isWinner={exp1 > exp2}
            onClick={() => {}}
          />
          <DiscardCard
            id={this.state.discardedCard.id}
            type={this.state.discardedCard.type}
            name={this.state.discardedCard.name}
            base_experience={this.state.discardedCard.base_experience}
          />
          <Pokedex
            pokemon={hand2}
            onClick={onclick}
            exp={exp2}
            isWinner={exp2 > exp1}
          />
          <div className="Pokecard" onClick={onDeckClicked}>
            <img src="pokeball.png" width="50" />
          </div>
        </div>
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default Pokegame;
