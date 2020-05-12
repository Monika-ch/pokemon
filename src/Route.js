import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Main from './Components/Main';
import Home from './Components/Home';
import FriendGame from "./Components/FriendGame"
import RandomGame from "./Components/RandomGame"
import GameRules from "./Components/GameRules"

export default function Routes() {
    return (
      <Switch>
        <Route path="/pokemon" component={Main} />
        <Route path="/friendgame" component={FriendGame}/>
        <Route path="/randomgame" component={RandomGame}/>
        <Route path="/game_rules" component={GameRules}/>
        <Route path="/pokemon/:id" render={Main.pokemon}/>
        <Route exact path="/" component={Home} />
      </Switch>
    );
  }
  