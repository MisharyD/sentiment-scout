import "../ReportCard/ReportCard.jsx";
import ReportCard from "../ReportCard/ReportCard.jsx";

export default function ReportItem(props){

    function getPlatformName(platform){

        switch(platform){
            case 'youtube':
                return 'red';
            case 'x':
                return 'black'
            case 'googleMaps':
                return 'green';
            default:
                return '';
        }

    }

    return(
        // <ReportCard platform = props={}>
            <div className="cardContainer">
       <li> 
    {/* add a <ReportCard /> here later */}
    <div className="reportCard"> 
        <div className={`platform ${getPlatformName(props.platform)}`}>{props.platform}</div>
        <div className='title'> <h2> {props.title} </h2> </div>
        <div className='date'>{props.date}</div>
        </div>
        
       </li>  

       </div>

    //    {/* </ReportCard> */}
      
       
    );
}