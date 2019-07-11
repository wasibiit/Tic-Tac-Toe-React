import React from 'react';
import './App.css';
import logo from './logo.svg';
import Game from './components/Game';

const App = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
            Tic Toc Toe
      </header>
      <Game />
    </div>
    
  );
}

export default App;
