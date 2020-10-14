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

export const reducer = (state = initialState, action) => {
  const { audio, playing, selectedSong, songs } = state;
  const numSongs = songs.length;

  switch (action.type) {
    case SONG_REQUEST:
      return { ...state, loadingSongs: true };
    case SONG_SUCCESS:
      const { receivedSongs } = action;
      if (receivedSongs.length > selectedSong) {
        audio.src = `${path}/song/${receivedSongs[selectedSong]}`;
      }
      return { ...state, songs: receivedSongs, loadingSongs: false };
    case SONG_ERROR:
      const { error } = action;
      return { ...state, error }
    case PLAY_PAUSE:
      if (numSongs === 0) return state;
      if (playing) {
        audio.pause();
      } else {
        audio.play();
      }
      return { ...state, playing: !playing };
    case SET_SELECTED_SONG:
      const newSelectedSong = (selectedSong + 1) % numSongs;
      audio.src = `${path}/song/${songs[newSelectedSong]}`;
      if (playing) {
        audio.play();
      }
      return { ...state, selectedSong: newSelectedSong };
    default:
      return state;
  }
}
