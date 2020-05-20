import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Route";
import PokemonCache from "./PokemonCache";
const baseUrl = "/pokemon";
class App extends Component {
  // COMMENT: Remove the line just below this before testing
  static pokemonCache = new PokemonCache();
  render() {
    // Adding baseName so that the website works with github.icon
    // see here:https://medium.com/@Dragonza/react-router-problem-with-gh-pages-c93a5e243819
    return (
      <BrowserRouter basename={baseUrl}>
        <div className="App">
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
