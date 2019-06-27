import React from 'react';
import ReactGA from 'react-ga';
import logo from './logo.svg';
import './App.css';

ReactGA.initialize('UA-142131045-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  function handleClick(e) {
    e.preventDefault();
  }
  return (
    <div className="App" onClick={(e) => handleClick(e)}>
      <header className="App-header">
        <img src={logo} className="francis-locura-logo" />
        <iframe title="soundcloud" height="350" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/686600874&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
      </header>
    </div>
  );
}

export default App;
