import React  from 'react'
import '../PagesCSS/AuthPage.css'
import Form from "../../Components/AuthForm/AuthForm.jsx";
import AuthSideBar from "../../Components/AuthSideBar/AuthSideBar.jsx";

function SignUpPage() {
  

  return (<div id='auth-page'>
    <Form formType='signup'/>
    <AuthSideBar/>
  
  </div>

   
  )
}

export default SignUpPage
