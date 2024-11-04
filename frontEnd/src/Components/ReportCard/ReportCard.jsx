import "./ReportCard.css";

export default function ReportCard(props){

return (
<div className={`cardContainer ${props.platform}`} >
<div className="reportCard"> 
    <div className="props.platform"></div>

     {props.children} 

</div>
</div>
);

}