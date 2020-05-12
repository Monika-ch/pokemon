import React, { Component } from 'react'
import { Button } from "reactstrap";
import { Link, Switch, Route } from 'react-router-dom';
import "../css/Home.css"


class Home extends Component {
    render() {
        return (
            <div>
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="col centerItems">
                                <h1>P<img src="/pokeball.png" height="50" width="50" alt="Pokeball" />kem<img src="/pokeball.png" height="50" width="50" alt="Pokeball" />n</h1>
                                <h3>..let the battle begin</h3>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="battleCard">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <h5>Choose Your Battle</h5>
                            </div>
                            <Link to="/pokemon" className="mt-3 col-7">
                                <Button color="danger" className="mt-3 p-3 col-10" onClick="">vs Computer</Button>
                            </Link>
                            <Link to="/friendgame" className="col-7">
                                <Button color="success" className="mt-4 p-3 col-10">vs A Friend</Button>
                            </Link>
                            <Link to="/randomgame" className="col-7">
                                <Button color="info" className="mt-4 p-3 col-10">vs Random Opponent</Button>
                            </Link>
                            <Link to="/game_rules" className="mt-2 col-7">
                                <Button outline className="mt-3 col-8 game-rules">Game Rules</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
