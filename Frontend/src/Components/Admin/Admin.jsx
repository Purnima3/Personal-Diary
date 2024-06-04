import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Admin.css";

function Admin(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
		console.log("hi this is useeffect")
        // Fetch the users from the backend API
        fetch("http://localhost:4000/api/users")
            .then((res) => {
                if (!res.ok) {
					console.log("error")
                    throw new Error("Network response was not ok");
                }
				console.log("hogaya")
                return res.json();
            })
			
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    return (
        <>
            <Navbar d={props.data} />
            <h1>Choose a Patient:</h1>
            <div className="admin-container">
                <div className="admin-content">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>
                                        <Link to={`/dashboard/${user.id}`} className="user-link">
                                            {user.name}
                                        </Link>
                                    </td>
                                    <td>{user.email_id}</td>
                                    <td>{user.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Admin;
