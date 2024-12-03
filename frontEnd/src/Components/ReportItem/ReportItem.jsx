import "./ReportItem.css";

export default function ReportItem(props){

return(

    <div className="cardContainer"> 
<div className="reportCard"> 
    
    <li> 
        <div className= {`platform ${props.platform} `}>{props.platform ===  "Google Maps"? "GOOGLE MAPS" : props.platform.toUpperCase() } </div>
        
        <div className='title'> <h2> {props.title} </h2> </div>
        
        <div className="lastRow">
        <div className='date'> {props.date} </div>
        <div className="buttons">
        <button className="view"> View </button>
        <button className="delete"> Delet </button>
        </div>
            </div>
    </li>  
        </div>
            </div>
);
}


