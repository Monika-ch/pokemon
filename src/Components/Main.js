import React, { Component } from "react";
import Pokecard from "./Pokecard";
import Pokegame from "./Pokegame";
import PokemonCache from "../PokemonCache";

class Main extends Component {
  static defaultProps = {
    // COMMENT: Remove the comment from the  line just below this before testing
    mainPokemonData: [
      { id: 4, name: "Charmander", type: "fire", base_experience: 62 },
      { id: 7, name: "Squirtle", type: "water", base_experience: 63 },
      { id: 11, name: "Metapod", type: "bug", base_experience: 72 },
      { id: 12, name: "Butterfree", type: "flying", base_experience: 178 },
      { id: 25, name: "Pikachu", type: "electric", base_experience: 112 },
      { id: 39, name: "Jigglypuff", type: "normal", base_experience: 95 },
      { id: 94, name: "Gengar", type: "poison", base_experience: 225 },
      { id: 133, name: "Eevee", type: "normal", base_experience: 65 },
      { id: 411, name: "Charmander", type: "fire", base_experience: 62 },
      { id: 711, name: "Squirtle", type: "water", base_experience: 63 },
      { id: 11111, name: "Metapod", type: "bug", base_experience: 72 },
      { id: 12111, name: "Butterfree", type: "flying", base_experience: 178 },
      { id: 25111, name: "Pikachu", type: "electric", base_experience: 112 },
      { id: 391111, name: "Jigglypuff", type: "normal", base_experience: 95 },
      { id: 94111, name: "Gengar", type: "poison", base_experience: 225 },
      { id: 133111111, name: "Eevee", type: "normal", base_experience: 65 },
      { id: 40010101, name: "Charmander", type: "fire", base_experience: 62 },
      { id: 70019291, name: "Squirtle", type: "water", base_experience: 63 },
      { id: 11112345678, name: "Metapod", type: "bug", base_experience: 72 },
      { id: 129876, name: "Butterfree", type: "flying", base_experience: 178 },
      { id: 254321, name: "Pikachu", type: "electric", base_experience: 112 },
      { id: 390123, name: "Jigglypuff", type: "normal", base_experience: 95 },
      { id: 9401234, name: "Gengar", type: "poison", base_experience: 225 },
      { id: 13334556, name: "Eevee", type: "normal", base_experience: 65 },
    ],
    // COMMENT: Remove the line just below this before testing
    // mainPokemonData: PokemonCache.cache,
  };
  constructor(props) {
    super(props);
  }

  changeColor = (color) => {
    this.setState({ color: color });
  };

  render() {
    const pokemon = ({ match }) => {
      let matchedPokemon = this.props.mainPokemonData.filter(
        (p) => p.id === +match.params.id
      )[0];
      return (
        <div>
          <Pokecard
            id={match.params.id}
            name={matchedPokemon.name}
            type={matchedPokemon.type}
            exp={matchedPokemon.base_experience}
          />
        </div>
      );
    };

    // if /pokemon/1 is called then
    // render will be called with id == 1
    // then in render we call pokemon function and give it id 1
    return (
      <div>
        <Pokegame pokemon={this.props.mainPokemonData} />
      </div>
    );
  }
}

export default Main;
