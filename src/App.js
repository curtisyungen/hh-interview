import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/sidebar";
import DetailView from "./pages/DetailView";
import ListView from "./pages/ListView";
import './App.css';

const DEFAULT_VIEW = "list";
const DEFAULT_COLOR = "Red";
const COLOR_MENU = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Brown", "Gray"];
const COLOR_VARIATIONS = 10;
const RESULTS_PER_PAGE = 28;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      color: null,
      colorMenu: null,
      hexCodes: null,
      hexDisplay: null,
      view: null,
      currPage: null,
      pages: null,
    }
  }

  componentDidMount = () => {
    this.setState({
      color: DEFAULT_COLOR,
      colorMenu: COLOR_MENU,
      view: DEFAULT_VIEW,
      currPage: 0,
    }, () => {
      this.getHexCodes();
    });
  }

  // Generates an array of hex codes to populate color inventory
  getHexCodes = () => {
    let hexCodes = [];
    let chars = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45"];

    let code;
    // colors: #000000, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #800080, #654321, #808080
    for (var color=1; color<=9; color++) {
      for (var ch in chars) {
        switch(color) {
          case 1: code = `#${chars[ch]}0000`; break; // darkest
          case 2: code = `#ff${chars[ch]}00`; break; // red
          case 3: code = `#ffa5${chars[ch]}`; break; // orange
          case 4: code = `#ffff${chars[ch]}`; break; // yellow
          case 5: code = `#0080${chars[ch]}`; break; // green
          case 6: code = `#00${chars[ch]}ff`; break; // blue
          case 7: code = `#80${chars[ch]}80`; break; // purple
          case 8: code = `#6543${chars[ch]}`; break; // brown
          case 9: code = `#${chars[ch]}${chars[ch]}${chars[ch]}`; break; // gray
          default: code = "#ffffff";
        }

        // Ensure code is unique
        if (hexCodes.indexOf(code) === -1) {
          hexCodes.push(code);
        }
        
      }
    }

    this.setState({
      hexCodes: hexCodes,
    }, () => {
      this.getPages();                    // Calculate number of pages needed
      this.paginate(this.state.currPage); // Display appropriate number of results on page
    });
  }

  // Calculates number of pages needed for pagination based on RESULTS_PER_PAGE and total number of hex codes
  getPages = () => {
    let hexCodes = this.state.hexCodes;
    let pages = [];

    for (var c=0; c <= (hexCodes.length / RESULTS_PER_PAGE); c++) {
      pages.push(c);
    }

    this.setState({
      pages: pages,
    });
  }

  // Gets hexCodes to display page
  // Number of results shown = RESULTS_PER_PAGE
  paginate = (page) => {
    let currPage = page;
    let hexCodes = this.state.hexCodes;
    let hexDisplay = [];
    let startIdx = currPage * RESULTS_PER_PAGE;
    
    for (var i=0; i<RESULTS_PER_PAGE; i++) {
      hexDisplay.push(hexCodes[startIdx + i]);
    }

    this.setState({
      currPage: currPage,
      hexDisplay: hexDisplay,
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

  // Filters colors according to the color chosen from Sidebar menu
  filterColors = (color) => {
    let hexCodes = this.state.hexCodes;
    let startIdx = (COLOR_MENU.indexOf(color) + 1) * COLOR_VARIATIONS;

    let filterCodes = [];
    for (var i=0; i<COLOR_VARIATIONS; i++) {
      filterCodes.push(hexCodes[startIdx + i]);
    }

    this.setState({
      hexDisplay: filterCodes,
      view: "list",
    });
  }

  // Chooses a random color from hex code list to display in Detail View
  getRandomColor = () => {
    let hexCodes = this.state.hexCodes;
    let randIdx = Math.floor(Math.random() * hexCodes.length);
    let color = hexCodes[randIdx];

    this.getColor(color);
  }

  // Clears Detail View and redirects to List View
  clearDisplay = () => {
    this.setState({
      color: null,
      suggestions: null,
      view: "list",
    });
  }

  render() {
    return (
      <Router>

        <div className="mainContainer">

          {/* NAVBAR, SIDEBAR */
          /* ====================================================== */}

          <Navbar />

          <Sidebar
            getColor={this.filterColors}
            colorMenu={this.state.colorMenu}
            getRandomColor={this.getRandomColor}
          />

          {/* REDIRECTS */
          /* ====================================================== */}

          {this.state.view === "detail" ? (
            <Redirect 
              to="/detail"
            />
          ) : (
            <></>
          )}       

          {this.state.view === "list" ? (
            <Redirect 
              to="/list"
            />
          ) : (
            <></>
          )}    

          {/* PAGE ROUTES */
          /* ====================================================== */}  

          <Switch>
            <Route exact path="/" render={() =>
              <ListView
                color={this.state.color}
                getColor={this.getColor}
                hexDisplay={this.state.hexDisplay}
                currPage={this.state.currPage}
                pages={this.state.pages}
                paginate={this.paginate}
              />
            } />

            <Route exact path="/detail" render={() =>
              <DetailView
                color={this.state.color}
                getColor={this.getColor}
                hexCodes={this.state.hexCodes}
                clearDisplay={this.clearDisplay}
              />
            } />

            <Route exact path="/list" render={() =>
              <ListView
                color={this.state.color}
                getColor={this.getColor}
                hexDisplay={this.state.hexDisplay}
                currPage={this.state.currPage}
                pages={this.state.pages}
                paginate={this.paginate}
              />
            } />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
