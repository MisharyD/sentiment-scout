import React ,{useContext} from "react";
import { AuthContext } from "../shared/context/auth-context.jsx";
import { NavLink } from "react-router-dom";
import "./Header.css"
import HomeLinks from "../homeLinks/HomeLinks.jsx";
import HomePageButton from "../HomeButton/HomePageButton.jsx";
function Header(props){
  const auth = useContext(AuthContext);
  return (
    <header >
      <span  className="sentiment-scout">SENTIMENT SCOUT</span>
      <HomeLinks/>
      <HomePageButton Text="Sign in" gradiant={false} style={{marginLeft: "19.91%", width: "6.66%",height: "50%"}}/>
     <HomePageButton Text="Sign up" gradiant={true} style={{marginLeft: "0.83%", width: "6.66%",height: "50%"}}/>
     

    </header>
   
  )
}
export default Header;
