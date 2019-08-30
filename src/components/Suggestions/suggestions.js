import React, { Component } from "react";
import Color from "../Color/color";
import "./suggestions.css";

class Suggestions extends Component {
    render() {
        return (
            <div className="suggestions">
                {this.props.suggestions && this.props.suggestions.length > 0 ? (
                    this.props.suggestions.map(color => (
                        <Color
                            color={color}
                            getColor={this.props.getColor}
                            size={"small"}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

export default Suggestions;