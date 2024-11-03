import React, { useContext } from "react";

import { AuthContext } from "../shared/context/auth-context.jsx";

import "./home-links.css";
function HomeLinks() {
  const auth = useContext(AuthContext);
  return (
    <>
     <a href="#" style={{marginLeft:"21.4%"}} >My Reports</a>
     <a href="#">Profile</a>
     <a href="#" >Genrate Report</a>






     
    </>
  );
}

export default HomeLinks;
