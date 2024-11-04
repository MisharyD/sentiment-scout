import "./ReportList.css";
import ReportItem from "../../Components/ReportItem/ReportItem.jsx";

export default function ReportList(props){

    if (props.reports.length === 0)
        return <h3> It looks a bit empty here! Create reports to get started. </h3>;
    // add button to allow him generate one

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