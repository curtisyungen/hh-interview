import React, { Component } from "react";
import Color from "../components/Color/color";
// import "./DetailView.css";

class DetailView extends Component {
    render() {
        return (
            <div className="detailView">
                <Color
                    color={this.props.color}
                    getColor={this.props.getColor}
                    size={"large"}
                />

                {/* CLEAR BUTTON */}
                <button
                    className="btn btn-outline-dark clearBtn"
                    onClick={this.props.clearDisplay}
                >
                    Clear
                </button>
            </div>
        )
    }
}

export default DetailView;
