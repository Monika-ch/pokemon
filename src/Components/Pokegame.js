import React, { Component } from "react";
import Pokedex from "./Pokedex";
import DiscardCard from "./DiscardCard";
import CompletedSet from "./CompletedSet";
import CardDeck from "./CardDeck";
import PokeModal from "./PokeModal";
import { Link, Redirect } from "react-router-dom";

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

const cantAddCardorMakeMove = {
  isModalOpen: true,
  modalTitle: "INVALID MOVE !",
  modalContent: "",
  modalButton1: "Cool",
  modalButton2: "Got it",
};

const computerWonModal = {
  isModalOpen: true,
  modalTitle: "Game over !!",
  modalContent: "Computer Won! Better luck next time",
  modalButton1: "New game",
  modalButton2: "Home",
};

const humanWonModal = {
  isModalOpen: true,
  modalTitle: "Game Over !!",
  modalContent: "Congratulations .. You WON !",
  modalButton1: "New game",
  modalButton2: "Home",
};

const defaultState = {
  discardedCard: { id: -1, name: "", type: "", exp: "" },
  computerHand: [],
  playerHand: [],
  completedCardPlayer: [],
  completedCardComputer: [],
  isRedirect: false,
  modalState: {
    isModalOpen: false,
    modalTitle: "",
    modalContent: "",
    modalButton1: "",
    modalButton2: "",
    onButtonClick1: null,
    onButtonClick2: null,
  },
  // for modal texting uncomment the below modalState and comment the above one!

  // modalState: humanWonModal,
};

class Pokegame extends Component {
  getNRandomPokemon(n) {
    return getRandom(this.props.pokemon, n);
  }

  constructor(props) {
    super(props);
    this.resetState(true);

    console.log("State in constructor:", JSON.stringify(this.state));
  }

  resetState = (initialize = false) => {
    let computerHand = [];
    let playerHand = [...this.getNRandomPokemon(maxHandsPossible * 2)];
    while (computerHand.length < playerHand.length) {
      let randIdx = Math.floor(Math.random() * playerHand.length);
      let randPokemon = playerHand.splice(randIdx, 1)[0];
      computerHand.push(randPokemon);
    }
    // for first time this.state = is necessary.
    // its like using a variable for first time, let x is necessary.
    // after that we can keep doing x=10, x=100 etc.
    // same way first time we need to assign something to state.After that we can keep doing setState
    if (initialize) {
      this.state = defaultState;
      this.state.computerHand = computerHand;
      this.state.playerHand = playerHand;
    } else {
      this.setState(defaultState);
      this.setState(
        { playerHand: playerHand, computerHand: computerHand },
        () => this.checkWinner(this.state.playerHand, this.state.computerHand)
      );
    }
  };

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
    console.log("Checked if is any winning", hand);
    return ifWinning;
  }

  setCompletedState = (stateHand, completedHandName, handName) => {
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
        this.setState({ [completedHandName]: completedSets });
      }
    }

    // [1,2,3,4,5,6] => stateHand
    // [3,5,6] => completedSet
    // stateHand = [1,2,4]
    // let newHand = stateHand.filter(
    //   (x) => completedSets.findIndex((y) => y.id == x.id) == -1
    // );

    // if (newHand.length != stateHand.length) {
    //   this.setState({ [handName]: newHand });
    // }
  };

  checkWinner = (playerHand, computerHand) => {
    this.setCompletedState(playerHand, "completedCardPlayer", "playerHand");
    this.setCompletedState(
      computerHand,
      "completedCardComputer",
      "computerHand"
    );
    if (this.isAWinningHand(computerHand)) {
      this.setState({
        modalState: {
          ...computerWonModal,
          onButtonClick1: this.onNewGame,
          onButtonClick2: this.toHome,
        },
      });
    }
    if (this.isAWinningHand(playerHand)) {
      this.setState({
        modalState: {
          ...humanWonModal,
          onButtonClick1: this.onNewGame,
          onButtonClick2: this.toHome,
        },
      });
    }
  };

  dismissModal = () => {
    this.setState({
      modalState: { ...cantAddCardorMakeMove, isModalOpen: false },
    });
  };

  toHome = () => {
    console.log("home link....................");
    this.setState({ isRedirect: true });
  };

  onNewGame = () => {
    console.log("onNewGame");
    this.resetState();
  };

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
        this.setState({
          modalState: {
            ...cantAddCardorMakeMove,
            modalContent: "Can't make a move. Pick something from deck",
            onButtonClick1: this.dismissModal,
            onButtonClick2: this.dismissModal,
          },
        });

        return;
      }

      // Hand2 is always human so we will only search in humans hand
      discardCardAndSetState("playerHand", this.state.playerHand, id);
      makeComputerMove();
    };

    const discardCardAndSetState = (handName, hand, id) => {
      let [discardedCard, newHand2] = this.makeMove(hand, id);
      this.setState({ discardedCard: discardedCard });
      this.setState({ [handName]: newHand2 }, () =>
        this.checkWinner(this.state.playerHand, this.state.computerHand)
      );
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
        this.setState({ computerHand: newHand }, () =>
          this.checkWinner(this.state.playerHand, this.state.computerHand)
        );
      }
    };
    const onDeckClick = () => {
      if (this.state.playerHand.length >= maxHandsPossible) {
        this.setState({
          modalState: {
            ...cantAddCardorMakeMove,
            modalContent: "Cant add more cards to hand. discard few cards",
            onButtonClick1: this.dismissModal,
            onButtonClick2: this.dismissModal,
          },
        });
        return;
      }
      let newHand = this.getCardFromDeck(playerHand);
      this.setState({ playerHand: newHand }, () =>
        this.checkWinner(this.state.playerHand, this.state.computerHand)
      );
      makeComputerMove();
    };

    return (
      <React.Fragment>
        {/* <div className="bg"> */}
        <div className="game-wrapper">
          <PokeModal
            isModalOpen={this.state.modalState.isModalOpen}
            modalTitle={this.state.modalState.modalTitle}
            modalContent={this.state.modalState.modalContent}
            modalButton1={this.state.modalState.modalButton1}
            onClickButton1={this.state.modalState.onButtonClick1}
            modalButton2={this.state.modalState.modalButton2}
            onClickButton2={this.state.modalState.onButtonClick2}

            // onClick={this.onHome}
          />
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
        {/* Copied from this: https://stackoverflow.com/questions/43230194/how-to-use-redirect-in-the-new-react-router-dom-of-reactjs
        Redirect needs to be part of render function. It doesn't matter where it is put in html as we are moving away from this page
        Also read tutorial on conditional rendering: https://reactjs.org/docs/conditional-rendering.html*/}
        {this.state.isRedirect && <Redirect to="/" />}
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default Pokegame;
