import React, { Component } from "react";
import "./color.css";

class Color extends Component {
    render() {
        return (
            <div className="color" style={{background: this.props.color}}>
                {this.props.color}
            </div>
        )
    }
}

export default Color;
