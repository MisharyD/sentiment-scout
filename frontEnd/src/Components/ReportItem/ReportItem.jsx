import { useState } from "react";
import Modal from "../Modal/Modal.jsx";

import "./ReportItem.css";

export default function ReportItem(props){

    const [showConfirmation, setShowConfirmation] = useState(false);

   const openConfirmationHandler = () => setShowConfirmation(true);
   const closeConfirmationHandler = () => setShowConfirmation(false);

   const deleteHandler = () => {
    console.log("deleted")
    closeConfirmationHandler();
   }


return(

    <div className="cardContainer"> 

    <Modal

    show = {showConfirmation} 
    onCancel = {closeConfirmationHandler}
    // header= "Delete"
     headerStyle = { { backgroundColor: "red" } }
     footer = { <div className="footer_buttons">
                <button className="cancel" onClick={closeConfirmationHandler}>Cancel</button>
                 <button className="submit_delete" onClick={deleteHandler}> delete</button> </div>} >
                <div className="content"> Are you sure you want to permanently delete this report? </div> 
                </Modal>

<div className="reportCard"> 
    
    <li> 
        <div className= {`platform ${props.platform} `}>{props.platform ===  "Google Maps"? "GOOGLE MAPS" : props.platform.toUpperCase() } </div>
        
        <div className='title'> <h2> {props.title} </h2> </div>
        
        <div className="lastRow">
        <div className='date'> {props.date} </div>
        <div className="buttons">
        <button className="view"> View </button>
        <button className="delete" onClick={openConfirmationHandler}> Delete </button>
        </div>
            </div>
    </li>  
        </div>
            </div>
);
}


