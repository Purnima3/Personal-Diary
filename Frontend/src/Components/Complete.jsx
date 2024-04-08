import React from "react";

import Navbar from "./Navbar/Navbar";
import Patient from "./Patient/Patient";

function Complete(props) {
	// Assigning props.data.css to v if it's defined, otherwise default to false

	return (
		<div>
			<Navbar d={props.data} />
			<Patient d={props.data.css} />
		</div>
	);
}

export default Complete;
