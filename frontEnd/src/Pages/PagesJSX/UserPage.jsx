import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../Components/shared/context/auth-context.jsx";
import { useHttpClient } from "../../Components/shared/hooks/http-hook.jsx";
import { OrbitProgress } from "react-loading-indicators"
import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import UserForm from "../../Components/UserForm/UserForm.jsx"
import "../PagesCSS/userPage.css"
// import "../PagesCSS/starsBackground.css"
export default function UserPage(){
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const [userInfo, setUserInfo] = useState({name: "", email: ""});

    //fetch user info
    useEffect(() => {
        const fetchUserData = async () => {
            try { 
              const responseData = await sendRequest(
                import.meta.env.VITE_BACKEND_URL+`users/${auth.userId}`,
                "GET",
                null,
                {
                  "Content-Type": "application/json",
                }
              );
              setUserInfo({...userInfo, name:responseData.name, email:responseData.email})
            } catch (err) {
              console.error(err);
            }
        };
        fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[auth.userId, sendRequest]) 

    return(
        <div className="user-page">

          {/* display loading indicator if user info not loaded. 
          note: userInfo && did not work */ }
          {(userInfo.name == "" || userInfo.email == "") && 
            <div className="overlay">
                <OrbitProgress color="#ffffff" size="medium" text="" textColor="" />
            </div>
          }
          <Header />
          <div className="main">
              <UserForm userInfo={userInfo} />
          </div>
          
          <Footer /> 
        </div>
    )
}