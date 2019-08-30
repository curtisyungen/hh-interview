import React, { Component } from "react";
import "./sidebar.css";

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <button 
                    className="btn btn-light randomBtn"
                >
                    Random Color
                </button>
            </div>
        )
    }
}

export default Sidebar;
