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
    // This div later will be <Card>
       <div> 

        <div className={`platform ${getPlatformName(props.platform)}`}>{props.platform}</div>
        <div className='title'>{props.title}</div>
        <div className='date'>{props.date}</div>


       </div>  
    );
}