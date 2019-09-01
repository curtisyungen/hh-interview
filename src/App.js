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
const COLOR_VARIATIONS = 15; // max value allowed is 20
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
    let chars = [];

    // Creates the 'characters', or the two-digit code that will 
    // be used to alter the hex codes to make different shades of colors
    let increment = Math.floor(100 / COLOR_VARIATIONS);
    let char = "";
    for (var i=0; i<COLOR_VARIATIONS; i++) {
      char = 0 + increment * i;
      if (char < 10) {
        char = `0${char}`;
      }
      chars.push(char);
    }

    // Creates slightly different shades of each base color and appends to hexCodes
    let code;
    for (var color=1; color<=9; color++) {
      for (var ch in chars) {
        switch(color) {
          case 1: code = `#${chars[ch]}0000`; break; // darkest, #000000
          case 2: code = `#ff${chars[ch]}00`; break; // red, #ff0000
          case 3: code = `#ffa5${chars[ch]}`; break; // orange, #ffa500
          case 4: code = `#ffff${chars[ch]}`; break; // yellow, #ffff00
          case 5: code = `#0080${chars[ch]}`; break; // green, #008000
          case 6: code = `#00${chars[ch]}ff`; break; // blue, #0000ff
          case 7: code = `#80${chars[ch]}80`; break; // purple, #800080
          case 8: code = `#6543${chars[ch]}`; break; // brown, #654321
          case 9: code = `#${chars[ch]}${chars[ch]}${chars[ch]}`; break; // gray, #808080
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
      view: "list",
    }, () => {
      this.getPages();                    // Calculate number of pages needed
      this.paginate(this.state.currPage); // Display appropriate number of results on page
    });
  }

  // Calculates number of pages needed for pagination based on RESULTS_PER_PAGE and total number of hex codes
  // codes parameter is optional and used for filtered searches
  getPages = (codes) => {
    let hexCodes = this.state.hexCodes;
    
    // If codes parameter isn't NULL, use codes passed into function to calculate number of pages
    // Otherwise, use all codes from hexCodes for page calculation
    if (codes && codes.length > 0) {
      hexCodes = codes;
    }
    
    let pages = [];

    for (var c=0; c <= (hexCodes.length / RESULTS_PER_PAGE); c++) {
      pages.push(c);
    }

    this.setState({
      pages: pages,
    });
  }

  // Gets hexCodes to display on page
  // Number of results shown = RESULTS_PER_PAGE
  // page parameter = current page number
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
  
  // Receives color name as string
  // Opens color in Detail View
  getColor = (color) => {
    this.setState({
      color: color.toLowerCase(),
      view: "detail",
    });
  }

  // Filters colors according to the color chosen from Sidebar menu
  // Displays in List View
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
    }, () => {
      this.getPages(filterCodes);
    });
  }

  // Displays list of colors matching user search input in List View
  searchForColor = (matches) => {
    this.setState({
      hexDisplay: matches,
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
    }, () => {
      this.getPages();
    });
  }

  render() {
    return (
      <Router>

        <div className="mainContainer">

          {/* NAVBAR, SIDEBAR */
          /* ====================================================== */}

          <Navbar 
            getColor={this.getColor}
            hexCodes={this.state.hexCodes}
            searchForColor={this.searchForColor}
            getPages={this.getPages}
            paginate={this.paginate}
          />

          <Sidebar
            getColor={this.filterColors}
            colorMenu={this.state.colorMenu}
            getRandomColor={this.getRandomColor}
            getAllColors={this.getHexCodes}
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
