import React, { Component } from "react";
import "../css/Game.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function FriendGame(props) {
  return (
    <React.Fragment>
      <div className="container card-coming-soon">
        <Link to="/">
          <Button size="lg" color="success" className="button">
            <i className="fa fa-home fa-lg" />{" "}
          </Button>
        </Link>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h5 className="card-title">GAME RULES</h5>
            <h6 className="card-text">
              Excited to know the rules of POKE-BATTLE ?
            </h6>
            <p>No worries ! You will soon get the updates !!</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FriendGame;
