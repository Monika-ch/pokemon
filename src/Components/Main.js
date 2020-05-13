import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Pokecard from "./Pokecard";
import Pokegame from "./Pokegame";

class Main extends Component {
  static defaultProps = {
    mainPokemonData: [
      { id: 4, name: "Charmander", type: "fire", base_experience: 62 },
      { id: 7, name: "Squirtle", type: "water", base_experience: 63 },
      { id: 11, name: "Metapod", type: "bug", base_experience: 72 },
      { id: 12, name: "Butterfree", type: "flying", base_experience: 178 },
      { id: 25, name: "Pikachu", type: "electric", base_experience: 112 },
      { id: 39, name: "Jigglypuff", type: "normal", base_experience: 95 },
      { id: 94, name: "Gengar", type: "poison", base_experience: 225 },
      { id: 133, name: "Eevee", type: "normal", base_experience: 65 },
    ],
  };

  render() {
    const pokemon = ({ match }) => {
      console.log(JSON.stringify(this.props.mainPokemonData));
      console.log(JSON.stringify(match));
      let matchedPokemon = this.props.mainPokemonData.filter(
        (p) => p.id === +match.params.id
      )[0];
      console.log("Matched pokemon is ", matchedPokemon);
      return (
        <Pokecard
          id={match.params.id}
          name={matchedPokemon.name}
          type={matchedPokemon.type}
          exp={matchedPokemon.base_experience}
        />
      );
    };

    // if /pokemon/1 is called then
    // render will be called with id == 1
    // then in render we call pokemon function and give it id 1
    return (
      <div>
        <Pokegame pokemon={this.props.mainPokemonData} />
        {/* <Switch>
                <Route path="/pokemon/:id" render={pokemon}/>
            </Switch> */}
      </div>
    );
  }
}

export default Main;
