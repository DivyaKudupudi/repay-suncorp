import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import HeaderNav from './components/HeaderNavigationComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Suncorp</h1>
        </header>
        </div>
        <div>
          <HeaderNav/>
        </div>        
      </div>
    );
  }
}

export default App;
