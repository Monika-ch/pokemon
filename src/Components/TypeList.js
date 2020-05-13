import React, { Component } from 'react'
import "../css/TypeList.css"


class TypeList extends Component {
    render() {
        const typeWithCount = this.props.pokemon.map(x => x.type).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        
        return (
            <div className="TypeList">
                <h5 className="TypeList-title">You have . .</h5>
                <ul>
                    {Array.from(typeWithCount).map(([type, count]) => (
                        <div className="TypeList-data">
                            <span>{count} : </span>
                            <span>{type} type</span>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TypeList;