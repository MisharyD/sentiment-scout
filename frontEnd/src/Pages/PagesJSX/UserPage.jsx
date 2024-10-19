import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import UserForm from "../../Components/UserForm/UserForm.jsx"
import "../PagesCSS/userPage.css"

export default function userPage(){

    // Dummy user info
    const userInfo = {
    username: "Faisal Alwahhabi",
    email: "Email@Email.com",
    password: "12345678",
    };
    return(
        <div className="user-page">
            <Header />
            <div className="main">
                <UserForm userInfo={userInfo} />
            </div>
            
            <Footer /> 

        </div>
    )
}