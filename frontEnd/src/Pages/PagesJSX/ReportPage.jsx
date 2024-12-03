import { useParams } from 'react-router-dom';
import "../PagesCSS/reportPage.css";

export default function ReportPage(){
    const { rId } = useParams();
    console.log(rId);
    return(
        <div>Hi</div>
    )
}