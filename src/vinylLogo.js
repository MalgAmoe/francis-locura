import React, {useState} from 'react';
import useFrameNow from './hooks/useFrameNow';
import logo from './static/logo.svg';
import { setPlayPause } from './actions';

const VinylLogo = ({ playing, dispatch }) => {
  const [startTime, setStartTime] = useState(0);
  const [pastLapse, setPastLapse] = useState(0);

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

export default VinylLogo;