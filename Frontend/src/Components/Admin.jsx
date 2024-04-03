import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css'; 
function Admin() {
    const users = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        // Add more users as needed
      ];
  return (
    <>
    <h1>Choose a User:</h1>
    <div className="admin-container">
        
      <div className="admin-content">
      
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id}>
              <Link to={`/dashboard/${user.id}`} className="user-link">{user.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default Admin
