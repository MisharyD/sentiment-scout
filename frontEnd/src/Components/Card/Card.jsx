/// src/components/Card.js
import React from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function Card(props) {
  // Define animation variants
  const cardVariants = {
    offscreen: {
      y: 300,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: props.speed,
      },
    },
  };

  return (
    <motion.div
      style={props.style}
      className="card"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      variants={cardVariants}
      whileHover="hover"
    >
      <img className="card-image" src={props.src} alt={props.alt} />
      <h1 className="card-title">{props.cardTitle}</h1>
      <p className="card-description">{props.cardDescription}</p>
      <Link to={props.path} className="card-link" href={props.link}>
        {props.buttonText}
        <FontAwesomeIcon icon={faArrowRight} className="card-arrow" />
      </Link>
    </motion.div>
  );
}

export default Card;


// import React from "react";
// import "./Card.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// function Card(props) {
//   return (
//     <div style={props.style} className="card">
//       <img className="card-image" src={props.src} alt={props.alt} />
//       <h1 className="card-title">{props.cardTitle}</h1>
//       <p className="card-description">{props.cardDescription}</p>
//       <a className="card-link">
//         {props.buttonText}
//         <FontAwesomeIcon icon={faArrowRight} className="card-arrow" />
       
//       </a>
//     </div>
//   );
// }

// export default Card;
