import "./ReportList.css";
import ReportItem from "../../Components/ReportItem/ReportItem.jsx";
import { Link } from "react-router-dom";

export default function ReportList(props){

    if (props.reports.length === 0){
        return (

        <div className="center-container">
        <p> It looks a bit empty here! Create reports to get started. </p> 
       <Link to="/generate/youtube"> <button className="gradient1"> Create Report </button> </Link> 
        </div>
        );

    }

    const getTitleBasedOnPlatform = (report) => {
        switch(report.platform){
            case "YouTube":
                return report.videoTitle

            case "Google Maps":
                return report.placeTitle

            case "TikTok":
            return report.caption
        }

    }

    const formatDate = (dateString) => {
        return dateString.split("T")[0];
      };
    
    return (
        <ul>
    {props.reports.map( report => (<ReportItem 
                                    key = {report.id}
                                    rId = {report._id}
                                    platform = {report.platform} 
                                    title = {getTitleBasedOnPlatform(report)} 
                                    date = {formatDate(report.dateOfReport)}
                                    onDelete = {props.onDeleteReport}
                                    />    
                    )
                     )
                        }
        </ul>

        )
}