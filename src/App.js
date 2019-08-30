import React, { Component } from 'react';
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/sidebar";
// import Modal from "react-responsive-modal";
// import Color from "./components/Color/color";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount = () => {

  }

  render() {
    return (
      <div className="mainContainer">
        <Navbar />
        <Sidebar />
      </div>
    )
  }
}

export default App;
