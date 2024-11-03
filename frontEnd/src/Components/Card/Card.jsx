import React from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Card(props) {
  return (
    <div style={props.style} className="card">
      <img className="card-image" src={props.src} alt={props.alt} />
      <h1 className="card-title">{props.cardTitle}</h1>
      <p className="card-description">{props.cardDescription}</p>
      <a className="card-link">
        {props.buttonText}
        <FontAwesomeIcon icon={faArrowRight} className="card-arrow" />
       
      </a>
    </div>
  );
}

export default Card;
