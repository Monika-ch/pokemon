import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Route";

const baseUrl = "/pokemon";

class App extends Component {
  render() {
    // Adding baseName so that the website works with github.io
    // see here:https://medium.com/@Dragonza/react-router-problem-with-gh-pages-c93a5e243819
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="outermost-wrapper">
          <div className="App">
            <Routes />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
