import "./ReportList.css";
import ReportItem from "../../Components/ReportItem/ReportItem.jsx";

export default function ReportList(props){

    if (props.reports.length === 0)
        return <h3> It looks a bit empty here! Create reports to get started. </h3>;

    return (
        <div>
    {props.reports.map( report => (<ReportItem 
                                    key = {report.id}
                                    id = {report.id} 
                                    platform = {report.platform} 
                                    title = {report.title} 
                                    date = {report.date}
                                    />    
                    )
                     )
                        }
        </div>

        )
}