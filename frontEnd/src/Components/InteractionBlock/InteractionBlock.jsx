import React from "react";
import "./interaction-block.css";
import { Link } from "react-router-dom";
import "./interaction-block.css";

function InteractionBlock(props) {
//{{marginBottom:props.marginBottom,marginTop: props.marginTop, width:props.width, height: props.height}}
  return (
    <div className={`interaction-block ${props.center ? "centered" : "left-aligned"}`}>
        <h1 className="main-title">
          {props.title}
        

        </h1>
        <p className="description">
          {props.description}
        

        </p>
        {/* <HomePageButton gradient={props.gradient} path={props.path} Text={props.buttonText} style={{width: props.buttonWidth,height: props.buttonHeight}}/>
         */}
     <Link to={props.path} style={props.style} className={"button "+(props.gradient? "gradient":"white")}>{props.buttonText}</Link>
  
    </div>
  )
   
}

export default InteractionBlock;
