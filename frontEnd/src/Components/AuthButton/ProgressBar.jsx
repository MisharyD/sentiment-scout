import React, { useState, useEffect, useRef } from 'react';

function ProgressBar() {
  const [width, setWidth] = useState(1);
  const intervalIdRef = useRef(null);

  function move() {
    moveTo(99);
  }

  function moveEnd() {
    moveTo(100);
  }

  function moveTo(target) {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = setInterval(() => {
      setWidth(prevWidth => {
        if (prevWidth >= target) {
          clearInterval(intervalIdRef.current);
          return prevWidth;
        } else {
          return prevWidth + 1;
        }
      });
    }, 10);
  }

  // Clean up the interval on component unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  const progressContainerStyle = {
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: '5px',
  };

  const progressBarStyle = {
    width: `${width}%`,
    height: '30px',
    background: 'linear-gradient(45deg, #7b2ff7, #4bb0ff)',
    borderRadius: '5px',
  };

  return (
    <div>
      <h1>JavaScript Progress Bar</h1>
      <div style={progressContainerStyle}>
        <div style={progressBarStyle}></div>
      </div>
      <br />
      <button onClick={move}>Click Me</button>
      <button onClick={moveEnd}>Complete</button>
    </div>
  );
}

export default ProgressBar;
