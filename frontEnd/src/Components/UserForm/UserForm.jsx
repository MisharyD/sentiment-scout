import { useState } from "react";
import userLogo from "../../assets/images/user.svg"
import "./userForm.css"

export default function UserForm({userInfo}){
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send post request with formData (dummy logic for now)
        console.log("Submitting form data: ", formData);
        setIsEditing(false);
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

  return (
    <div className="user-container">
        <div className="reports-username-section">
            <img className="user-logo" src={userLogo} alt="" />
            <div className="username">{`${userInfo.username}`}</div>
            <div className="reports-info-container">
                <div>
                    <div>25</div>
                    <div>My Reports</div>
                </div>
                <div>
                    <div>10</div>
                    <div>Scheduled Reports</div>
                </div>
            </div>
        </div>
      {
        isEditing ? 
        (
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-buttons">
                <button type="submit" className="save-btn">
                Save
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
                </button>
                </div>
                <div className="input-group">
                    <label>Username</label>
                    <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                </div>
            </form>
        ) : 
        (
            <div className="user-info-container">
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                    Edit
                </button>
                <div className="user-info">{`${userInfo.username}`}</div>
                <p className="user-info">Email: {userInfo.email}</p>
                <p className="user-info">Password: *******</p>
            </div>
        )}
    </div>
  );
}