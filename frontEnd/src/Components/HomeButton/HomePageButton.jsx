import React, { useContext } from "react";

import { AuthContext } from "../shared/context/auth-context.jsx";
import { Link } from "react-router-dom";
import "./homepage-button.css";
function HomePageButton(props) {
  const auth = useContext(AuthContext);
  var classNames="button"
  if(props.gradient){
    classNames+=" gradient"
  }
  else{
    classNames+=" white"
  }
  return (

     <Link to={props.path} style={props.style} className={classNames}>{props.Text}</Link>
      
     
   
  );
}

export default HomePageButton;
