import React, { Component } from "react";
import Pokedex from "./Pokedex";
import DiscardCard from "./DiscardCard";
import CompletedSet from "./CompletedSet";
import CardDeck from "./CardDeck";

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

// This function returns an array with count for each type
// for eg if the hand that is passed is: ["fire", "fire", "water"]
// this function will return [["fire",2], ["water", 1]
function getTypeCount(hand) {
  // This is calculating how many pokemons of each type are there.-hero
  // For eg if the hand is ["fire", "fire", "something"] the countOfEachType array
  // will look like: ["fire":2, "something":1]
  let countOfEachType = Array.from(
    hand
      .map((x) => x.type)
      .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
  );
  return countOfEachType;
}

const maxHandsPossible = 7;
class Pokegame extends Component {
  getNRandomPokemon(n) {
    return getRandom(this.props.pokemon, n);
  }

  constructor(props) {
    super(props);
    let computerHand = [];
    let playerHand = [...this.getNRandomPokemon(maxHandsPossible * 2)];
    while (computerHand.length < playerHand.length) {
      let randIdx = Math.floor(Math.random() * playerHand.length);
      let randPokemon = playerHand.splice(randIdx, 1)[0];
      computerHand.push(randPokemon);
    }
    this.state = {
      discardedCard: { id: -1, name: "", type: "", exp: "" },
      computerHand: computerHand,
      playerHand: playerHand,
      completedCardPlayer: [],
      completedCardComputer: [],
    };

    console.log("State in constructor:", JSON.stringify(this.state));
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
    // This is calculating how many pokemons of each type are there.-hero
    // For eg if the hand is ["fire", "fire", "something"] the countOfEachType array
    // will look like: ["fire":2, "something":1]
    let countOfEachType = getTypeCount(hand);
    // .some will check if any element from countOfEachType is greater than 2.
    const ifWinning = countOfEachType.some(([c, cnt]) => cnt > 2);
    console.log("Checked if is any winningg");
    return ifWinning;
  }

  setCompletedState = (stateHand, handName) => {
    let playerTypeCount = getTypeCount(stateHand);
    console.log(stateHand);
    console.log(playerTypeCount);
    let completedSets = [];
    for (let i = 0; i < playerTypeCount.length; i++) {
      let [type, count] = playerTypeCount[i];
      console.log(type, "in loop");
      if (count > 1) {
        console.log("Found completed set of type ", type);
        completedSets.push(...stateHand.filter((p) => p.type == type));
      }
    }
    this.setState({ [handName]: completedSets });
  };

  checkWinner() {
    this.setCompletedState(this.state.playerHand, "completedCardPlayer");
    this.setCompletedState(this.state.computerHand, "completedCardComputer");
    if (this.isAWinningHand(this.state.computerHand)) {
      alert("Computer won ! Try your luck in next BATTLE !");
    }
    if (this.isAWinningHand(this.state.playerHand)) {
      alert("Congratulations ! You WON !");
    }
  }
  render() {
    let computerHand = this.state.computerHand;
    let playerHand = this.state.playerHand;
    let exp1 = computerHand.reduce(
      (exp, pokemon) => exp + pokemon.base_experience,
      0
    );
    let exp2 = playerHand.reduce(
      (exp, pokemon) => exp + pokemon.base_experience,
      0
    );

    const onclick = (id) => {
      // if only 1 card remaining dont do anything
      if (this.state.playerHand.length == 1) {
        alert("Can't make a move. Pick something from deck");
        return;
      }

      // Hand2 is always human so we will only search in humans hand
      discardCardAndSetState("playerHand", this.state.playerHand, id);
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
        Math.random() > 0.5 || this.state.computerHand.length == 1;
      if (
        this.state.computerHand.length == maxHandsPossible ||
        !shouldPickFromDeck
      ) {
        let randomIdxToDiscard =
          Math.floor(Math.random() * 100) % this.state.computerHand.length;
        discardCardAndSetState(
          "computerHand",
          computerHand,
          this.state.computerHand[randomIdxToDiscard].id
        );
        return;
      }

      if (this.state.computerHand.length == 1 || shouldPickFromDeck) {
        let newHand = this.getCardFromDeck(computerHand);
        this.setState({ computerHand: newHand });
      }
    };
    const onDeckClick = () => {
      if (this.state.playerHand.length >= maxHandsPossible) {
        alert("Cant add more cards to hand. discard few cards");
        return;
      }
      let newHand = this.getCardFromDeck(playerHand);
      this.setState({ playerHand: newHand });
      makeComputerMove();
      this.checkWinner();
    };

    return (
      <React.Fragment>
        {/* <div className="bg"> */}
        <div className="game-wrapper">
          <Pokedex
            pokemon={playerHand}
            onClick={onclick}
            exp={exp2}
            isWinner={exp2 > exp1}
          />
          <CompletedSet
            pokemon={this.state.completedCardPlayer}
            // usedAs="DiscardedCardUsage"
          />
          <div className="row center-me">
            <DiscardCard
              id={this.state.discardedCard.id}
              type={this.state.discardedCard.type}
              name={this.state.discardedCard.name}
              base_experience={this.state.discardedCard.base_experience}
              usedAs="DiscardedCardUsage"
            />
            <CardDeck onDeckClick={onDeckClick} />
          </div>
          <CompletedSet
            pokemon={this.state.completedCardComputer}
            // usedAs="DiscardedCardUsage"
          />
          <Pokedex
            pokemon={computerHand}
            exp={exp1}
            isComputer
            isWinner={exp1 > exp2}
            onClick={() => {}}
          />
        </div>
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default Pokegame;
