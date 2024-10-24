import {useContext, useState} from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "../shared/context/auth-context.jsx";
import { NavLink } from "react-router-dom";
import userLogo from "../../assets/images/user.svg"
import logoutLogo from "../../assets/images/logout.svg"
import menuIcon from "../../assets/images/menu.svg";
import closeIcon from "../../assets/images/close.svg";
import "./header.css"

const Header = ({page}) => {
  const auth = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header-title">
          SENTIMENT SCOUT
        </div>
        {/* Toggle button for small screens */}

        {/* Nav and User buttons container */}
        <img className="menu-toggle" src={menuOpen ? closeIcon : menuIcon} onClick={toggleMenu} alt="menu toggle" />
        <div className={`menu-content ${menuOpen ? 'open' : 'closed'}`}>
          <nav className="nav-bar">
            <NavLink className={`nav-item ${page === 'home' ? 'selected' : ''}`} to='/'>
              Home page
            </NavLink>
            {auth.isLoggedIn && (
              <>
                <NavLink className={`nav-item ${page === 'report' ? 'selected' : ''}`} to='/myReport'>
                  My Reports
                </NavLink>
                <NavLink className={`nav-item ${page === 'report' ? 'selected' : ''}`} to='/youtubeReport'>
                  Generate report
                </NavLink>
              </>
            )}
          </nav>

          <div className="user-buttons-container">
            {!auth.isLoggedIn ? (
              <>
                <NavLink className="signup-button button" to='/signup'>Sign Up</NavLink>
                <NavLink className="login-button button" to='/login'>Log In</NavLink>
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
    </>
  );
};

// Prop validation: Ensure 'page' is a string
Header.propTypes = {
  page: PropTypes.string,
};

export default Header;
