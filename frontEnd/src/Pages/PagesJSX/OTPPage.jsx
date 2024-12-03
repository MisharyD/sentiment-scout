import { useNavigate, useLocation } from "react-router-dom"; 
import {useState, useEffect, useContext} from "react";
import Header from "../../Components/Header/Header.jsx";
import OTPInput from '../../Components/OTPInput/OTPInput.jsx';
import Footer from "../../Components/Footer/Footer.jsx";
import "../PagesCSS/starsBackground.css"
import "../PagesCSS/OTPPage.css"
import FeedbackMessage from "../../Components/FeedbackMessage/FeedbackMessage.jsx"
import { AuthContext } from "../../Components/shared/context/auth-context.jsx";
import Timer from '../../Components/Timer/Timer.jsx';
export default function OTPPage(){
    const location = useLocation();
    const auth = useContext(AuthContext);
    const email = location.state?.email;
    const username = location.state?.username;
    const password = location.state?.password;

    return (
        <div className="OTP-page">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            {/* <Header page = "generate" /> */}
            <div className="container-block">
                <Timer/>
            <OTPInput/>
            <FeedbackMessage/>
            </div>


            {/* <Footer/> */}
        </div>
    )
}