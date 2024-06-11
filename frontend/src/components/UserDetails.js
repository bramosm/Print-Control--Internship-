import React from 'react';
import './Details.css';

const UserDetails = ({ user, onUpdate, onDelete }) => {

  return (
    <div className="entity-details">
      <h1>{user.nombreDado} </h1> {/* Display both names */}
      <p><strong>Nombre del Usuario:</strong> {user.nombreUsuario}</p>
      <p><strong>Correo Electronico:</strong> {user.emailUsuario}</p>
      <p>
        <strong>Total Páginas Impresas:</strong> {user.totalPaginasImpresas === undefined ? 0 : user.totalPaginasImpresas}
      </p>
      <p>
        <strong>Promedio de Páginas por Trabajo:</strong> {user.promedioPaginasPorTrabajo === undefined ? 0 : user.promedioPaginasPorTrabajo}
      </p>
      {/* Add any other user details you want to display */}
      <div>
        <button onClick={() => onUpdate(user)}>Editar</button>
        <button onClick={() => onDelete('users', user._id)} className="delete-button">Eliminar</button>
      </div>
    </div>
  );
}

export default UserDetails;