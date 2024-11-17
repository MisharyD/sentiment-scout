import React, { useContext } from "react";

import "./panel.css";
import InteractionBlock from "../InteractionBlock/InteractionBlock";
function Panel(props) {
 
  return (
    <div className="panel">
      {props.flipped && <img className="panel-img" src={props.src}></img>}
<InteractionBlock path="/generate/youtube" /*buttonWidth="20%" buttonHeight= "15.01%" */ gradient={props.gradient} center={false} title={props.title} description={props.description} 
                     buttonText={props.buttonText}  /*width="45.16%" height="46.04vh"*/ />
   
   {!props.flipped && <img  className="panel-img" src={props.src}></img>}
    </div>

    
      
     
   
  );
}

export default Panel;
