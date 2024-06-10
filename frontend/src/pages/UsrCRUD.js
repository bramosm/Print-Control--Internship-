import React, { useState, useEffect } from 'react';
import UserDetails from '../components/UserDetails';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'; // Import PieChart from Recharts
import '../components/UserCRUD.css';

function UserCRUD() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const json = await response.json();

        if (response.ok) {
          setUsers(json);
        } else {
          setError('Error fetching users: ' + response.statusText);
        }
      } catch (err) {
        setError('Error fetching users: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

 
  return (
    <div className="usercrud">

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <div className="usercrud flex flex-row flex grow"> {/* Main container is now using flexbox */}
          {/* User List Section */}
          <div className="users-list">
            {users.map((user) => (
              <UserDetails key={user._id} user={user} />
            ))}
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <h2>Estadísticas</h2>

            {/* Bar Chart for Total Pages Printed */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={users}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombreUsuario" angle={-45} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalPaginasImpresas" fill="#ffc658" name="Total de Páginas Impresas" />
              </BarChart>
            </ResponsiveContainer>

            {/* Bar Chart for Average Pages per Job */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={users}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombreUsuario" angle={-45} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="promedioPaginasPorTrabajo" fill="#ff8042" name="Promedio de Páginas por Trabajo" />
              </BarChart>
            </ResponsiveContainer>

            {/* Pie Chart for Comparing User Stats */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={users.map(user => ({ name: user.nombreUsuario, value: user.totalPaginasImpresas }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {users.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCRUD;