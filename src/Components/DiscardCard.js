import React, { Component } from 'react'
import Pokecard from '../Pokecard'

export default class DiscardCard extends Component {
    render() {
        return (
            <div>
                <div>
                    <div>
                        <div>
                            <Pokecard
                                id={this.props.id}
                                name={this.props.name}
                                type={this.props.type}
                                exp={this.props.base_experience}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
