import React from 'react';
import './App.css';
import Ticker from './components/Ticker';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src='https://cdn3.iconfinder.com/data/icons/cryptocurrency-and-bitcoin-3-1/512/883-13-512.png' className="App-logo" alt="logo" />

        <h2>Crypto Ticker</h2>
      </div>

      <div className="App-main">
        <Ticker></Ticker>
      </div>
    </div>
  );
}

export default App;
