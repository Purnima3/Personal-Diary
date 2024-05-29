import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from "../Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../back-api/user";
import "./Admin.css";

function Admin(props) {
	const uusers = [
		{ id: 1, name: "Patient 1" },
		{ id: 2, name: "Patient 2" },
		// Add more users as needed
	];

	//python flask code
	const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getUsers();
                setUsers(users);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
	

	return (
		<>
			<Navbar d={props.data} />
			<h1>Choose a Patient:</h1>
			<div>
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Role ID</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email_id}</td>
                            <td>{user.name}</td>
                            <td>{user.address}</td>
                            <td>{user.roleId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
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
			</div>  */}
			
		</>
	);
}

export default Admin;
