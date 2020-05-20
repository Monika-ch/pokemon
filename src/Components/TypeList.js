import React, { Component } from "react";
import "../css/TypeList.css";

class TypeList extends Component {
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
        <h5 className="TypeList-title">{playerName}</h5>
        <ul>
          {typeWithCount.map(([type, count]) => (
            <div className="TypeList-data">
              <span className="count">{count} </span>
              <span className="type">{type} type</span>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default TypeList;
