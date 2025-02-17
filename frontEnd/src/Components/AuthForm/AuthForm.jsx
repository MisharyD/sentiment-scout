import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./auth-form.css";
// import Input from "./Input.jsx";
import AuthInput from "../AuthInput/AuthInput.jsx";
import AuthHeader from "../AuthHeader/AuthHeader.jsx";
import AuthButton from "../AuthButton/AuthButton.jsx";
import AuthOption from "../AuthOptions/AuthOptions.jsx";
import { OrbitProgress } from "react-loading-indicators";
import { useHttpClient } from "../shared/hooks/http-hook.jsx";
import { AuthContext } from "../shared/context/auth-context.jsx";
// import { SignUpContext } from "../shared/context/signup-context.jsx";
function Form({formType}) {
  const auth = useContext(AuthContext);
  const {error, sendRequest} = useHttpClient();
  const formStyle = formType === 'signup' ? { borderTopRightRadius: '15px', borderBottomRightRadius: '15px' } : { borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' };
  const [canSubmit,setCanSubmit]=useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formState, setFormState] = formType==='signup'?useState({username: '',email: '',password: '',confirmPassword: '',}):useState({email: '',password: ''})

  const [errors, setErrors] = formType==='signup'?useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  }):useState({
    email: false,
    password: false
  })

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    const updatedFormState = {
      ...formState,
      [name]: value,
    };
    
    const newError = { ...errors };

    if (name === 'username') {
      newError[name] = value.length < 1; // Username is invalid if length < 1
    } else if (name === 'email') {
      newError[name] = !validateEmail(value); // Email is invalid if it doesn't match regex
    } else if (name === 'password') {
      newError[name] = value.length < 8; // Password is invalid if length < 8
      if(formType==='signup'){
      newError['confirmPassword']=(formState.confirmPassword!==value&&formState.confirmPassword.length>0)}
    } else if (name === 'confirmPassword') {
      newError[name] = value !== formState.password; // confirmPassword is invalid if it doesn't match password
    }
    
    setFormState(updatedFormState);
    setErrors(newError);

    setCanSubmit(Object.values(newError).every(value => value === false)&&Object.values(updatedFormState).every(value => value.length>0));
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    
    /* triger loading indicator */
    setLoading(true);

    if (formType === "signup") {
      try {
        const responseData = await sendRequest(
          import.meta.env.VITE_BACKEND_URL+"users/signupGenerateOTP",//changed the path
          "POST",
          JSON.stringify({
            name: formState.username,
            email: formState.email,
            // password: formState.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        // auth.login(responseData.userId, responseData.token);
        // SignUpContext.setSignupData(formState.username, formState.email,formState.password);
        navigate("/OTPPage", { state: { email: formState.email,username: formState.username,password: formState.password } });
      } catch (err) {
        console.log(err.message || "Something went wrong");
      }
      finally{
        setLoading(false)
      }
    } else {
      try {
        const responseData = await sendRequest(
          import.meta.env.VITE_BACKEND_URL+"users/login",
          "POST",
          JSON.stringify({
            email: formState.email,
            password: formState.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        console.log(err.message || "Something went wrong");
      }
      finally{
        setLoading(false)
      }
    }
  };

  return (

      <form id='form' onSubmit={submitHandler} style={formStyle}>

        {/* trigger loading indicator if loading is true*/}
        {loading && (
          <div className="overlay">
              <OrbitProgress color="#ffffff" size="medium" text="" textColor="" />
          </div>
        )}
        {formType === 'signup' ? ( <AuthHeader text="Create your Account" marginBottom='3.25%' />) : ( <AuthHeader text="Log in to your Account" marginBottom='9.25%' /> )}
        <p id='server-error' >{error}</p>
        {formType === 'signup' && (<AuthInput errorMessage='please enter a username' error={errors.username} value={formState.username} onChange={handleInputChange}  label='Username' name='username' type='text' placeholder='Enter your Username'/>)}


    
        <AuthInput errorMessage='Please enter a valid email address' error={errors.email} value={formState.email} onChange={handleInputChange} label='Email' name='email' type='email' placeholder='Enter your email'/>
        <AuthInput errorMessage='Password must be at least 8 characters long' error={errors.password} value={formState.password} onChange={handleInputChange} label='Password' name='password' type='password' placeholder='Enter your password'/>

        {formType === 'signup' && (<AuthInput errorMessage='Confirm password must match the password' error={errors.confirmPassword} value={formState.confirmPassword} onChange={handleInputChange} label='Confirm Password' name='confirmPassword' type='password' placeholder='Confirm your password'/>)}

        {formType === 'signup' ? ( <AuthButton marginTop='3%' canSubmit={canSubmit} text='Create Account' />) : (<AuthButton marginTop='4.62%' canSubmit={canSubmit} text='Login' />)}
      
    
        {formType === 'signup' ? ( <AuthOption path='/login' ctaPrompt='Already have an account ? ' prompt='Log in' /> ) : (<AuthOption path='/signup' ctaPrompt="Don't have an account ? " prompt='Sign-Up' />)}
  

      </form>
      
  );
}

export default Form;
