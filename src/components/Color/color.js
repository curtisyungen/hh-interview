import React, { Component } from "react";
import "./color.css";

class Color extends Component {
    render() {
        return (
            <div className="color">
                <div className="colorBackground" style={{background: this.props.color}}></div>
                <div className="colorName">{this.props.color}</div>
            </div>
        )
    }
}

export default Color;
