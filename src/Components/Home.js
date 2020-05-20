import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link, Switch, Route } from "react-router-dom";
import "../css/Home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="container">
            <div className="row">
              <div className="col centerItems">
                <h1>
                  P
                  <img
                    src="pokeball.png"
                    height="50"
                    width="50"
                    alt="Pokeball"
                  />
                  kem
                  <img
                    src="pokeball.png"
                    height="50"
                    width="50"
                    alt="Pokeball"
                  />
                  n
                </h1>
                <h3>..let the battle begin</h3>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="battleCard">
            <div className="row justify-content-center">
              <div className="col-8 mb-2">
                <h5>Choose Your Battle</h5>
              </div>
              <div className="col-12">
                <Link to="/pokemon">
                  <Button outline color="danger" className="mt-2 p-2 col-6">
                    vs Computer
                  </Button>
                </Link>
                <br />
                <Link to="/friendgame">
                  <Button outline color="warning" className="mt-3 p-2 col-6">
                    vs A Friend
                  </Button>
                </Link>
                <br />
                <Link to="/randomgame">
                  <Button
                    outline
                    color="success"
                    className="mt-3 mb-2 p-2 col-6"
                  >
                    vs Random Opponent
                  </Button>
                </Link>
                <br />
                <Link to="/game_rules" className="mt-2">
                  <Button outline className="mt-3 col-6 game-rules">
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
