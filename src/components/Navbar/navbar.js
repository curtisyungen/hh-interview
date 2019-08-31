import React, { Component } from "react";
import SearchSuggestions from "../SearchSuggestions/searchSuggestions";
import "./navbar.css";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: null,
            showSuggestions: false,
            searchTerm: null,
            matches: null,
        }   
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value,
        }, () => {
            if (value !== null && value !== "") {
                this.showSuggestions();
            }
            else {
                this.hideSuggestions();
            }
        });
    }

    showSuggestions = () => {
        this.setState({
            showSuggestions: true,
        }, () => {
            this.getSuggestions();
        });
    }

    hideSuggestions = () => {
        this.setState({
            showSuggestions: false,
        });
    }

    getSuggestions = () => {
        let searchTerm = this.state.searchTerm;
        let hexCodes = this.props.hexCodes;

        let matches = [];
        let count = 0;
        if (searchTerm !== null && searchTerm !== "") {
            while (matches.length < 10 && count < hexCodes.length) {
                if (hexCodes[count].indexOf(searchTerm) > -1) {
                    matches.push(hexCodes[count]);
                }

                count += 1;
            }
        }

        this.setState({
            matches: matches,
        });
    }

    selectMatch = (match) => {
        this.hideSuggestions();

        this.setState({
            searchTerm: match,
        });
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark justify-content-between">
                <img className="logo" src={require("../../images/logo-symbol.svg")} alt="logo" />
                <form className="form-inline searchBox">
                    <input 
                        autoComplete="off"
                        className="form-control mr-sm-2" 
                        name="searchTerm"
                        type="search" 
                        placeholder="Search for hex code" 
                        aria-label="Search"
                        onChange={this.handleInputChange}
                        value={this.state.searchTerm}
                    />
                </form>

                {this.state.showSuggestions && this.state.matches && this.state.matches.length > 0 ? (
                    <SearchSuggestions 
                        hideSuggestions={this.hideSuggestions}
                        matches={this.state.matches}
                        selectMatch={this.selectMatch}
                        getColor={this.props.getColor}
                    />
                ) : (
                    <></>
                )}
            </nav>
        )
    }
}

export default Navbar;
