import {
  SONG_REQUEST,
  SONG_SUCCESS,
  SONG_ERROR,
  PLAY_PAUSE,
  SET_SELECTED_SONG
} from './actions';
import { path } from '../page/App';

const initialState = {
  loadingSongs: false,
  error: false,
  songs: [],
  audio: new Audio(),
  selectedSong: 0,
  playing: false,
}

export const reducer = (state = initialState, action) => {
  const { audio, playing, selectedSong, songs, error } = state;
  const numSongs = songs.length;

  switch (action.type) {
    case SONG_REQUEST:
      return { ...state, loadingSongs: true, error: false };
    case SONG_SUCCESS:
      const { receivedSongs } = action;
      if (receivedSongs.length > selectedSong) {
        audio.src = `${path}/song/${receivedSongs[selectedSong]}`;
      }
      return { ...state, songs: receivedSongs, loadingSongs: false };
    case SONG_ERROR:
      const { e } = action;
      return { ...state, error: e, playing: false }
    case PLAY_PAUSE:
      if (numSongs === 0 || error) return state;
      if (playing) {
        audio.pause();
      } else {
        audio.play();
      }
      return { ...state, playing: !playing };
    case SET_SELECTED_SONG:
      if (numSongs === 0 || error) return state;
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
