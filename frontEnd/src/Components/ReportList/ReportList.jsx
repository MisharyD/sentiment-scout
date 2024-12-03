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
    
    return (
        <ul>
    {props.reports.map( report => (<ReportItem 
                                    key = {report.id}
                                    rId = {report.rId}
                                    platform = {report.platform} 
                                    title = {report.title} 
                                    date = {report.date}
                                    />    
                    )
                     )
                        }
        </ul>

        )
}