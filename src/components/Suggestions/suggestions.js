import React, { Component } from "react";
import Color from "../Color/color";
import "./suggestions.css";

class Suggestions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            suggestions: null,
        }
    }

    componentDidMount = () => {
        this.getSuggestions();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.getSuggestions();
        }
    }

    getSuggestions = () => {
        let hexCodes = this.props.hexCodes;
        let color = this.props.color;

        if (!hexCodes) {
            return;
        }

        let idx = hexCodes.indexOf(color);

        let suggestions = [];
        for (var c=1; c<6; c++) {
            suggestions.push(hexCodes[idx + c]);
        }

        this.setState({
            suggestions: suggestions,
        });
    }

    render() {
        return (
            <div className="suggestions">
                {this.state.suggestions && this.state.suggestions.length > 0 ? (
                    this.state.suggestions.map(color => (
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