import SignUpPage from './Pages/PagesJSX/SignUpPage.jsx'
import LoginPage from './Pages/PagesJSX/LoginPage.jsx'
import HomePage from './Pages/PagesJSX/HomePage.jsx'
import UserPage from './Pages/PagesJSX/UserPage.jsx'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from "./Components/shared/context/auth-context.jsx";
import { useAuth } from "./Components/shared/hooks/auth-hook.jsx";
function App() {
  
  const { token, login, logout, userId } = useAuth();
  let routes;
  if(token){
    routes=(<Router>
   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    
  </Router>)


  }else{
    routes=(<Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    
  </Router>)

  }
  return (
<AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
   
       <main>{routes}</main> 
    </AuthContext.Provider>
)
}

export default App
