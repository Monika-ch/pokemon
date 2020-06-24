import React, { Component } from "react";
import Pokegame from "./Pokegame";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    pokemon: state.pokemons,
  };
};

class Main extends Component {
  changeColor = (color) => {
    this.setState({ color: color });
  };

  render() {
    console.log(this.props.pokemon);

    return (
      <div>
        <Pokegame pokemon={this.props.pokemon.pokemons} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);
