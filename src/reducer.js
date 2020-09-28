import {
  SONG_REQUEST,
  SONG_SUCCESS,
  SONG_ERROR,
  PLAY_PAUSE,
} from './actions';
import { path } from './App';

const initialState = {
  loadingSongs: false,
  error: null,
  songs: [],
  audio: new Audio(),
  selectedSong: 0,
  playing: false,
}

const reducer = (state, action) => {
  const { audio } = state;
  switch (action.type) {
    case SONG_REQUEST:
      return { ...state, loadingSongs: true };
    case SONG_SUCCESS:
      const { songs } = action;
      const { selectedSong } = state;
      if (songs.length > selectedSong) {
        audio.src = `${path}/song/${selectedSong}`;
      }
      return { ...state, songs, loadingSongs: false };
    case SONG_ERROR:
      const { error } = action;
      return { ...state, error }
    case PLAY_PAUSE:
      const { playing } = state;
      if (playing) {
        audio.pause();
      } else {
        audio.play();
      }
      return { ...state, playing: !playing }
    default:
      return state;
  }
}

export {
  initialState,
  reducer
}