/* eslint-disable no-unused-vars */
import {useContext, useState, useEffect} from "react";
import { AuthContext } from "../shared/context/auth-context.jsx";
import { useHttpClient } from "../shared/hooks/http-hook.jsx";
import "./header.css"
import HomeLinks from "../homeLinks/HomeLinks.jsx";
import { NavLink } from "react-router-dom";
import userLogo from "../../assets/images/user.svg"
import logoutLogo from "../../assets/images/logout.svg"
import menuIcon from "../../assets/images/menu.svg";
import closeIcon from "../../assets/images/close.svg";
import bellIcon from "../../assets/images/bell-outline.svg"

function Header(){
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
  };

  //fetch notifications from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const responseData = await sendRequest(
          import.meta.env.VITE_BACKEND_URL+ `users/notifications/${auth.userId}`, 
          "GET"  
        );
        const unreadNotifications = responseData.notifications.filter(
          (notification) => !notification.isRead
        );
        setNotifications(unreadNotifications);   
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (auth.isLoggedIn) fetchNotifications();
  }, [auth.isLoggedIn, auth.userId, sendRequest]);

  //mark a notification as seen
  const markAsSeen = async (notificationId) => {
    try {
        const responseData = await sendRequest(
        import.meta.env.VITE_BACKEND_URL+ `users/notifications/markAsRead`, 
        "PATCH",
        JSON.stringify({
          "notificationId": notificationId
        }),
        {
        "Content-Type": "application/json",
        }  
      );

      //update state of notifications
      setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.notificationId !== notificationId));

    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  return (
    <header className = "header" >
      
      <span className="sentiment-scout">SENTIMENT SCOUT</span>

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
              <div className="notifications-container">
                <img
                  className="bell-button"
                  src={bellIcon}
                  onClick={toggleNotifications}
                  alt="notifications"
                />
                {notifications.length > 0 && (
                  <span className="notification-count">{notifications.length}</span>
                )}
                {isNotificationsOpen && (
                  <div className="notifications-dropdown">
                    {notifications.length === 0 ? (
                      <div className="notification-item">No new notifications</div>
                    ) : (
                      notifications.map((notification) => (
                        <div key={notification.notificationId} className="notification-item">
                          <span>{notification.message}</span>
                          <button
                            className="mark-as-seen-button"
                            onClick={() => markAsSeen(notification.notificationId)}
                          >
                            Mark as read
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
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
