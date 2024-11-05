import React from "react";
import "./Interaction-block.css";
import HomePageButton from "../HomeButton/HomePageButton";
function InteractionBlock(props) {

  return (
    <div style={{marginBottom:props.marginBottom,marginTop: props.marginTop, width:props.width, height: props.height}} className={`interaction-block ${props.center ? "centered" : "left-aligned"}`}>
        <h1 style={{fontSize:props.fontSize}} className="main-title">
          {props.title}
        

        </h1>
        <p className="description">
          {props.description}
        

        </p>
        <HomePageButton gradient={props.gradient} path={props.path} Text={props.buttonText} style={{width: props.buttonWidth,height: props.buttonHeight}}/>
    </div>
  )
   
}

export default InteractionBlock;
