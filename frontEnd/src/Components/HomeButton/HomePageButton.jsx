import React, { useContext } from "react";

import { AuthContext } from "../shared/context/auth-context.jsx";

import "./homepage-button.css";
function HomePageButton(props) {
  const auth = useContext(AuthContext);
  var classNames="button"
  if(props.gradiant){
    classNames+=" gradiant"
  }
  else{
    classNames+=" white"
  }
  return (

     <button style={props.style} className={classNames}>{props.Text}</button>
      
     
   
  );
}

export default HomePageButton;
