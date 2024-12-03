/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context.jsx";
import "./home-links.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
function HomeLinks() {
  const auth = useContext(AuthContext);

  //state for trigering generate links (youtube, x...etc)
  const [reportDropdownOpen, setReportDropdownOpen] = useState(false);

  const toggleReportDropdown = () => {
    setReportDropdownOpen(!reportDropdownOpen);
  };

  return (
    <nav className="nav-bar">
      <NavLink className={`nav-item`} to='/'>
        Home page
      </NavLink>
      <div className="generate-report-button-container">
          <button 
            className={`nav-item toggle-report-button`}
            onClick={toggleReportDropdown}
          >
            Generate report  
            <span className="dropdown-arrow">
              <FontAwesomeIcon icon={faCaretDown} className="caret-icon" style={{ marginLeft: '6px' }} />
            </span>
          </button>

          {reportDropdownOpen && (
            <div className="report-dropdown">
              <NavLink to="/generate/youtube" onClick={() => setReportDropdownOpen(false)}>
                YouTube
              </NavLink>
              <NavLink to="/generate/tiktok" onClick={() => setReportDropdownOpen(false)}>
                TikTok
              </NavLink>
              <NavLink to="/generate/maps" onClick={() => setReportDropdownOpen(false)}>
                Google Maps
              </NavLink>
            </div>
          )}
        </div>
        
      {auth.isLoggedIn && (
        <>
          <NavLink className={`nav-item`} to={'/myReports'} >
            My Reports
          </NavLink>
        </>
      )}   
    </nav>
  );
}

export default HomeLinks;
