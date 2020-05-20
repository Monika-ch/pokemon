import React, { Component } from "react";
import "../css/Game.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function RandomGame(props) {
  return (
    <React.Fragment>
      <Link to="/">
        <Button size="lg" color="success" className="button">
          <i className="fa fa-home fa-lg" />
        </Button>
      </Link>

      <div className="container card-coming-soon">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h4>
              COMING S
              <img src="pokeball.png" height="30" width="30" alt="Pokeball" />
              <img src="pokeball.png" height="30" width="30" alt="Pokeball" />N
              . .
            </h4>
            <h6>Want to step up your POKE-BATTLES ?</h6>
            <p>
              Soon you will be able to challenge yourself by challenging random
              opponents for amazing POKE-BATTLES !
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RandomGame;
