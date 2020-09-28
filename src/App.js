import React, { useEffect, useReducer } from 'react';
import ReactGA from 'react-ga';
import { SocialIcon } from 'react-social-icons';

import { reducer, initialState } from './reducer';
import { getSongs, setSelectedSong } from './actions';
import VinylLogo from './vinylLogo';

import './App.css';

ReactGA.initialize('UA-142131045-1', {
  gaOptions: { cookieFlags: 'max-age=7200;secure;samesite=none'}
});
ReactGA.pageview(window.location.pathname + window.location.search);

export const path = 'http://localhost:4500';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { songs, playing, selectedSong } = state;

  useEffect(() => {
    getSongs()(dispatch);
  }, []);

  const songTitle = songs[selectedSong] ? songs[selectedSong] : 'Loading...'

  const changeSong = () => {
    dispatch(setSelectedSong());
  }

  return (
    <div className='App' >
      <header className='App-header'>
        <VinylLogo
          selectedSong={selectedSong}
          songs={songs}
          playing={playing}
          dispatch={dispatch}
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

export default App;
