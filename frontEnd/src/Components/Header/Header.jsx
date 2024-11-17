/* eslint-disable no-unused-vars */
import {useContext, useState} from "react";
import { AuthContext } from "../shared/context/auth-context.jsx";
import "./header.css"
import HomeLinks from "../homeLinks/HomeLinks.jsx";
import { NavLink } from "react-router-dom";
import userLogo from "../../assets/images/user.svg"
import logoutLogo from "../../assets/images/logout.svg"
import menuIcon from "../../assets/images/menu.svg";
import closeIcon from "../../assets/images/close.svg";

function Header(props){
  const auth = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className = "header" >
      
      <NavLink to="/" className="sentiment-scout">SENTIMENT SCOUT</NavLink>

      {/*Menu toggle button when screen is small*/}
      <img className="menu-toggle" src={menuOpen ? closeIcon : menuIcon} onClick={toggleMenu} alt="menu toggle" />

      <div className={`menu-content ${menuOpen ? 'open' : 'closed'}`}>
        <HomeLinks/>
        <div className="user-buttons-container">
          {!auth.isLoggedIn ? (
            <>
              <NavLink className="login-button" to='/login'>Log In</NavLink>
              <NavLink className="signup-button" to='/signup'>Sign Up</NavLink>
            </>
          ) : (
            <>
              <NavLink className="user-button" to='/user'>
                <img src={userLogo} alt="user" />
              </NavLink>
              <button className="logout-button" onClick={auth.logout}>
                <img src={logoutLogo} alt="logout" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
   
  )
}
export default Header;
