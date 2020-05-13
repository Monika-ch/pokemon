import React, { Component } from "react";
import Pokedex from "./Pokedex";

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
class Pokegame extends Component {
  getNRandomPokemon(n) {
    return getRandom(this.props.pokemon, n);
  }

  render() {
    let hand1 = [];
    let hand2 = [...this.getNRandomPokemon(10)];
    while (hand1.length < hand2.length) {
      let randIdx = Math.floor(Math.random() * hand2.length);
      let randPokemon = hand2.splice(randIdx, 1)[0];
      hand1.push(randPokemon);
    }
    let exp1 = hand1.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);
    let exp2 = hand2.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);

    return (
      <React.Fragment>
        {/* <div className="bg"> */}
        <div>
          <Pokedex
            pokemon={hand1}
            exp={exp1}
            isComputer
            isWinner={exp1 > exp2}
          />
          <Pokedex pokemon={hand2} exp={exp2} isWinner={exp2 > exp1} />
        </div>
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default Pokegame;
