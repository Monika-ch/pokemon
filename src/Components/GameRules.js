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
            <i className="fa fa-home fa-lg" />{" "}
          </Button>
        </Link>
        <div className="container card-coming-soon">
          <div className="row justify-content-center">
            <div className="col-8">
              <h4>•◦•●✿ GAME RULES ✿●•◦•</h4>
              <p>
                Collect 4 sets of different types of pokemon, where 1 set = 3
                cards !
              </p>
              <p> or SCORE ➤ 2000 ! </p>
              <h6>
                <small>*Press 'r' for rules when in the game !</small>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FriendGame;
