import '../PagesCSS/AuthPage.css'
import Form from "../../Components/AuthForm/AuthForm.jsx";
import AuthSideBar from "../../Components/AuthSideBar/AuthSideBar.jsx";

function SignUpPage() {
  

  return (<div id='auth-page' className="starry-container">
      {/* <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div> */}
     
    <Form formType='signup'/>
    <AuthSideBar/>
  
  
  </div>

   
  )
}

export default SignUpPage
