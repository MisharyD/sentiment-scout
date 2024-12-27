/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHttpClient } from "../shared/hooks/http-hook.jsx";

import { OrbitProgress } from "react-loading-indicators";
import Modal from "../Modal/Modal.jsx";

import "./ReportItem.css";

export default function ReportItem(props){


    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false)
    const { sendRequest } = useHttpClient();

   const openConfirmationHandler = () => setShowConfirmation(true);
   const closeConfirmationHandler = () => setShowConfirmation(false);


   const deleteHandler = async () => {
    closeConfirmationHandler();
    setLoading(true)
    try{
    const responseData = await sendRequest( import.meta.env.VITE_BACKEND_URL+ `reports/${props.platform}/${props.rId}`, 
        "DELETE");
        console.log(responseData.message)
        props.onDelete(props.rId);
        props.setRequestResponse("");

    } catch(err){
       
        props.setRequestResponse("Failed to delete the report. Please try again.");
       
    }

    finally{
        setLoading(false)
    }

   }

   return (
    <div className="cardContainer">
      {loading && ( // Spinner while deleting
        <div className="overlay">
          <OrbitProgress color="#ffffff" size="medium" />
        </div>
      )}

      <Modal
        show={showConfirmation}
        onCancel={closeConfirmationHandler}
        headerStyle={{ backgroundColor: "red" }}
        footer={
          <div className="footer_buttons">
            <button className="cancel" onClick={closeConfirmationHandler}>
              Cancel
            </button>
            <button className="submit_delete" onClick={deleteHandler}>
              Delete
            </button>
          </div>
        }
      >
        <div className="content">
          Are you sure you want to permanently delete this report?
        </div>
      </Modal>

      <div className="reportCard">
        <li>
          <div
            className={`platform ${
              props.platform === "Google Maps" ? "GoogleMaps" : props.platform
            } `}
          >
            {props.platform}
          </div>

          <div className="title">
            <h2> {props.title} </h2>
          </div>

          <div className="lastRow">
            <div className="date"> {props.date} </div>
            <div className="buttons">
                
              <NavLink
                className="view"
                to={`/reports/${props.platform}/${props.rId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
               View
              </NavLink>

              <button className="delete" onClick={openConfirmationHandler}>
                Delete
              </button>
            </div>
          </div>
        </li>
      </div>
    </div>
  );
}