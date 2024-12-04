import { useState, useEffect } from "react";
import { useHttpClient } from "../../Components/shared/hooks/http-hook.jsx";
import { useParams } from "react-router-dom";

import ReportList from "../../Components/ReportList/ReportList.jsx";
import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import { OrbitProgress } from "react-loading-indicators";
import '../PagesCSS/PreviousReports.css';

export default function PreviousReports(){

   

   const { uid } = useParams();
   const { sendRequest } = useHttpClient();
   const [requestResponse, setRequestResponse] = useState("");
   const [loading, setLoading] = useState(true);
   const [reports, setReports] = useState();

   const reportDeleteHandler = (rid) => {

      setReports( prevReport => prevReport.filter( report => report._id !== rid ))

   }

   useEffect ( () => {
      
      const submit = async () => {
      setLoading(true);
      try{

      const responseData = await sendRequest( import.meta.env.VITE_BACKEND_URL+`users/reports/${uid}` )
      
      setReports(responseData.reports)
      setRequestResponse("");

     
      } catch(err){

         setRequestResponse("Failed to fetch reports. Please try again.");

      }

      finally {
         setLoading(false);
       }
   };
   submit();
   }, [sendRequest]); 
   
   
   
   
   return (
      <div>
        {/* Show loading spinner when loading */}
        {loading && (
          <div className="overlay">
            <OrbitProgress color="#ffffff" size="medium" />
          </div>
        )}
    
        {/* Main content */}
        <div className="Previous-Report-Page">
          <Header page="reports" />
          <div className="main">
            {/* Render error message if requestResponse is set */}
            {!loading && requestResponse && (
              <div className="request-response">
                <p>{requestResponse}</p>
              </div>
            )}
    
            {/* Render report list if there are reports and no errors */}
            {!loading && reports && (
              <ReportList
                reports={reports}
                onDeleteReport={reportDeleteHandler}
                setRequestResponse={setRequestResponse}
              />
            )}
          </div>
          <Footer />
        </div>
      </div>
    );
    
}


