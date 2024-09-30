import React ,{useContext} from "react";
import logo from '../../assets/logo.png';
import { AuthContext } from "../shared/context/auth-context.jsx";
import { NavLink } from "react-router-dom";
const Header = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>

        <div className="button-container">
          {!auth.isLoggedIn ? (
            <>
              {/* <button className="signup-button button">Sign Up</button> */}
              <NavLink className="signup-button button" to='/signup'>Sign Up</NavLink>
              <NavLink className="login-button button" to='/login'>Log In</NavLink>
            </>
          ) : (
            <button className="signout-button button" onClick={auth.logout}>
              Sign Out
            </button>
          )}
        </div>
      </header>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color:#B0C7E0 ;
        }

        .logo-container {
          flex: 1;
        }

        .logo-container img {
          height: 85px;
        }

        .button-container {
          display: flex;
          gap: 10px;
        }

        .button {
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
          font-weight: bold;
          color: #fff;
        }

        .signup-button {
          background-color:#6EBAFF;
          border: none;
        }

        .signup-button:hover {
          background-color: #4A91CC;
        }

        .signup-button:active {
          background-color: #4A91CC;
        }

        .login-button {
          background-color: transparent;
          border: 2px solid #6EBAFF;
        }

        .login-button:hover {
          background-color: #4A91CC;
          border-color: #4A91CC;
        }

        .login-button:active {
          border-color: rgba(136, 106, 166, 0.6);
        }

        .signout-button {
          background-color: #B3CDE4;
          border: none;
        }

        .signout-button:hover {
          background-color: #4A91CC;
        }

        .signout-button:active {
          background-color: #4A91CC;
        }
      `}</style>
    </>
  );
};

export default Header;
