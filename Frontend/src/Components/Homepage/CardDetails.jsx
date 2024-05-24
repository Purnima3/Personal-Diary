// src/CardDetails.js
import React from "react";

const CardDetails = ({ card, onClose }) => {
	return (
		<div className="card-details">
			<h2>{card.title}</h2>
			<p>{card.content}</p>
			<button onClick={onClose}>Close</button>
		</div>
	);
};

export default CardDetails;
