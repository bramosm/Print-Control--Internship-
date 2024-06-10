import React, { useState, useEffect } from 'react';
import './Form.css';

function UserForm({ user, onClose, fetchUsers, setError }) {
  const [formData, setFormData] = useState({
    nombreUsuario: user?.nombreUsuario || '',
    nombreDadoU: user?.nombreDadoU || '',
    apellidoUsuario: user?.apellidoUsuario || '',
    emailUsuario: user?.emailUsuario || '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Clear errors and set initial form data on mount or when the 'user' prop changes
    setError(null);
    setFormData({
      nombreUsuario: user?.nombreUsuario || '',
      nombreDadoU: user?.nombreDadoU || '',
      apellidoUsuario: user?.apellidoUsuario || '',
      emailUsuario: user?.emailUsuario || '',
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombreUsuario) newErrors.nombreUsuario = 'Username is required';
    if (!formData.nombreDadoU) newErrors.nombreDadoU = 'First name is required';
    // Add more validation rules as needed (e.g., email format, password strength)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const method = user ? 'PUT' : 'POST'; // PUT for update, POST for create
    const endpoint = user ? `/api/users/${user._id}` : '/api/users';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose(); // Close the modal
        fetchUsers(); // Refresh the user list in the parent component
      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred.'); // Show error message from the server
      }
    } catch (err) {
      setError('Error communicating with the server.');
    }
  };

  return (
    <div className="entity-form-overlay" onClick={onClose}>
      <div className="entity-form-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="form-title">{user ? 'Edit User' : 'Create User'}</h2>
        <form onSubmit={handleSubmit} className="entity-form">
          <div className="form-group">
            <label htmlFor="nombreUsuario">Nombre de Usuario:</label>
            <input type="text" id="nombreUsuario" name="nombreUsuario" value={formData.nombreUsuario} onChange={handleChange} />
            {errors.nombreUsuario && <p className="error-message">{errors.nombreUsuario}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="nombreDadoU">Nombre Dado:</label>
            <input type="text" id="nombreDadoU" name="nombreDadoU" value={formData.nombreDadoU} onChange={handleChange} />
            {errors.nombreDadoU && <p className="error-message">{errors.nombreDadoU}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="emailUsuario">Email del Usuario:</label>
            <input type="email" id="emailUsuario" name="emailUsuario" value={formData.emailUsuario} onChange={handleChange} />
            {errors.emailUsuario && <p className="error-message">{errors.emailUsuario}</p>}
          </div>
          <div className="form-buttons">
            <button type="submit">{user ? 'Update' : 'Create'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
