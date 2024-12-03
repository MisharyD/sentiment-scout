
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import "./progress-bar.css"

function ProgressBar({ progress, message }) {
  const [width, setWidth] = useState(1);

  useEffect(() => {
    let intervalId;
    if (width < progress) {
      intervalId = setInterval(() => {
        setWidth(prevWidth => {
          const newWidth = prevWidth + 1;
          if (newWidth >= progress) {
            clearInterval(intervalId);
            return progress;
          } else {
            return newWidth;
          }
        });
      }, 10);
    } else if (width > progress) {
      setWidth(progress);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [progress, width]);

  const progressContainerStyle = {
    width: '70%',

    backgroundColor: '#ddd',
    borderRadius: '5px',
    display: width >= 100 ? 'none' : 'block',
  };

  const progressBarStyle = {
    width: `${width}%`,
    height: '30px',
    background: 'linear-gradient(45deg, #7b2ff7, #4bb0ff)',
    borderRadius: '5px',
  };

  return (
    <div className='progress-bar-container'>
      <div className='progress-bar-message'>{message} {progress}%</div>
      <div style={progressContainerStyle}>
        <div style={progressBarStyle}></div>
      </div>
    </div>
  );
}

export default ProgressBar;
