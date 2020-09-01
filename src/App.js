import React, {useState} from 'react';
import ReactGA from 'react-ga';
import { SocialIcon } from 'react-social-icons';
import logo from './logo.svg';
import './App.css';

ReactGA.initialize('UA-142131045-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (
    <div className="App" >
      <header className="App-header">
        <VinylLogo />
        <br />
        <div style={ {backgroundColor: '#101010', borderRadius: 5, padding: 5} }>
          <SocialIcon target="_blank" style={ {margin: 5} } url="https://open.spotify.com/artist/051lPfOQwzIgcYgf6V7KyJ" />
          <SocialIcon target="_blank" style={ {margin: 5} } url="https://www.instagram.com/francislocura/" />
        </div>
      </header>
    </div>
  );
}

const VinylLogo = () => {
  const [rotation, setRotation] = useState(0);
  const [angle, setAngle] = useState(0);
  const dragStart = (e) => {
    e.preventDefault();
  }

  const rotateLogo = e => {
    const x = e.nativeEvent.clientX - (e.nativeEvent.target.offsetLeft + e.nativeEvent.target.offsetHeight * 0.5);
    const y = e.nativeEvent.target.offsetTop + e.nativeEvent.target.offsetWidth * 0.5 - e.nativeEvent.clientY;
    const pressed = e.nativeEvent.buttons === 1;
    const newAngle = Math.atan2(y, x) * 180 / Math.PI;
    if (pressed) {
      setRotation(rotation + angle - newAngle);
    }
    setAngle(newAngle);
  }

  const moveIn = e => {
    const x = e.nativeEvent.clientX - (e.nativeEvent.relatedTarget.offsetLeft + e.nativeEvent.relatedTarget.offsetHeight * 0.5);
    const y = e.nativeEvent.relatedTarget.offsetTop + e.nativeEvent.relatedTarget.offsetWidth * 0.5 - e.nativeEvent.clientY;
    setAngle(Math.atan2(y, x) * 180 / Math.PI);
  }

  const moveOut = e => {
    // console.log(e.nativeEvent);
    // setRotation(rotation + 90);
  }

  return (
    <img
      onDragStart={dragStart}
      onMouseMove={rotateLogo}
      onMouseEnter={moveIn}
      onMouseLeave={moveOut}
      src={logo}
      className="francis-locura-logo"
      style={{transform: `rotate(${rotation}deg)`}}
    />
  )
}

export default App;
