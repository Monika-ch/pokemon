import React, { Component } from "react";
import "../css/ScoreList.css";

class ScoreList extends Component {
  render() {
    const typeWithCount = Array.from(
      this.props.pokemon
        .map((x) => x.type)
        .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
    );
    let playerName = "YOU";
    if (this.props.isComputer) {
      playerName = "COMPUTER";
    }
    return (
      <div>
        <h5 className="ScoreList-title">{playerName}</h5>
        <div className="Score">
          <h6>
            SCORE : <span className="scoreCount">{this.props.exp}</span>
          </h6>
        </div>
        <div className="ScoreList-content">
          <ul>
            {typeWithCount.map(([type, count]) => (
              <div className="ScoreList-data">
                <span className="count">{count} </span>
                <span className="type">{type} type</span>
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ScoreList;
