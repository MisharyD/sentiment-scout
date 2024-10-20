import { useState } from "react";
import userLogo from "../../assets/images/user.svg"
import "./userForm.css"

export default function UserForm({userInfo}){
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: userInfo.username,
        email: userInfo.email,
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
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
        
        // Send post request with formData (dummy logic for now)
        console.log("Submitting form data: ", formData);
        setIsEditing(false);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        // Logic for submitting the password change form (dummy logic for now)
        console.log("Submitting password data: ", passwordData);
        setIsChangingPassword(false);
      };

    const handleCancel = () => {
        setIsEditing(false);
        // Optionally reset form data to original user info
        setFormData({
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        });
    };

    const handlePasswordCancel = () => {
        setIsChangingPassword(false);
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      };
    

  return (
    <div className="user-container">
        <div className="reports-username-section">
            <img className="user-logo" src={userLogo} alt="" />
            <div className="username">{`${userInfo.username}`}</div>
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
                        name="username"
                        className="user-input"
                        value={formData.username}
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
                        <div className="user-info">{`${formData.username}`}</div>
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
                    </form>
                )}
            </div>
        </div>
    </div>

  );
}