import React, { Component } from "react";
import Color from "../components/Color/color";
// import "./ListView.css";

class ListView extends Component {
    render() {
        return (
            <div className="listView">
                {this.props.hexCodes && this.props.hexCodes.length > 0 ? (
                    this.props.hexCodes.map(color => (
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
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default ListView;
