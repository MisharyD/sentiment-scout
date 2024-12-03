import React from "react";
import "./feature-cards.css";
import Card from "../Card/Card";
import youtupeLogo from "../../assets/images/youtube.svg"
import tikTokLogo from "../../assets/images/tiktok-logo.png"
import googleMapsLogo from "../../assets/images/google-maps.svg"
import user from "../../assets/images/user.png"
import camera from "../../assets/images/camera.png"
import bag from "../../assets/images/bag.png"
function FeatureCards(props) {
var cards=[]
if(props.type==="platforms"){
  cards = [
  {
    path: "/generate/youtube",
    speed: "0.8",
    cardTitle: "YouTube Comments",
    cardDescription:
      "Unlock insights from YouTube comments and feedback. Understand viewer emotions and improve your content strategy with our AI-powered sentiment analysis.",
    buttonText: "Get Started on YouTube",
    src: youtupeLogo, // Ensure you have imported youtupeLogo correctly
  },
  {
    path: "/generate/tiktok",
    speed: "1.2",
    style: { margin: "0 20px" },
    cardTitle: "TikTok Posts",
    cardDescription:
      "Monitor and interpret videos about your brand. Stay ahead with real-time sentiment tracking, engagement analysis, and trending hashtags to understand your audience.",
    buttonText: "Get Started on TikTok",
    src: tikTokLogo,
  },
  {
    path: "/generate/maps",
    speed: "1.6",
    cardTitle: "Google Maps Reviews",
    cardDescription:
      "Analyze reviews and ratings on Google Maps to gauge customer satisfaction. Enhance your business location strategies with actionable sentiment data.",
    buttonText: "Get Started on Google Maps",
    src: googleMapsLogo, // Ensure you have imported googleMapsLogo correctly
  },
];
}else{
  cards = [
  {
    path: "/generate/youtube",
    speed: "1.6",
    cardTitle: "Content Creator",
    cardDescription:"Understand your audience at a glance! Get detailed insights on how viewers react to your content and fine-tune your strategy",
    buttonText: "Get Started",
    src: camera, 
  },
  {
    path: "/generate/youtube",
    speed: "1.2",
    cardTitle: "Buisness Owner",
    cardDescription:"Curious about public opinion on your brand? Get quick insights from YouTube, Twitter, and Google Maps. Use AI sentiment analysis to enhance strategies and drive growth",
    buttonText: "Get Started",
    src: bag, 

  },
  {
    path: "/generate/youtube",
    speed: "0.8",
    cardTitle: "Regular User",
    cardDescription:" Empower your decision-making with real-time sentiment analysis. Track public opinion across multiple platforms and make data-driven choices",
    buttonText: "Get Started",
    src: user, 
  }
];
}
  return (
    <div className="feature-cards">
       {cards.map((card, index) => (
        <Card
          key={index}
          path={card.path}
          speed={card.speed}
          cardTitle={card.cardTitle}
          cardDescription={card.cardDescription}
          buttonText={card.buttonText}
          src={card.src}
        />
      ))}


    </div>
    
  )
   
}

export default FeatureCards;
