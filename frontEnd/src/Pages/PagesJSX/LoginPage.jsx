import '../PagesCSS/AuthPage.css'
import Form from "../../Components/AuthForm/AuthForm.jsx";
import AuthSideBar from "../../Components/AuthSideBar/AuthSideBar.jsx";

function LoginPage() {
  

  return (<div id='auth-page'>
    <AuthSideBar/>
    <Form formType='login'/>
  
  </div>

   
  )
}

export default LoginPage
