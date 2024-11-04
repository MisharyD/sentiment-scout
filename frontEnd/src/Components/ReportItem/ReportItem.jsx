// import "../ReportCard/ReportCard.jsx";
import "./ReportItem.css";
// import ReportCard from "../ReportCard/ReportCard.jsx";

export default function ReportItem(props){

return(
    <div className="cardContainer"> 
<div className="reportCard"> 
    {/* <div className= {`title ${props.platform}`}>   </div> */}

    <li> 
    {/* add a <ReportCard /> here later */}
    {/* <div className="reportCard">  ${getPlatformName(props.platform)} */}
    {/* ${props.platformColor} */}

        <div className= {`platform ${props.platform} `}>{props.platform ===  "googleMaps"? "GOOGLE MAPS" : props.platform.toUpperCase() } </div>
        <div className='title'> <h2> {props.title} </h2> </div>
        <div className="lastRow">
        <div className='date'>{props.date}</div>
        <div className="buttons">
        <button className="view">View</button>
        <button className="delete">Delet</button>
        </div>
        </div>

        {/* </div> */}

       </li>  

     {/* {props.children}  */}

</div>
</div>
    // function getPlatformColor(platform){

    //     switch(platform){
    //         case 'youtube':
    //             return 'red';
    //         case 'x':
    //             return 'black'
    //         case 'googleMaps':
    //             return 'green';
    //         default:
    //             return '';
    //     }

    // }

    // return(
    //      <ReportCard platform = {props.platform} title = {props.title} date = {props.date} />
            
      
       
    // );
);
}


