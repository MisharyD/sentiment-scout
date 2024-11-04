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
        uId: '6727c3322de556217a530aae',
        rId: 'r1',
        platform: 'youtube',
        title: '10 Simple Hacks to Boost Your Productivity in 2024',
        date: '11/3/2024'
    },
    {
        uId: 'u1',
        rId: 'r2',
        platform: 'X',
        title: 'The Ultimate Guide to Mastering AI Tools',
        date: '11/1/2024'
    },

    {
        uId: 'u2',
        rId: 'r1',
        platform: 'youtube',
        title: '5 Game-Changing Tips for Staying Productive in a Busy World',
        date: '11/3/2024'
    },

    {
        uId: 'u2',
        rId: 'r2',
        platform: 'google maps',
        title: 'KSU university',
        date: '10/25/2024'
    },
   ];

export default function PreviousReports(){

    const userId = useParams().uId; 
    const myReports = reports.filter(report => userId === report.uId);

   return ( 
    <div className="Previous-Report-Page" >
    <Header page = "reports" />
    <div className="main">
   <ReportList reports = {myReports} /> 
   </div>
   <Footer />


   </div>
   

   )
}


