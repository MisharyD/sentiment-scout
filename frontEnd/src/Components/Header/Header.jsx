import {useContext} from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "../shared/context/auth-context.jsx";
import { NavLink } from "react-router-dom";
import userLogo from "../../assets/images/user.svg"
import logoutLogo from "../../assets/images/logout.svg"
import "./header.css"

const Header = ({page}) => {
  const auth = useContext(AuthContext);
  return (
    <>
      <header className="header">
        <div className="header-title">
          SENTIMENT SCOUT
        </div>

        <div className="nav-bar">
          <NavLink 
          className={`nav-item ${page === 'home' ? 'selected' : ''}`}
           to='/'>
            Home page
          </NavLink>
          <NavLink 
          className={`nav-item ${page === 'report' ? 'selected' : ''}`} 
          to='/report'>
            Generate report
            </NavLink>
        </div>

        <div className="button-container">
          {!auth.isLoggedIn ? (
            <>
              {<>
              <NavLink className="signup-button button" to='/signup'>Sign Up</NavLink>
              <NavLink className="login-button button" to='/login'>Log In</NavLink>
              </>
              }
            </>
          ) : (
            <>
              <NavLink className="user-button" to='/user'>
                <img src={userLogo} alt="" />
              </NavLink>
              <button className="logout-button" onClick={auth.logout}>
                <img src={logoutLogo} alt="" />
              </button>
            </>
          )}
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
