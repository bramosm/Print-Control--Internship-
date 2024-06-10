import React, { useState, useEffect } from 'react';
import './Form.css'; // Make sure this file exists

function AdminForm({ admin, onClose, fetchAdmins, setError }) {
  const [formData, setFormData] = useState({
    nombreAdmin: admin?.nombreAdmin || '',
    emailAdmin: admin?.emailAdmin || '',
    passAdmin: '', // Start with an empty password field
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Clear errors and set initial form data (exclude password for editing)
    setError(null);
    setFormData({
      nombreAdmin: admin?.nombreAdmin || '',
      emailAdmin: admin?.emailAdmin || '',
      passAdmin: '', 
    });
  }, [admin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombreAdmin) newErrors.nombreAdmin = 'Admin name is required';
    if (!formData.emailAdmin) newErrors.emailAdmin = 'Email is required';
    if (!formData.passAdmin && !admin) { // Require password only for new admins
      newErrors.passAdmin = 'Password is required';
    }
    // Add more validation rules as needed (e.g., email format, password strength)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Don't submit if there are errors

    const method = admin ? 'PUT' : 'POST'; // PUT for update, POST for create
    const endpoint = admin ? `/api/admins/${admin._id}` : '/api/admins';

    try {
      // Send data to backend (no password hashing here)
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
        fetchAdmins();
      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred.');
      }
    } catch (err) {
      setError('Error communicating with the server.');
    }
  };

  return (
    <div className="entity-form-overlay" onClick={onClose}>
      <div className="entity-form-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="form-title">{admin ? 'Edit Admin' : 'Create Admin'}</h2>
        <form onSubmit={handleSubmit} className="entity-form">
          <div className="form-group">
            <label htmlFor="nombreAdmin">Nombre del Admin:</label>
            <input type="text" id="nombreAdmin" name="nombreAdmin" value={formData.nombreAdmin} onChange={handleChange} />
            {errors.nombreAdmin && <p className="error-message">{errors.nombreAdmin}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="emailAdmin">Email del Admin:</label>
            <input type="email" id="emailAdmin" name="emailAdmin" value={formData.emailAdmin} onChange={handleChange} />
            {errors.emailAdmin && <p className="error-message">{errors.emailAdmin}</p>}
          </div>
          {!admin && ( // Only show password field for new admins
            <div className="form-group">
              <label htmlFor="passAdmin">Contraseña:</label>
              <input type="password" id="passAdmin" name="passAdmin" value={formData.passAdmin} onChange={handleChange} />
              {errors.passAdmin && <p className="error-message">{errors.passAdmin}</p>}
            </div>
          )}
          <div className="form-buttons">
            <button type="submit">{admin ? 'Update' : 'Create'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminForm;