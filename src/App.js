import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/sidebar";
import DetailView from "./pages/DetailView";
import ListView from "./pages/ListView";
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
      <Router>
        <div className="mainContainer">

          <Navbar />

          <Sidebar
            getColor={this.getColor}
            colorMenu={this.state.colorMenu}
          />

          {/* VIEW TOGGLE BUTTONS */}
          <div className="btn-group viewBtns">
            <a
              className={`btn btn-outline-dark view-${this.state.view === "detail"}`}
              href="/detail"
            >
              Detail
          </a>
            <a
              className={`btn btn-outline-dark view-${this.state.view === "list"}`}
              href="/list"
            >
              List
          </a>
          </div>

          <Switch>
            <Route exact path="/" render={() =>
              <DetailView
                color={this.state.color}
                getColor={this.getColor}
                clearDisplay={this.clearDisplay}
              />
            } />

            <Route exact path="/detail" render={() =>
              <DetailView
                color={this.state.color}
                getColor={this.getColor}
                clearDisplay={this.clearDisplay}
              />
            } />

            <Route exact path="/list" render={() =>
              <ListView
                color={this.state.color}
                getColor={this.getColor}
                hexCodes={this.state.hexCodes}
              />
            } />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
