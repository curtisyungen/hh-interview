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
    }
  }

  componentDidMount = () => {
    this.setState({
      color: DEFAULT_COLOR,
      colorMenu: COLOR_MENU,
    });
  }

  getColor = (color) => {
    this.setState({
      color: color,
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
          {this.state.color ? (
            <Color 
              color={this.state.color.toLowerCase()}
            />
          ) : (
            <></>
          )}
        </div>

      </div>
    )
  }
}

export default App;
