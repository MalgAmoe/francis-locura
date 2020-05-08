import React from 'react';
import ReactGA from 'react-ga';
import { SocialIcon } from 'react-social-icons';
import logo from './logo.svg';
import './App.css';

ReactGA.initialize('UA-142131045-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  function handleClick(e) {
    e.preventDefault();
  }
  return (
    <div className="App" >
      <header className="App-header">
        <img onClick={(e) => handleClick(e)} src={logo} className="francis-locura-logo" />
        <br />
        <div style={ {backgroundColor: '#F5692C', borderRadius: 5, padding: 5} }>
          <SocialIcon target="_blank" style={ {margin: 5} } url="https://open.spotify.com/artist/051lPfOQwzIgcYgf6V7KyJ" />
          <SocialIcon target="_blank" style={ {margin: 5} } url="https://www.instagram.com/francislocura/" />
        </div>
      </header>
    </div>
  );
}

export default App;
