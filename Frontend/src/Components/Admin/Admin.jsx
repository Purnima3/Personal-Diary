import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {useState} from 'react'
import Navbar from "../Navbar/Navbar";
import "./Admin.css";
function Admin(props) {

	const users = [
		{ id: 1, name: "Patient 1" },
		{ id: 2, name: "Patient 2" },
		// Add more users as needed
	];

	//python flask code 
	const [accuracy, setAccuracy] = useState(null);

	useEffect(() => {
        // Fetch the accuracy from the Flask API
        fetch("/flask_api/ml")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setAccuracy(data.accuracy))
            .catch(error => console.error('Error fetching accuracy:', error));
    }, []); 


	return (
		<>
			<Navbar d={props.data} />
			<h1>Choose a Patient:</h1>
			<p>
			output: {accuracy !== null ? accuracy : "Loading..."}
			</p>
			{/* <div className="admin-container">
				<div className="admin-content">
					<ul className="user-list">
						{users.map((user) => (
							<li key={user.id}>
								<Link to={`/dashboard/${user.id}`} className="user-link">
									{user.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div> */}
		</>
	);
}

export default Admin;
