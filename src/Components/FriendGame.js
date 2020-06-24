import React from "react";
import "../css/Game.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function FriendGame(props) {
  return (
    <React.Fragment>
      <div className="friend-wrapper">
        <Link to="/">
          <Button size="lg" color="success" className="button">
            <i className="fa fa-home fa-lg" />
          </Button>
        </Link>
        <div className="container card-coming-soon">
          <div className="row justify-content-center">
            <div className="col-md-6 col-8">
              <h4>. . CØMING SØØN . .</h4>
              <h6>Want to have a POKE-BATTLE with friends ? </h6>
              <p>
                No worries ! Soon you will be able to invite and challenge your
                friends for the amazing POKE-BATTLES !
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FriendGame;
