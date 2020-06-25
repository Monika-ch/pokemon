import React, { Component } from "react";
import Pokedex from "./Pokedex";
import DiscardCard from "./DiscardCard";
import CompletedSet from "./CompletedSet";
import CardDeck from "./CardDeck";
import PokeModal from "./PokeModal";
import { Redirect } from "react-router-dom";
import ScoreList from "./ScoreList";
import LoadingOverlay from "react-loading-overlay";
import { SemipolarLoading } from "react-loadingg";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Prompt } from "react-router";
import { connect } from "react-redux";
import Roll from "react-reveal/Roll";
import Fade from "react-reveal/Fade";
import "../css/Pokedex.css";

// CONSTANTS DEFINED HERE
const timeForComputerMove = 1000;
const pointsToWinGame = 2200;
const completedSetCountToWinGame = 4;
const cardCoundNeededToCompleteSet = 3;
const maxCardInDeck = 7;

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) return [];
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

const mapStateToProps = (state) => {
  console.log("Got state in map........++++", state);
  return {
    isPokemonLoading: state.pokemons.isLoading,
  };
};

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
  completedSetPlayer: [],
  completedSetComputer: [],
  isRedirect: false,
  isPlayerTurn: true,
  selectedCard: null,
  computerLastMove: "",
  gameOver: false,
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

  canMakeMove = () => this.state.isPlayerTurn && !this.props.isPokemonLoading;

  resetState = (initialize = false) => {
    let computerHand = [];
    // We first take 2*MaxCards in playerHand
    // then we pick a random index between 0 and length of player hand
    // and move that card to computer hand. We keep doing this till
    // player hand and computer hand are equal
    let playerHand = [...this.getNRandomPokemon(maxCardInDeck * 2)];
    while (computerHand.length < playerHand.length) {
      let randIdx = Math.floor(Math.random() * playerHand.length);
      let randPokemon = playerHand.splice(randIdx, 1)[0];
      computerHand.push(randPokemon);
    }

    let shouldRedirect = !this.props.pokemon || !this.props.pokemon.length;

    // for first time this.state = is necessary.
    // its like using a variable for first time, let x is necessary.
    // after that we can keep doing x=10, x=100 etc.
    // same way first time we need to assign something to state.After that we can keep doing setState
    if (initialize) {
      this.state = defaultState;
      this.state.computerHand = computerHand;
      this.state.playerHand = playerHand;
      this.state.completedSetPlayer = this.getCompletedSets(
        this.state.playerHand
      );
      this.state.completedSetComputer = this.getCompletedSets(
        this.state.computerHand
      );
      this.state.isRedirect = shouldRedirect;
      if (shouldRedirect) {
        this.state.gameOver = true;
      }
    } else {
      this.setState(defaultState);
      this.setState(
        { playerHand: playerHand, computerHand: computerHand },
        () => this.checkWinner(this.state.playerHand, this.state.computerHand)
      );
      this.setState({ isRedirect: shouldRedirect });
      if (shouldRedirect) {
        this.setState({ gameOver: true });
      }
    }
  };

  makeMove(hand, id) {
    let idx = hand.findIndex((card) => card.id === id);
    let discardedCard = hand[idx];
    let newHand = [...hand.slice(0, idx), ...hand.slice(idx + 1)];
    return [discardedCard, newHand];
  }

  getCardFromDeck(hand) {
    let cntr = 0;
    do {
      let newCard = this.getNRandomPokemon(1)[0];
      if (hand.some((x) => x.id === newCard.id)) {
        // found a duplicate card. Keep trying
        ++cntr;
        if (cntr > 100) {
          // give up and return the same card
          return newCard;
        }
        continue;
      }
      return hand.concat(newCard);
    } while (true);
  }

  // Winning by set === 4 sets of 3 cards each
  // Winning by exp === pointsToWinGame points
  isAWinningHand(hand, completedSet) {
    const ifWinningBySet =
      completedSet.length ===
      cardCoundNeededToCompleteSet * completedSetCountToWinGame;
    const ifWinningByExp = this.getHandSum(hand) > pointsToWinGame;
    return ifWinningBySet || ifWinningByExp;
  }

  setCompletedState = (stateHand, currentCompletedSet, completedHandName) => {
    let completedSets = this.getCompletedSets(stateHand, currentCompletedSet);
    this.setState({ [completedHandName]: completedSets });
    return completedSets;
  };

  getCompletedSets = (stateHand, currentCompletedSet = []) => {
    let deck = this.filterCompletedSet(stateHand, currentCompletedSet);
    let playerTypeCount = getTypeCount(deck);
    let completedSets = [];
    for (let i = 0; i < playerTypeCount.length; i++) {
      let [type, count] = playerTypeCount[i];
      if (count >= cardCoundNeededToCompleteSet) {
        completedSets.push(
          ...deck
            .filter((p) => p.type === type)
            .slice(0, cardCoundNeededToCompleteSet)
        );
      }
    }
    return currentCompletedSet.concat(completedSets);
  };

  checkWinner = (playerHand, computerHand) => {
    let newCompletedSetPlayer = this.setCompletedState(
      playerHand,
      this.state.completedSetPlayer,
      "completedSetPlayer"
    );

    let newCompletedSetComputer = this.setCompletedState(
      computerHand,
      this.state.completedSetComputer,
      "completedSetComputer"
    );

    if (this.isAWinningHand(computerHand, newCompletedSetComputer)) {
      this.setState({
        gameOver: true,
        modalState: {
          ...computerWonModal,
          onButtonClick1: this.onNewGame,
          onButtonClick2: this.toHome,
        },
      });
    }
    if (this.isAWinningHand(playerHand, newCompletedSetPlayer)) {
      this.setState({
        gameOver: true,
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

  swapDiscardCard = (id, isComputer = false) => {
    if (this.canMakeMove() === false) return;
    console.log("swap discard card..............", id, isComputer);
    if (this.state.discardedCard.id === -1) {
      return;
    }
    let selectedCard = this.state.discardedCard;
    if (isComputer === false) {
      this.setState({ selectedCard: selectedCard });
      console.log("SELECTED POKEMON : ", selectedCard.name);
    }
  };

  swapCardFromHand = (hand, id) => {
    let matchCard = hand.filter((pokemon) => pokemon.id === id)[0];
    if (matchCard.base_experience > this.state.selectedCard.base_experience) {
      this.setState({ discardedCard: matchCard });
      hand = hand
        .filter((removeMatched) => removeMatched.id !== matchCard.id)
        .concat(this.state.selectedCard);
      return hand;
    }

    return null;
  };

  filterCompletedSet = (hand, completedSet) => {
    console.log("Current hand is", hand);
    console.log("CompletedSet is", completedSet);
    let returnValue = [];
    for (let i = 0; i < hand.length; i++) {
      let p = hand[i];
      let notInCompletedSet = true;

      for (let j = 0; j < completedSet.length; j++) {
        if (p.id === completedSet[j].id) {
          notInCompletedSet = false;
          break;
        }
      }
      if (notInCompletedSet) {
        returnValue.push(p);
      }
    }
    console.log("Returned value is ", returnValue);
    return returnValue;
  };

  getHandSum = (hand) => {
    return hand.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);
  };

  showRules = (e) => {
    console.log(e.key);
    if (e.key === "r") {
      this.setState({
        modalState: {
          isModalOpen: true,
          modalTitle: "●✿ GAME RULES ✿●",
          modalContent: `Collect ${completedSetCountToWinGame} sets of different types of pokemon, 1 set = ${cardCoundNeededToCompleteSet} cards "OR" Score ➤
            ${pointsToWinGame}`,
          modalButton1: "Cool",
          modalButton2: "Got it",
          onButtonClick1: this.dismissModal,
          onButtonClick2: this.dismissModal,
        },
      });
    }
  };

  render() {
    let computerHand = this.state.computerHand;
    let playerHand = this.state.playerHand;
    let exp1 = this.getHandSum(computerHand);
    let exp2 = this.getHandSum(playerHand);

    const onclick = (id) => {
      if (this.canMakeMove() === false) return;
      if (this.state.selectedCard != null) {
        let newHand = this.swapCardFromHand(this.state.playerHand, id);
        if (newHand !== null) {
          this.setState({ playerHand: newHand }, () =>
            this.checkWinner(this.state.playerHand, this.state.computerHand)
          );
          this.setState({ selectedCard: null });
          makeComputerMove();
        } else {
          // this means that a pokemon with less experience was selected
          this.setState({
            modalState: {
              ...cantAddCardorMakeMove,
              modalContent:
                "Can't make a move ! Should have picked a pokemon with a higher EXP !",
              onButtonClick1: this.dismissModal,
              onButtonClick2: this.dismissModal,
            },
          });
        }
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

    const logicOfComputerMove = () => {
      let computerMovePrefix = "Computer's Move : ";
      let filteredCards = this.filterCompletedSet(
        this.state.computerHand,
        this.state.completedSetComputer
      );
      let shouldPickFromDeck =
        (filteredCards !== null && filteredCards.length <= 1) ||
        Math.random() > 0.5;

      if (filteredCards.length === maxCardInDeck || !shouldPickFromDeck) {
        let randomIdxToDiscard =
          Math.floor(Math.random() * 100) % filteredCards.length;
        let cardDiscarded = filteredCards[randomIdxToDiscard];

        discardCardAndSetState(
          "computerHand",
          this.state.computerHand,
          cardDiscarded.id
        );

        computerMovePrefix += `Discarded ${cardDiscarded.name} !`;
        this.setState({ computerLastMove: computerMovePrefix });
        return;
      }

      if (this.state.computerHand.length === 1 || shouldPickFromDeck) {
        let newHand = this.getCardFromDeck(this.state.computerHand);
        computerMovePrefix += `Picked a card from deck !`;
        this.setState({ computerLastMove: computerMovePrefix });

        this.setState({ computerHand: newHand }, () =>
          this.checkWinner(this.state.playerHand, this.state.computerHand)
        );
      }
    };

    const makeComputerMove = () => {
      this.setState({ isPlayerTurn: false }, () => {
        setTimeout(() => {
          try {
            logicOfComputerMove();
          } finally {
            this.setState({ isPlayerTurn: true });
          }
        }, timeForComputerMove);
      });
    };
    const onDeckClick = () => {
      if (this.canMakeMove() === false) return;
      this.setState({ selectedCard: null });
      let filteredHand = this.filterCompletedSet(
        this.state.playerHand,
        this.state.completedSetPlayer
      );
      if (filteredHand.length >= maxCardInDeck) {
        this.setState({
          modalState: {
            ...cantAddCardorMakeMove,
            modalContent: "Can't add more cards ! Discard few cards !",
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
      <div>
        <Prompt
          when={!this.state.gameOver}
          message="Are you sure you want to leave the Poke-battle?"
        />
        <Fade cascade duration={500}>
          <div className="game-wrapper" tabIndex="0" onKeyUp={this.showRules}>
            <LoadingOverlay
              active={!this.state.isPlayerTurn}
              text="Computer's Move . . ."
              spinner
            />

            <div hidden={!this.props.isPokemonLoading}>
              <SemipolarLoading />
            </div>

            <PokeModal
              isModalOpen={this.state.modalState.isModalOpen}
              modalTitle={this.state.modalState.modalTitle}
              modalContent={this.state.modalState.modalContent}
              modalButton1={this.state.modalState.modalButton1}
              onClickButton1={this.state.modalState.onButtonClick1}
              modalButton2={this.state.modalState.modalButton2}
              onClickButton2={this.state.modalState.onButtonClick2}
            />
            <Fade cascade duration={500} delay={500}>
              <div className="container-fluid">
                <Roll bottom duration={2200} delay={2000}>
                  <div className="row justify-content-center mb-md-5">
                    <Link to="/">
                      <Button
                        size="lg"
                        color="success"
                        className="home-button mb-lg-4"
                      >
                        <i className="fa fa-home" />
                      </Button>
                    </Link>
                  </div>
                </Roll>

                <div className="row main-content mt-md-5">
                  <Fade right cascade duration={2200} delay={500}>
                    <div className="col-lg-2 col-md-3 col-5 left-wrapper">
                      <div className="CompleteSet-1">
                        <CompletedSet
                          pokemon={this.state.completedSetPlayer}
                          // pokemon={this.state.computerHand}
                        />
                      </div>

                      <div className="scorelist-wrapper">
                        <div className="container">
                          <div className="ScoreList row">
                            <ScoreList
                              isComputer={false}
                              pokemon={this.state.playerHand}
                              exp={exp2}
                            />
                          </div>
                          <br />
                          <div className="ScoreList row">
                            <ScoreList
                              isComputer={true}
                              pokemon={this.state.computerHand}
                              exp={exp1}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="CompleteSet-2">
                        <CompletedSet
                          pokemon={this.state.completedSetComputer}
                          // pokemon={this.state.computerHand}
                        />
                      </div>
                      <div
                        hidden={!this.state.isPlayerTurn}
                        id="PlayerMoveText"
                        className="PlayerMove"
                      >
                        Player's Move . . .
                      </div>
                      <div id="ComputerMoveDetail">
                        {this.state.computerLastMove}
                      </div>
                      {/* </div> */}
                    </div>
                  </Fade>

                  <Fade left cascade duration={1600} delay={500}>
                    <div className="col-lg-10 col-md-9 col-7 ">
                      <div className="container-fluid border-me">
                        <div className="row center-me">
                          <Pokedex
                            pokemon={this.filterCompletedSet(
                              this.state.playerHand,
                              this.state.completedSetPlayer
                            )}
                            onClick={onclick}
                            exp={exp2}
                          />
                        </div>

                        <div className="row center-me">
                          <div
                            className={
                              this.state.selectedCard != null
                                ? " CardSelected"
                                : ""
                            }
                          >
                            <DiscardCard
                              id={this.state.discardedCard.id}
                              type={this.state.discardedCard.type}
                              name={this.state.discardedCard.name}
                              base_experience={
                                this.state.discardedCard.base_experience
                              }
                              onClick={this.swapDiscardCard}
                            />
                          </div>
                          <CardDeck onDeckClick={onDeckClick} />
                        </div>

                        <div className="row center-me">
                          <Pokedex
                            pokemon={this.filterCompletedSet(
                              this.state.computerHand,
                              this.state.completedSetComputer
                            )}
                            exp={exp1}
                            isComputer
                            onClick={() => {}}
                          />
                        </div>
                      </div>
                    </div>
                  </Fade>
                </div>
              </div>
            </Fade>
          </div>
        </Fade>
        {/* Copied from this: https://stackoverflow.com/questions/43230194/how-to-use-redirect-in-the-new-react-router-dom-of-reactjs
          Redirect needs to be part of render function. It doesn't matter where it is put in html as we are moving away from this page
          Also read tutorial on conditional rendering: https://reactjs.org/docs/conditional-rendering.html*/}
        {this.state.isRedirect && <Redirect to="/" />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Pokegame);
