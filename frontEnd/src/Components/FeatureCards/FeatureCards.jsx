import React from "react";
import "./feature-cards.css";
import Card from "../Card/Card";
import youtupeLogo from "../../assets/images/youtube.svg"
function FeatureCards(props) {

  return (
    <div style={props.style} className="feature-cards">
        <Card cardTitle="Trade Desk" cardDescription="Invest in crypto anytime, anywhere with our safe, secure, and easy to use online platform" buttonText={"Get Started"} src={youtupeLogo}/>
        <Card style={{ margin: "0 20px"}} cardTitle="Trade Desk" cardDescription="Invest in crypto anytime, anywhere with our safe, secure, and easy to use online platform" buttonText={"Get Started"} src={youtupeLogo}/>
        <Card cardTitle="Trade Desk" cardDescription="Invest in crypto anytime, anywhere with our safe, secure, and easy to use online platform" buttonText={"Get Started"} src={youtupeLogo}/>


    </div>
    
  )
   
}

export default FeatureCards;
