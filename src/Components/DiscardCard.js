import React, { Component } from "react";
import Pokecard from "./Pokecard";
import "../css/DiscardCard.css";

// export default class DiscardCard extends Component {
//   render() {
//     return (
//       <div>
//         <div>
//           <div>
//             <Pokecard
//               id={this.props.id}
//               name={this.props.name}
//               type={this.props.type}
//               exp={this.props.base_experience}
//               usedAs="DiscardedCardUsage"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

const POKE_API = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

let padToThree = (number) => (number <= 999 ? `00${number}`.slice(-3) : number);

export default class DiscardCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imgSrc = `${POKE_API}${padToThree(this.props.id)}.png`;
    let width = 130;
    let hidePokemonDetails = false;

    if (this.props.id == -1) {
      imgSrc = "transparent-pokemon-2.png";
      width = 110;
      hidePokemonDetails = true;
    }

    return (
      <div className="DiscardCard">
        <div className="DiscardCard-data" hidden={hidePokemonDetails}>
          Type: {this.props.type}
        </div>
        <div className="DiscardCard-data" hidden={hidePokemonDetails}>
          EXP: {this.props.base_experience}
        </div>
        <div className="DiscardCard-image">
          <img src={imgSrc} alt={this.props.name} width={width} />
        </div>
        <h6 className="DiscardCard-title" hidden={hidePokemonDetails}>
          {this.props.name}
        </h6>
      </div>
    );
  }
}
