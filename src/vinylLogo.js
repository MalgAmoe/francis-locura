import React, {useState} from 'react';
import useFrameNow from './hooks/useFrameNow';
import logo from './logo.svg';

const VinylLogo = ({audio, isRunning, setIsRunning}) => {
  const [startTime, setStartTime] = useState(0);
  const [pastLapse, setPastLapse] = useState(0);

  const frameNow = useFrameNow(isRunning);
  const currentLapse = isRunning ? Math.max(0, frameNow - startTime) : 0;
  const totalLapse = pastLapse + currentLapse;
  const rotation = (totalLapse * 0.3) % 360;

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

export default VinylLogo;