import React, { useState, useEffect } from 'react';
import './Form.css';

function PrinterForm({ printer, onClose, fetchPrinters, setError }) {
  const [formData, setFormData] = useState({
    nombreImpresora: printer?.nombreImpresora || '',
    ipImpresora: printer?.ipImpresora || '',
    // Add other fields from your Printer model as needed (e.g., model, location, etc.)
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setError(null);
    setFormData({
      nombreImpresora: printer?.nombreImpresora || '',
      ipImpresora: printer?.ipImpresora || '',
      // ... other fields ...
    });
  }, [printer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombreImpresora) newErrors.nombreImpresora = 'Printer name is required';
    if (!formData.ipImpresora) newErrors.ipImpresora = 'IP Address is required';
    // Add more validation rules as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const method = printer ? 'PUT' : 'POST'; // PUT for update, POST for create
    const endpoint = printer ? `/api/printers/${printer._id}` : '/api/printers'; 

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onClose(); // Close the modal
        fetchPrinters(); // Refresh the printer list
      } else {
        setError(data.error || 'An error occurred.'); 
      }
    } catch (error) {
      console.error("Error:", error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="entity-form-overlay" onClick={onClose}>
      <div className="entity-form-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="form-title">{printer ? 'Edit Printer' : 'Create Printer'}</h2>
        <form onSubmit={handleSubmit} className="entity-form">
          <div className="form-group">
            <label htmlFor="nombreImpresora">Nombre de la Impresora:</label>
            <input 
              type="text" 
              id="nombreImpresora" 
              name="nombreImpresora" 
              value={formData.nombreImpresora} 
              onChange={handleChange}
            />
            {errors.nombreImpresora && <p className="error-message">{errors.nombreImpresora}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="ipImpresora">Dirección IP:</label>
            <input 
              type="text" 
              id="ipImpresora" 
              name="ipImpresora" 
              value={formData.ipImpresora} 
              onChange={handleChange}
            />
            {errors.ipImpresora && <p className="error-message">{errors.ipImpresora}</p>}
          </div>

          {/* Add other input fields for your printer model as needed */}

          <div className="form-buttons">
            <button type="submit">{printer ? 'Update' : 'Create'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrinterForm;
