import {useState, useEffect} from 'react';

export default (isActive) => {
  const [now, setNow] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    function tick() {
      if (!isActive) return;
      setNow(performance.now());
      requestAnimationFrame(tick);
    }

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [isActive]);

  return now;
}