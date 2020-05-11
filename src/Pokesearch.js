import React, { Component } from 'react'
import "./Pokesearch.css"

class Pokesearch extends Component {
    constructor(props) {
        super(props);

        this.state = {userInput: ""}
    }

    handleChange = (event) => {
        this.setState({userInput: event.target.value});
    }

    render() {
        return (
            <div className="Search">
                < input type = "text"
                placeholder = "Search Your Pokemon"
                value = {
                    this.state.userInput
                }
                onChange = {
                    this.handleChange
                }
                />
                <p>{this.state.userInput}</p>
            </div>
        );
    }
}



export default Pokesearch;