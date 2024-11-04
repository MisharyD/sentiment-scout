import React, { useContext } from "react";

import "./panel.css";
import InteractionBlock from "../InteractionBlock/InteractionBlock";
function HomePageButton(props) {
 
  return (
    <div className="panel">
      <img src={props.src}></img>
<InteractionBlock center={false} title="See what people think in a glance" description={<>Sentiment Scout delivers real-time insights from youtube, twitter and Google maps. <br />
                        Whether you are a content creater, buisness owner, or someone curiuos about public opinions.</>}buttonWidth="20%" buttonHeight= "15.01%"
                       marginBottom="20%" marginTop="20.86vh" width="45.16%" height="46.04vh" fontSize="50px" />
   

    </div>

    
      
     
   
  );
}

export default HomePageButton;
