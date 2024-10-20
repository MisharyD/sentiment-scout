import React from "react";
import './auth-options.css'
import { Link } from "react-router-dom";

function AuthOption(props){
    return (
    <div id='auth-option'>
        <h6 id='or'>-OR-</h6>
        <p id='cta-prompt'>{props.ctaPrompt} <Link className="prompt" to={props.path}>{props.prompt}</Link></p>

    </div>)
}

export default AuthOption