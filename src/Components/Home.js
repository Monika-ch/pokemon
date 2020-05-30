import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import CircleType from "circletype";
import { Switch, Route, Redirect } from "react-router-dom";
import "../css/Home.css";

class Home extends Component {
  componentDidMount() {
    console.log(document.getElementsByClassName("arc")[0]);
    let circleType = new CircleType(document.getElementsByClassName("arc")[0]);
    circleType.dir(-1).radius(350);
  }

  render() {
    return (
      <div>
        <div />
        <header>
          <div className="container">
            <div className="row">
              <div className="col">
                <h1>
                  Ƥ
                  <img
                    className="image"
                    src={process.env.PUBLIC_URL + "/pokeball.png"}
                    height="70"
                    width="70"
                    alt="Pokeball"
                  />
                  Ƙℯḿ
                  <img
                    className="image"
                    src={process.env.PUBLIC_URL + "/pokeball.png"}
                    height="70"
                    width="70"
                    alt="Pokeball"
                  />
                  ȵ
                </h1>
                <h3 className="arc">..let the battle begin</h3>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="battleCard">
            <div className="row justify-content-center">
              <div className="col-md-9 col-11 mb-2">
                <h5>Choose Your Battle</h5>
              </div>
              <div className="col-12">
                <Link to="/pokemon">
                  <Button
                    outline
                    color="danger"
                    className="mt-md-2 p-2 col-md-6 col-8"
                  >
                    vs Computer
                  </Button>
                </Link>
                <br />
                <Link to="/friendgame">
                  <Button
                    outline
                    color="warning"
                    className="mt-md-3 p-2 col-md-6 col-8"
                  >
                    vs A Friend
                  </Button>
                </Link>
                <br />
                <Link to="/randomgame">
                  <Button
                    outline
                    color="success"
                    className="mt-md-3 mb-2 p-2 col-md-6 col-8"
                  >
                    vs Random Opponent
                  </Button>
                </Link>
                <br />
                <Link to="/game_rules" className="mt-2">
                  <Button outline className="mt-md-3 col-md-6 col-8 game-rules">
                    Game Rules
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
