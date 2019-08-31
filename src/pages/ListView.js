import React, { Component } from "react";
import Color from "../components/Color/color";
import "./ListView.css";

class ListView extends Component {
    render() {
        return (
            <div className="listView">
                {this.props.hexDisplay && this.props.hexDisplay.length > 0 ? (
                    this.props.hexDisplay.map(color => (
                        <Color
                            key={color}
                            color={color}
                            getColor={this.props.getColor}
                            size={"small"}
                        />
                    ))
                ) : (
                    <></>
                )}

                {/* PAGINATION */}
                <nav className="paginationBar">
                    <ul className="pagination">
                        {this.props.pages ? (
                            this.props.pages.map(page => (
                                <li 
                                    key={page}
                                    className={`page-item page-${this.props.currPage === page}`}
                                    onClick={this.props.paginate.bind(null, page)}
                                >
                                    {page}
                                </li>
                            ))
                        ) : (
                            <></>
                        )}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default ListView;
