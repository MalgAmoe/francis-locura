import axios from 'axios';
import { path } from '../page/App';

export const SONG_REQUEST = 'SONG_REQUEST';
export const SONG_SUCCESS = 'SONG_SUCCESS';
export const SONG_ERROR = 'SONG_ERROR';
const songRequest = () => ({ type: SONG_REQUEST });
const songSuccess = receivedSongs => ({ type: SONG_SUCCESS, receivedSongs });
export const songError = e => ({ type: SONG_ERROR, e });

export const SET_AUDIO = 'SET_AUDIO';
export const SET_IS_RUNNING = 'SET_IS_RUNNING';
export const getSongs = () => async dispatch => {
  dispatch(songRequest());
  try {
    const { data } = await axios.get(`${path}/songs`);
    dispatch(songSuccess(data));
  } catch (_) {
    dispatch(songError(true));
  }
};

export const PLAY_PAUSE = 'PLAY_PAUSE';
export const setPlayPause = () => ({ type: PLAY_PAUSE });

export const SET_SELECTED_SONG = 'SET_SELECTED_SONG';
export const setSelectedSong = () => ({ type: SET_SELECTED_SONG });
