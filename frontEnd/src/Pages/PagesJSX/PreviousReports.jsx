import ReportList from "../../Components/ReportList/ReportList.jsx";
import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";

import { useParams } from "react-router-dom";
// import { format } from 'date-fns';

import '../PagesCSS/PreviousReports.css';

//this will be used later when fetching data from DB
//  function formatDate (date){
//     return format(date, 'M/d/yyyy'); // to be withou zero in the left like 3/23/2003 or 3/1/2003

// }

const reports = [
    {
        rId: 'r1',
        platform: 'youtube',
        title: '10 Simple Hacks to Boost Your Productivity in 2024',
        date: '11/3/2024'
    },
    {
        rId: 'r2',
        platform: 'x',
        title: 'The Ultimate Guide to Mastering AI Tools',
        date: '11/1/2024'
    },

    {
        rId: 'r3',
        platform: 'youtube',
        title: '5 Game-Changing Tips for Staying Productive in a Busy World',
        date: '11/3/2024'
    },

    {
        rId: 'r4',
        platform: 'googleMaps',
        title: 'KSU university',
        date: '10/25/2024'
    },
   ];

export default function PreviousReports(){

    

   return ( 
    <div className="Previous-Report-Page" >
    <Header page = "reports" />
    <div className="main">
   <ReportList reports = {reports} /> 
   </div>
   <Footer />


   </div>
   

   )
}


