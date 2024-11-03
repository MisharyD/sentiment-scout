import ReportList from "../../Components/ReportList/ReportList.jsx";
import Header from "../../Components/Header/Header.jsx";


import '../PagesCSS/PreviousReports.css';


export default function PreviousReports(){

   const reports = [
    {
        id: 'r1',
        platform: 'youtube',
        title: '10 Simple Hacks to Boost Your Productivity in 2024',
        date: '11/3/2024'
    },
    {
        id: 'r2',
        platform: 'X',
        title: 'The Ultimate Guide to Mastering AI Tools',
        date: '11/1/2024'
    },

    {
        id: 'r3',
        platform: 'youtube',
        title: '5 Game-Changing Tips for Staying Productive in a Busy World',
        date: '11/3/2024'
    },

    {
        id: 'r4',
        platform: 'google maps',
        title: 'KSU university',
        date: '10/25/2024'
    },
   ];

   return <ReportList reports = {reports} />
}

