import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSongs } from '../store/actions';

const ErrorTimer = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const dispatch = useDispatch();

  const error = useSelector(state => state.error);
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        if (timeLeft < 1) {
          getSongs()(dispatch);
          setTimeLeft(30);
        } else {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error, timeLeft, dispatch]);

  return (
    <div className='error'>
      {error
        ? <div><p>An Error has occurred, possibly you reloaded or changed song too many times in a short time.</p> <p>Wait {timeLeft} seconds to carry on listening.</p></div>
        : null
      }
    </div>
  )
}

export default ErrorTimer;
