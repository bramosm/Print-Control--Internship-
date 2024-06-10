import './Details.css';
const UserDetails = ({ user }) => {
    return (
      <div className="entity-details">
        <h1>{user.nombreDado}</h1>
        <p><strong>Nombre del Usuario:</strong> {user.nombreUsuario}</p>
        <p><strong>Correo Electronico:</strong> {user.emailUsuario}</p>
        <p><strong>Total Páginas Impresas:</strong> {user.totalPaginasImpresas}</p>
        <p><strong>Promedio de Páginas por Trabajo:</strong> {user.promedioPaginasPorTrabajo}</p>
        {/* Add any other user details you want to display */}
      </div>
    );
  }
  
  export default UserDetails;