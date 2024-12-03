import React, { useState, useEffect } from 'react';
import "./timer.css"
const OtpTimer = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    if (timeLeft > 0 && isTimerActive) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); // Cleanup on unmount or update
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      // Additional logic when timer expires (optional)
    }
  }, [timeLeft, isTimerActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formattedMinutes = minutes; // No leading zero
    const formattedSeconds = secs < 10 ? `0${secs}` : secs; // Leading zero for seconds
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const resetTimer = () => {
    setTimeLeft(300); // Reset to 5 minutes
    setIsTimerActive(true);
  };

  return (
   
      <h1 className="timer">
        Enter The OTP received in Email: {formatTime(timeLeft)}
      </h1>
    
  );
};

export default OtpTimer;
