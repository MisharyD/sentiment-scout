import "./ReportItem.css";

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
   
       <li> 
    {/* add a <ReportCard /> here later */}

        <div className={`platform ${getPlatformName(props.platform)}`}>{props.platform}</div>
        <div className='title'>{props.title}</div>
        <div className='date'>{props.date}</div>


       </li>  
    );
}