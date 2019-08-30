import React, { Component } from 'react';
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/sidebar";
import Color from "./components/Color/color";
import './App.css';

const DEFAULT_COLOR = "Blue";
const COLOR_MENU = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Brown", "Gray"];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      color: null,
      colorMenu: null,
      hexCodes: null,
      view: null,
    }
  }

  componentDidMount = () => {
    this.setState({
      color: DEFAULT_COLOR,
      colorMenu: COLOR_MENU,
      view: "detail",
    }, () => {
      this.getHexCodes();
    });
  }

  // Generates an array of 100 hex codes to populate color inventory
  getHexCodes = () => {
    let hexCodes = [];
    let chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

    let code, char, randIdx;
    while (hexCodes.length < 100) {
      code = "#";

      for (var c = 0; c < 6; c++) {
        randIdx = Math.floor(Math.random() * chars.length);
        char = chars[randIdx];
        code += char;
      }

      if (hexCodes.indexOf(code) === -1) {
        hexCodes.push(code);
      }
    }

    this.setState({
      hexCodes: hexCodes,
    }, () => {
      console.log(this.state);
    });
  }

  // Sets color when option is clicked in Sidebar menu
  // Receives color name as string
  // Toggles Detail View
  getColor = (color) => {
    this.setState({
      color: color.toLowerCase(),
      view: "detail",
    });
  }

  toggleView = (view) => {
    this.setState({
      view: view,
    });
  }

  // Clears main display of all colors
  clearDisplay = () => {
    this.setState({
      color: null,
    });
  }

  render() {
    return (
      <div className="mainContainer">

        <Navbar />

        <Sidebar
          getColor={this.getColor}
          colorMenu={this.state.colorMenu}
        />

        {/* VIEW TOGGLE BUTTONS */}
        <div className="btn-group viewBtns">
          <button
            type="button"
            className={`btn btn-outline-dark view-${this.state.view === "detail"}`}
            onClick={this.toggleView.bind(null, "detail")}
          >
            Detail
            </button>
          <button
            type="button"
            className={`btn btn-outline-dark view-${this.state.view === "list"}`}
            onClick={this.toggleView.bind(null, "list")}
          >
            List
            </button>
        </div>

        {/* MAIN DISPLAY */}
        {this.state.view === "detail" ? (

          // DETAIL VIEW

          <div className="colorDisplay">
            {this.state.color ? (
              <Color
                color={this.state.color}
                getColor={this.getColor}
                size={"large"}
              />
            ) : (
                <></>
              )}
          </div>
        ) : (

          // LIST VIEW

          <div className="colorList">
            {this.state.hexCodes && this.state.hexCodes.length > 0 ? (
              this.state.hexCodes.map(color => (
                <Color
                  key={color}
                  color={color}
                  getColor={this.getColor}
                  toggleView={this.toggleView}
                  size={"small"}
                />
              ))
            ) : (
                <></>
              )}
          </div>
        )}

        {/* CLEAR BUTTON */}
        <button
          className="btn btn-outline-dark clearBtn"
          onClick={this.clearDisplay}
        >
          Clear
        </button>

      </div>
    )
  }
}

export default App;
