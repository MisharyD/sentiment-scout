import { useState, useEffect } from "react";
import { useHttpClient } from "../../Components/shared/hooks/http-hook.jsx";
import { useParams } from "react-router-dom";
import ReportList from "../../Components/ReportList/ReportList.jsx";
import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import '../PagesCSS/PreviousReports.css';

export default function PreviousReports(){

   const { uid } = useParams();
   const { sendRequest } = useHttpClient();
   const [loading, setLoading] = useState(false);
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
      } catch(err){

         console.log("FFFFFFFFFFFFFFFF")

      }

      setLoading(false);
   };
   submit();
   }, [sendRequest]); 
   
   
   
   
   return ( 
    <div className="Previous-Report-Page" >
    <Header page = "reports" />
    <div className="main">
   {!loading && reports && <ReportList reports = {reports} onDeleteReport = {reportDeleteHandler} />} {/* here should put array of reports that is fetched from the DB */}
   </div>
   <Footer />
   
   </div>
   )
}


