import {
  SONG_REQUEST,
  SONG_SUCCESS,
  SONG_ERROR,
  PLAY_PAUSE,
  SET_SELECTED_SONG,
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
  const { audio, playing, selectedSong } = state;
  switch (action.type) {
    case SONG_REQUEST:
      return { ...state, loadingSongs: true };
    case SONG_SUCCESS:
      const { songs } = action;
      if (songs.length > selectedSong) {
        audio.src = `${path}/song/${selectedSong}`;
      }
      return { ...state, songs, loadingSongs: false };
    case SONG_ERROR:
      const { error } = action;
      return { ...state, error }
    case PLAY_PAUSE:
      if (playing) {
        audio.pause();
      } else {
        audio.play();
      }
      return { ...state, playing: !playing };
    case SET_SELECTED_SONG:
      const newSelectedSong = (selectedSong + 1) % 2;
      audio.src = `${path}/song/${newSelectedSong}`;
      if (playing) {
        audio.play();
      }
      return { ...state, selectedSong: newSelectedSong };
    default:
      return state;
  }
}

export {
  initialState,
  reducer
}