import './Details.css';
const AdminDetails = ({ admin }) => {
    return (
      <div className="entity-details">
        <h1>{admin.nombreAdmin}</h1>
        <p><strong>Email:</strong> {admin.emailAdmin}</p> 
        {/* Avoid displaying sensitive information like password */}
        {/* Add other relevant admin details */}
      </div>
    );
  };
  
  export default AdminDetails;