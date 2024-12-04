// src/shared/context/signup-context.jsx

import React, { createContext, useState } from "react";

export const SignupContext = createContext({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  setSignupData: () => {},
  clearSignupData: () => {},
});

// export const SignupProvider = ({ children }) => {
//   const [signupData, setSignupData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const updateSignupData = (data) => {
//     setSignupData(data);
//   };

//   const clearSignupData = () => {
//     setSignupData({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });
//   };

//   return (
//     <SignupContext.Provider
//       value={{
//         ...signupData,
//         setSignupData: updateSignupData,
//         clearSignupData,
//       }}
//     >
//       {children}
//     </SignupContext.Provider>
//   );
// };
