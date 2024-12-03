// src/Components/OTPInput/OTPInput.jsx

import React, { useState, useRef, useEffect } from 'react';
import "./OTPInput.css";

const OTPInput = ({ values,setValues }) => {
//   const [values, setValues] = useState(['', '', '', '','','']);
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;

    // Allow only numeric input
    if (isNaN(val)) {
      return;
    }

    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);

    // Move focus to the next input if value is not empty
    if (val !== '') {
      if (inputsRef.current[index + 1]) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyUp = (e, index) => {
    const key = e.key.toLowerCase();

    if (key === 'backspace' || key === 'delete') {
      const newValues = [...values];
      newValues[index] = '';
      setValues(newValues);

      // Move focus to the previous input
      if (inputsRef.current[index - 1]) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  // Effect to check if all OTP fields are filled
//   useEffect(() => {
//     if (values.every(val => val !== '')) {
//       const otp = values.join('');
//       onOTPComplete(otp);
//     }
//   }, [values, onOTPComplete]);

  return (
    <div id="inputs" className="inputs">
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          className="input"
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyUp={(e) => handleKeyUp(e, index)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
