import React from "react";
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
          <div className="col-md-6 col-8">
            <h4>. . CØMING SØØN . .</h4>
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
