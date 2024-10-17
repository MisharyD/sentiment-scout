import {useContext} from "react";
import { AuthContext } from "../shared/context/auth-context.jsx";
import { NavLink } from "react-router-dom";
import "./header.css"
const Header = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <header className="header">
        <div className="logo-container">
          SENTIMENT SCOUT
        </div>

        <div className="nav-bar">
        <NavLink className="nav-item" to='/'>Home page</NavLink>
        <NavLink className="nav-item" to='/report'>Generate report</NavLink>
        </div>

        <div className="button-container">
          {!auth.isLoggedIn ? (
            <>
              {/* <button className="signup-button button">Sign Up</button> */}
              <NavLink className="signup-button button" to='/signup'>Sign Up</NavLink>
              <NavLink className="login-button button" to='/login'>Log In</NavLink>
            </>
          ) : (
            <>
              <NavLink className="user-button" to='/user'>User</NavLink>
              <button className="signout-button button" onClick={auth.logout}>
                Sign Out
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
