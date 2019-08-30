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

                <nav aria-label="Page navigation example">
                    <ul className="pagination">

                        <li className="page-item">Previous</li>

                        {this.props.pages.map(page => (
                            <li className="page-item" onClick={this.props.paginate.bind(null, page)}>
                                {page}
                            </li>
                        ))}

                        <li className="page-item">Next</li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default ListView;
