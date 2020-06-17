import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import CircleType from "circletype";
import "../css/Home.css";
import { connect } from "react-redux";
import { getPokemonData } from "../redux/pokemonFetch";
import PokemonCache from "../PokemonCache";
import { fadeIn } from "react-animations";
import { StyleSheet, css } from "aphrodite";
import Rotate from "react-reveal/Rotate";

const styles = StyleSheet.create({
  fadeIn: {
    animationName: fadeIn,
  },
});

const mapDispatchToProps = {
  getPokemonData,
};

class Home extends Component {
  componentDidMount() {
    console.log(document.getElementsByClassName("arc")[0]);
    let circleType = new CircleType(document.getElementsByClassName("arc")[0]);
    circleType.dir(-1).radius(350);
    this.props.getPokemonData();
  }

  render() {
    return (
      <div className="home-wrapper">
        <header>
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className={css(styles.fadeIn)}>
                  Ƥ
                  <Rotate bottom>
                    <img
                      className="image"
                      src={process.env.PUBLIC_URL + "/pokeball.png"}
                      height="70"
                      width="70"
                      alt="Pokeball"
                    />
                  </Rotate>
                  Ƙℯḿ
                  <Rotate bottom>
                    <img
                      className="image"
                      src={process.env.PUBLIC_URL + "/pokeball.png"}
                      height="70"
                      width="70"
                      alt="Pokeball"
                    />
                  </Rotate>
                  ȵ
                </h1>
                <h3 className="arc">..let the battle begin</h3>
              </div>
            </div>
          </div>
        </header>

        <div className="container-fluid">
          <div className="battleCard">
            <div className="row justify-content-center">
              <div className="col-md-9 col-11 mb-2">
                <h5>Choose Your Battle</h5>
              </div>
              <div className="col-12">
                <Link to="/pokemon">
                  <button className="mt-md-1 p-2 col-md-6 col-8 all-btn btn1">
                    vs Computer
                  </button>
                </Link>
                <br />
                <Link to="/friendgame">
                  <button className="mt-md-3 p-2 col-md-6 col-8 all-btn btn2">
                    vs A Friend
                  </button>
                </Link>
                <br />
                <Link to="/game_rules" className="mt-2">
                  <button
                    outline
                    className="mt-md-3 col-md-6 col-8 all-btn game-rules"
                  >
                    <span>Game Rules</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Home);
