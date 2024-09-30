import React from "react";
import "./Auth-input.css";

function AuthInput(props) {
  const errorMessageStyle={}
  return (
    <div className="input-container">
        <label htmlFor={props.name} className='auth-label'>
        {props.label}
        </label>
        <input className={`auth-input ${props.error ? 'auth-input-error' : ''}`} value={props.value} onChange={props.onChange} id={props.name} name={props.name} type={props.type} placeholder={props.placeholder}/>
        {props.error && props.errorMessage && (<p className="auth-input-error-message">{props.errorMessage}</p>)}
    </div>
  )
   
}

export default AuthInput;
