import React, { Component } from 'react';
import './App.css';
import MainRoute from './routers/mainRouter';


class App extends Component {
  render() {
    return (
      <div>
        <MainRoute/>
      </div>
    );
  }
}

export default App;
