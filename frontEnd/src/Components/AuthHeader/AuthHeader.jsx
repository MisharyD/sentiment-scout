import React from "react";
import './auth-header.css'
function AuthHeader(props){
return <h1 id='auth-header' style={{marginBottom: props.marginBottom}}> {props.text}</h1>
}

export default AuthHeader