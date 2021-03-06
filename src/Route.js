import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./Components/Main";
import Home from "./Components/Home";
import FriendGame from "./Components/FriendGame";
import RandomGame from "./Components/RandomGame";
import GameRules from "./Components/GameRules";
import { ConfigureStore } from "./redux/configureStore";
import { Provider } from "react-redux";

const store = ConfigureStore();
export default function Routes() {
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/pokemon" component={Main} />
        <Route path="/friendgame" component={FriendGame} />
        <Route path="/randomgame" component={RandomGame} />
        <Route path="/game_rules" component={GameRules} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Provider>
  );
}
