import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { SocialIcon } from 'react-social-icons';
import { useDispatch, useSelector } from 'react-redux';

import { getSongs, setSelectedSong, songError } from '../store/actions';
import VinylLogo from '../organism/vinylLogo';
import PlayTitle from '../organism/playTitle';

import './App.css';

if (process.env.REACT_APP_ENV === 'PROD') {
  ReactGA.initialize('UA-142131045-1', {
    gaOptions: { cookieFlags: 'max-age=7200;secure;samesite=none'}
  });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

export const path = process.env.REACT_APP_SERVER_URL;

function App() {
  const selectedSong = useSelector(state => state.selectedSong);
  const songs = useSelector(state => state.songs);
  const audio = useSelector(state => state.audio);
  const dispatch = useDispatch();
  audio.onended = function(){
    changeSong();
  };
  audio.onerror = function(){
    dispatch(songError(true))
  }

  useEffect(() => {
      getSongs()(dispatch);
  }, [dispatch]);

  const songTitle = songs[selectedSong] ? songs[selectedSong] : 'Loading...'

  const changeSong = () => {
    dispatch(setSelectedSong(1));
  }

  return (
    <div className='App' >
      <header className='App-header'>
        <PlayTitle  />
        <div className='page-title'></div>
        <VinylLogo />
        <br />
        <h2
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
