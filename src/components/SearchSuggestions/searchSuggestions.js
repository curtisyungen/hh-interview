import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import "./searchSuggestions.css";

class SearchSuggestions extends Component {
    handleClickOutside = (event) => {
        event.preventDefault();
        this.props.hideSuggestions();
    }

    render() {
        return (
            <div className="searchSuggestions">
                {this.props.matches && this.props.matches.length > 0 ? (
                    this.props.matches.map(match => (
                        <div 
                            key={match}
                            className="suggestion"
                            onClick={this.props.getColor.bind(null, match)}
                        >
                            {match}
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

export default onClickOutside(SearchSuggestions);