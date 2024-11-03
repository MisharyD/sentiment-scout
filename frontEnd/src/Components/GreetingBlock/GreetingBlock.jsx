import React from "react";
import "./greeting-block.css";
import HomePageButton from "../HomeButton/HomePageButton";
function GreetingBlock(props) {

  return (
    <div style={{marginBottom:"20%"}} className="greeting-block">
        <h1 style={{fontSize:props.fontSize}} className="main-title">
          {props.title}
        

        </h1>
        <p className="description">
          {props.description}
        

        </p>
        <HomePageButton Text="Get Started" gradiant={true} style={{width: "20%",height: "15.01%"}}/>
    </div>
  )
   
}

export default GreetingBlock;
