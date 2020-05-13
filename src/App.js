import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Route";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
