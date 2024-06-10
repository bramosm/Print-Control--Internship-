import React from 'react';
import './Details.css';

const AdminDetails = ({ admin, onUpdate, onDelete }) => {
  return (
    <div className="entity-details">
      <h1>{admin.nombreAdmin}</h1>
      <p><strong>Email:</strong> {admin.emailAdmin}</p>
      {/* Avoid displaying sensitive information like password */}
      {/* Add other relevant admin details */}

      <div>
        <button onClick={() => onUpdate(admin)}>Edit</button>
        <button onClick={() => onDelete('admins', admin._id)} className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default AdminDetails;

