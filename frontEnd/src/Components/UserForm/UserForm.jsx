/* eslint-disable react/prop-types */
import {useContext, useEffect} from "react";
import { AuthContext } from "../shared/context/auth-context.jsx";
import { useHttpClient } from "../shared/hooks/http-hook.jsx";
import { useState } from "react";
import { OrbitProgress } from "react-loading-indicators"
import userLogo from "../../assets/images/user.svg"
import "./userForm.css"

export default function UserForm({userInfo}){
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: userInfo.name,
        email: userInfo.email,
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errorMessages, setErrorMessages] = useState([]);
    const [passwordErr, setpasswordErr] = useState([]);
    
    // update formData when userInfo is updated (when parent finishes fetching the data)
    useEffect(() => {
        if (userInfo) {
        setFormData({
            name: userInfo.name,
            email: userInfo.email,
        });
        }
    },[userInfo]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
        ...prevState,
        [name]: value,  // Use the name attribute to update the corresponding key
          }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
          ...passwordData,
          [name]: value,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessages([...errorMessages, "Invalid email format."]);
            return;
        }
        
        const submitUserData = async () => {
            try {
              const responseData = await sendRequest(
                import.meta.env.VITE_BACKEND_URL+`users/updateUserInfo`,
                "PATCH",
                JSON.stringify({name:formData.name,
                email:formData.email,
                userId:auth.userId}),
                {
                  "Content-Type": "application/json",
                }
              );
              console.log(responseData);
              setIsEditing(false);
              setErrorMessages([]); 
            } catch (err) {
                console.error(err);
                setErrorMessages([...errorMessages, err.message]);
                // Clear the error message after 10 seconds
                setTimeout(() => {
                    setErrorMessages([]);
                }, 10000); 
            }
        };
        submitUserData();
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        // Clear previous errors
        const errors = [];

        // Check if the new password is less than 8 characters
        if (passwordData.newPassword.length < 8) {
            errors.push("password must be at least 8 characters");
        }

        // Check if new password matches confirm password
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            errors.push("new password and confirm password do not match");
        }

        // If there are any errors, set them and prevent form submission
        if (errors.length > 0) {
            setpasswordErr(errors);
            // Clear the error message after 10 seconds
            setTimeout(() => {
                setpasswordErr("");
            }, 10000); 
            return; // Prevent form submission if there are validation errors
        }

        const submitUserData = async () => {
            try 
            {
              const responseData = await sendRequest(
                import.meta.env.VITE_BACKEND_URL+`users/updatePassword`,
                "PATCH",
                JSON.stringify({
                oldPassword:passwordData.oldPassword,   
                newPassword:passwordData.newPassword,
                userId:auth.userId}),
                {
                  "Content-Type": "application/json",
                }
              );
              console.log(responseData);
              setIsChangingPassword(false);
            } catch (err) 
            {
                console.log(err);
                setErrorMessages([...errorMessages, err.message]);
                // Clear the error message after 10 seconds
                setTimeout(() => {
                    setErrorMessages([]);
                }, 10000); 
            }
        };
        submitUserData();
      };

    const handleCancel = () => {
        setIsEditing(false);
        // Optionally reset form data to original user info
        setFormData({
        name: formData.name,
        email: formData.email,
        });
        setErrorMessages([]);
    };

    const handlePasswordCancel = () => {
        setIsChangingPassword(false);
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setpasswordErr(""); // Clear the password error when canceling
        setErrorMessages([]);
      };
    
  return (
    <div className="user-container">
        <div className="reports-username-section">
            <img className="user-logo" src={userLogo} alt="" />
            <div className="username">{`${userInfo.name}`}</div>
            <div className="reports-info-container">
                <div className="my-reports-container">
                    <div className="nb-of-reports">25</div>
                    <div className="reports-title">My Reports</div>
                </div>
                <div className="scheduled-reports-container">
                    <div className="nb-of-reports">10</div>
                    <div className="reports-title">Scheduled Reports</div>
                </div>
            </div>
        </div>

        {
        //contains form for email and username and another form for password
        }
        <div className="forms-container">
            {errorMessages.length > 0 && (
                <div className="err-message-container">
                    {errorMessages.map((error, index) => (
                        <div className="err-message" key={index}>{error}</div>
                    ))}
                </div>
            )}
            <div className="forms-title">User Information</div>
            {/*form for email and username */}

            {
            /* if edit button is true then display form*/
            isEditing ? 
            (
                <form onSubmit={handleSubmit} className="user-form">
                    <div className="form-buttons-container">
                    <button type="button" className="cancel-btn" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="save-btn">
                        Save
                    </button>
                    </div>
                    <div className="input-group">
                        <label className="input-group-title">Username</label>
                        <input
                        type="text"
                        name="name"
                        className="user-input"
                        value={formData.name}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-group-title">Email</label>
                        <input
                        type="email"
                        name="email"
                        className="user-input"
                        value={formData.email}
                        onChange={handleChange}
                        />
                    </div>

                </form>
            )
            /* if edit button is false then display info only*/
            : 
            (
                <div className="user-info-container">
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                    <div className="info-group">
                        <div className="info-group-title">Username</div>
                        <div className="user-info">{`${formData.name}`}</div>
                    </div>
                    <div className="info-group">
                        <div className="info-group-title" >Email</div>
                        <div className="user-info">{`${formData.email}`}</div>
                    </div>
                </div>
            )}
            
            {/*form for password */}

            <div className="password-form">
                {/* if user change password is false the display button*/}
                {!isChangingPassword ?
                    <button
                    className="change-password-btn"
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                    >
                    Change Password
                    </button>
                /* if change password is true then display form */
                :
                (
                    <form onSubmit={handlePasswordSubmit} className="password-form">
                        <div className="form-buttons-container">
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={handlePasswordCancel}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="save-btn">
                                Save
                            </button>
                        </div>  
                        <div className="input-group">
                            <label className="input-group-title">Old Password</label>
                            <input
                                type="password"
                                name="oldPassword"
                                className="user-input"
                                value={passwordData.oldPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-group-title">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                className="user-input"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-group-title">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="user-input"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        {passwordErr.length > 0 && (
                            <div className="password-error-message-container">
                                {passwordErr.map((error, index) => (
                                    <div className="password-error-message" key={index}>{error}</div>
                                ))}
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    </div>

  );
}