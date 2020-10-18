import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFrameNow from '../hooks/useFrameNow';
import logo from '../static/logo.svg';
import FatArrow from '../static/fat_arrow.svg';
import { setPlayPause, setSelectedSong } from '../store/actions';

const VinylLogo = () => {
  const [startTime, setStartTime] = useState(0);
  const [pastLapse, setPastLapse] = useState(0);
  const playing = useSelector(state => state.playing);
  const dispatch = useDispatch();

  const frameNow = useFrameNow(playing);
  const currentLapse = playing ? Math.max(0, frameNow - startTime) : 0;
  const totalLapse = pastLapse + currentLapse;
  const rotation = (totalLapse * 0.3) % 360;

  async function handleClick() {
    if (playing) {
      setPastLapse(l => l + performance.now() - startTime);
      setStartTime(null);
    } else {
      setStartTime(performance.now());
    }
    dispatch(setPlayPause());
  }

  const dragStart = (e) => {
    e.preventDefault();
  }

  const nextSong = () => {
    dispatch(setSelectedSong(1));
  }

  const previousSong = () => {
    dispatch(setSelectedSong(-1));
  }

  return (
    <div id='vinyl-container'>
      <img
        onClick={previousSong}
        className='previous-icon'
        src={FatArrow}
        alt="Previous"
      />
        {
        <img
          onDragStart={dragStart}
          onClick={handleClick}
          src={logo}
          className='francis-locura-logo'
          style={{transform: `rotate(${rotation}deg)`, cursor: 'pointer'}}
          alt="Play"
        />}
        <img
          onClick={nextSong}
          className='next-icon'
          src={FatArrow}
          alt="Next"
        />
      </div>
  )
}

export default VinylLogo;
