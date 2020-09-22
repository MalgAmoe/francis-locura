import React, {useState, useEffect} from 'react';
import ReactGA from 'react-ga';
import { SocialIcon } from 'react-social-icons';
import logo from './logo.svg';
import './App.css';

ReactGA.initialize('UA-142131045-1', {
  gaOptions: { cookieFlags: 'max-age=7200;secure;samesite=none'}
});
ReactGA.pageview(window.location.pathname + window.location.search);

const path = 'http://localhost:4500';

function App() {
  const [songs, setSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [selectedSong, setSelectedSong] = useState(0);

  useEffect(() => {
    function fetchSongs() {
      return fetch(`${path}/songs`)
        .then(data => data.json())
        .then(json => {
          setSongs(json);
        });
    }
    fetchSongs();
    setAudio(new Audio());
  }, []);

  useEffect(() => {
    if (songs.length > 1) {
      audio.src = `${path}/song/${selectedSong}`;
    }
  }, [selectedSong, songs, audio])

  const changeSong = () => {
    if (songs.length > 1) {
      setSelectedSong((selectedSong + 1) % 2);
    }
  }

  const songTitle = songs[selectedSong] ? songs[selectedSong] : 'Loading...'

  return (
    <div className='App' >
      <header className='App-header'>
        <VinylLogo
          audio={audio}
        />
        <br />
        <h2
          onClick={changeSong}
          className='song-title'>
            {songTitle}
        </h2>
        <div style={ {backgroundColor: '#101010', borderRadius: 5, padding: 5} }>
          <SocialIcon target='_blank' style={ {margin: 5} } url='https://open.spotify.com/artist/051lPfOQwzIgcYgf6V7KyJ' />
          <SocialIcon target='_blank' style={ {margin: 5} } url='https://www.instagram.com/francislocura/' />
          <SocialIcon target='_blank' style={ {margin: 5} } url='https://www.youtube.com/channel/UCFT0iO_UsPoOV-k04X8XjDw' />
        </div>
      </header>
    </div>
  );
}

function useFrameNow(isActive) {
  const [now, setNow] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    function tick() {
      if (!isActive) return;
      setNow(performance.now());
      requestAnimationFrame(tick);
    }

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [isActive]);

  return now;
}

const VinylLogo = ({songTitle, audio}) => {
  const [startTime, setStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pastLapse, setPastLapse] = useState(0);

  const frameNow = useFrameNow(isRunning);
  const currentLapse = isRunning ? Math.max(0, frameNow - startTime) : 0;
  const totalLapse = pastLapse + currentLapse;
  const rotation = (totalLapse * 0.5) % 360;

  async function handleClick() {
    if (isRunning) {
      setPastLapse(l => l + performance.now() - startTime);
      setStartTime(null);
      audio.pause();
    } else {
      setStartTime(performance.now());
      audio.play();
    }
    setIsRunning(!isRunning);
  }

  const dragStart = (e) => {
    e.preventDefault();
  }

  return (
    <div>
        {// eslint-disable-next-line jsx-a11y/alt-text
        <img
          onDragStart={dragStart}
          onClick={handleClick}
          src={logo}
          className='francis-locura-logo'
          style={{transform: `rotate(${rotation}deg)`, cursor: 'pointer'}}
        />}
      </div>
  )
}

export default App;
