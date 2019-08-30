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
const RESULTS_PER_PAGE = 35;

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

  // Generates an array of 100 hex codes to populate color inventory
  getHexCodes = () => {
    let hexCodes = [];
    let code;
    let chars = ["00", "20", "40", "60", "80", "aa", "bb", "cc", "dd", "ee", "ff"];

    // #000000, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #800080, #654321, #808080
    for (var i=1; i<10; i++) {
      for (var ch in chars) {
        switch(i) {
          case 1: code = `#${chars[ch]}0000`; break;
          case 2: code = `#ff${chars[ch]}00`; break;
          case 3: code = `#ffa5${chars[ch]}`; break;
          case 4: code = `#ffff${chars[ch]}`; break;
          case 5: code = `#0080${chars[ch]}`; break;
          case 6: code = `#00${chars[ch]}ff`; break;
          case 7: code = `#80${chars[ch]}80`; break;
          case 8: code = `#6543${chars[ch]}`; break;
          case 9: code = `#${chars[ch]}${chars[ch]}${chars[ch]}`; break;
          default: code = "#ffffff";
        }

        if (hexCodes.indexOf(code) === -1) {
          hexCodes.push(code);
        }
        
      }
    }

    this.setState({
      hexCodes: hexCodes,
    }, () => {
      this.getPages();
      this.paginate(this.state.currPage);
    });
  }

  // Calculates number of pages needed for pagination based on RESULTS_PER_PAGE
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

  // Sets color when option is clicked in Sidebar menu
  // Receives color name as string
  // Toggles Detail View
  getColor = (color) => {
    this.setState({
      color: color.toLowerCase(),
      view: "detail",
    });
  }

  // Toggles between Detail and List views
  toggleView = (view) => {
    this.setState({
      view: view,
    });
  }

  // Clears Detail View and redirects to List View
  clearDisplay = () => {
    this.setState({
      color: null,
      suggestions: null,
      view: "list",
    });
  }

  // Gets hexCode results to display on current page
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

  render() {
    return (
      <Router>

        <div className="mainContainer">

          {/* NAVBAR, SIDEBAR */
          /* ====================================================== */}

          <Navbar />

          <Sidebar
            getColor={this.getColor}
            colorMenu={this.state.colorMenu}
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
                suggestions={this.state.hexCodes}
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
