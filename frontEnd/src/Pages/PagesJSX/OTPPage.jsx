import { useNavigate, useLocation } from "react-router-dom"; 
import {useState, useEffect, useContext} from "react";
import Header from "../../Components/Header/Header.jsx";
import OTPInput from '../../Components/OTPInput/OTPInput.jsx';
import Footer from "../../Components/Footer/Footer.jsx";
import "../PagesCSS/starsBackground.css"
import "../PagesCSS/OTPPage.css"
import FeedbackMessage from "../../Components/FeedbackMessage/FeedbackMessage.jsx"
import { AuthContext } from "../../Components/shared/context/auth-context.jsx";
import { useHttpClient } from "../../Components/shared/hooks/http-hook.jsx";

import Timer from '../../Components/Timer/Timer.jsx';
export default function OTPPage(){
    const location = useLocation();
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const email = location.state?.email;
    const username = location.state?.username;
    const password = location.state?.password;
    const [values, setValues] = useState(['', '', '', '','','']);
    const [messageVisibility,setMessageVisibility]=useState(false);
    const [messageType,setMessageType]=useState("success");
    // const [messageText,setMessageText]=useState("");
    const {error, sendRequest} = useHttpClient();

    if (!email) {
       
        navigate('/');
      }

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };
  const submitHandler = async (event) => {
    event.preventDefault();
    
    /* triger loading indicator */
    setLoading(true);

   
      try {
        const responseData = await sendRequest(
          import.meta.env.VITE_BACKEND_URL+"users/verifyOTPAndSignup",//changed the path
          "POST",
          JSON.stringify({
            name: username,
            email: email,
            password:password,
            otp:values.join('')
          }),
          {
            "Content-Type": "application/json",
          }
        );
        // console.log(responseData);
        setMessageVisibility(true);
        await sleep(3000);
        auth.login(responseData.userId, responseData.token);
       
       
        
        
        // navigate("/UserPage");
      } catch (err) {
        setMessageType("error");
        setMessageVisibility(true);
        console.log(err.message || "Something went wrong");
        await sleep(3000);
        navigate("/signup");

      }
      finally{
        setLoading(false)
      }
    }


    return (
        <div className="OTP-page">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            {/* <Header page = "generate" /> */}
            <div className="container-block">
            <Timer/>
            <OTPInput values={values} setValues={setValues}/>
           
            <button onClick={submitHandler} className="button">
                Submit

            </button>
            <FeedbackMessage visibility={true} type={messageType} text={error}/>
            </div>


            {/* <Footer/> */}
        </div>
    )
}