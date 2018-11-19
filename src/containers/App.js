import React, { Component } from 'react';
// import logo from 'images/logo.svg';
import 'styles/App.css';
import Board from 'components/Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Tic-React-Toe</h1>
          { /* eslint-disable-next-line */ }
          <h5><a href="javascript:history.go(0)">Refresh</a> to Start New Game</h5>
          <Board />
        </header>
      </div>
    );
  }
}

export default App;
