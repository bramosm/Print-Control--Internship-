import React, { useState, useEffect } from 'react';
import '../components/ServerInfo.css';

function ServerInfo() {
  const [server, setServerInfo
  ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    const fetchServerInfo = async () => {
      try {
        const response = await fetch('/api/servers');
        const json = await response.json(); // Get JSON directly

        if (response.ok) {
          setServerInfo(json); // Assuming one server document, access the first element
        } else {
          setError('Error fetching server information: ' + response.statusText);
        }
      } catch (err) {
        setError('Error fetching server information: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServerInfo();
  }, []);

  return (
    <div className="server-info-container">
      <h1 className="text-2xl font-semibold mb-4">Información del Servidor</h1>

      {isLoading ? (
        <p className="loading-message">Loading...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <table className="server-info-table">
          <tbody>
            <tr>
              <td className="table-label">Nombre del Servidor:</td>
              <td>{server.nombreServidor}</td>
            </tr>
            <tr>
              <td className="table-label">Máquina Anfitriona:</td>
              <td>{server.maquinaAnfitriona}</td>
            </tr>
            <tr>
              <td className="table-label">Direcciones IP:</td>
              <td>{server.direccionesIP}</td>
            </tr>
            <tr>
              <td className="table-label">Dominio:</td>
              <td>{server.dominio}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ServerInfo;
