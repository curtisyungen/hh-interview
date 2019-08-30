import React, { Component } from "react";
import "./navbar.css";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark justify-content-between">
                <img src={require("../../images/logo-symbol.svg")} alt="logo" />
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                </form>
            </nav>
        )
    }
}

export default Navbar;
