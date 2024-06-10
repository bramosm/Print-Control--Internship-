import React, { useState, useEffect } from 'react';
import UserForm from '../components/UserForm';
import PrinterForm from '../components/PrinterForm';
import AdminForm from '../components/AdminForm';
import UserDetails from '../components/UserDetails';
import PrinterDetails from '../components/PrinterDetails';
import AdminDetails from '../components/AdminDetails';
import '../components/AdminCRUD.css';
import { fetchUsers, fetchAdmins, fetchPrinters } from './api'

function AdminCRUD() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [printers, setPrinters] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await fetch('/api/users');
        const jsonUsers = await responseUsers.json();
        setUsers(jsonUsers);

        const responsePrinters = await fetch('/api/printers');
        const jsonPrinters = await responsePrinters.json();
        setPrinters(jsonPrinters);

        const responseAdmins = await fetch('/api/admins');
        const jsonAdmins = await responseAdmins.json();
        setAdmins(jsonAdmins);
      } catch (err) {
        setError('Error fetching data: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Functions to handle CRUD operations (create, update, delete)
  const handleCreate = () => {
    setSelectedEntity(null);
    setShowForm(true);
  };

  const handleUpdate = (entity) => {
    setSelectedEntity(entity);
    setShowForm(true);
  };

  const handleDelete = async (entityType, entityId) => {
    if (window.confirm(`Are you sure you want to delete this ${entityType}?`)) {
      try {
        const response = await fetch(`/api/${entityType}/${entityId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Refresh the list after deletion
          if (entityType === 'users') {
            setUsers(users.filter(user => user._id !== entityId));
          } else if (entityType === 'printers') {
            setPrinters(printers.filter(printer => printer._id !== entityId));
          } else if (entityType === 'admins') {
            setAdmins(admins.filter(admin => admin._id !== entityId));
          }
        } else {
          setError(`Error deleting ${entityType}`);
        }
      } catch (err) {
        setError(`Error deleting ${entityType}: ${err.message}`);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedEntity(null); // Clear selected entity after form submission
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'users':
        return (
          <UserForm
            user={selectedEntity}
            onClose={handleCloseForm}
            fetchUsers={fetchUsers}
            setError={setError}
          />
        );
      case 'printers':
        return (
          <PrinterForm
            printer={selectedEntity}
            onClose={handleCloseForm}
            fetchPrinters={fetchPrinters}
            setError={setError}
          />
        );
      case 'admins':
        return (
          <AdminForm
            admin={selectedEntity}
            onClose={handleCloseForm}
            fetchAdmins={fetchAdmins}
            setError={setError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="admincrud">
      <h2>Admin Panel</h2>
      <div className="tabs">
        <button onClick={() => setActiveTab('users')}>Users</button>
        <button onClick={() => setActiveTab('printers')}>Printers</button>
        <button onClick={() => setActiveTab('admins')}>Admins</button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <div className="admincrud">
          <button onClick={handleCreate}>Create</button> 

          {/* Display entity list based on activeTab */}
          {activeTab === 'users' && (
            <div className="entity-list">
              {users.map(user => (
                <UserDetails 
                  key={user._id} 
                  user={user} 
                  onUpdate={handleUpdate} 
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {activeTab === 'printers' && (
            <div className="entity-list">
              {printers.map(printer => (
                <PrinterDetails
                  key={printer._id}
                  printer={printer}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {activeTab === 'admins' && (
            <div className="entity-list">
              {admins.map(admin => (
                <AdminDetails 
                  key={admin._id} 
                  admin={admin} 
                  onUpdate={handleUpdate} 
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          )}
        </div>
      )}

      {showForm && renderForm()} 
    </div>
  );
}

export default AdminCRUD;