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
    }
  }

  componentDidMount = () => {
    this.setState({
      color: DEFAULT_COLOR,
      colorMenu: COLOR_MENU,
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

      for (var c=0; c<6; c++) {
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
  getColor = (color) => {
    this.setState({
      color: color.toLowerCase(),
    });
  }

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

        <div className="colorDisplay">
            <Color 
              color={this.state.color}
              size={"large"}
            />
        </div>

        <div className="colorList">
            {this.state.hexCodes && this.state.hexCodes.length > 0 ? (
              this.state.hexCodes.map(color => (
                <Color
                  key={color}
                  color={color}
                  size={"small"}
                />
              ))
            ) : (
              <></>
            )}
        </div>

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
