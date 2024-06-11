import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PrintDetails from '../components/PrintDetails';
import '../components/Home.css';

function Home() {
  const [prints, setPrints] = useState(null);
  const [printers, setPrinterStats] = useState([]);
  const [users, setUserStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePrints = await fetch('/api/prints');
        const jsonPrints = await responsePrints.json();
        if (responsePrints.ok) {
          setPrints(jsonPrints);
        }

        const responsePrinterStats = await fetch('/api/printers');
        const jsonPrinterStats = await responsePrinterStats.json();
        setPrinterStats(jsonPrinterStats);

        const responseUserStats = await fetch('/api/users');
        const jsonUserStats = await responseUserStats.json();
        setUserStats(jsonUserStats);
      } catch (err) {
        setError('Error fetching data: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      {isLoading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <div className="home-content-column">
          <div className="prints-section">
            <h2 style={{ textAlign: 'center', alignItems: 'center' }}>Print Logs</h2>
            <div className='prints-container'>
              {prints && prints.map((print) => (
                <PrintDetails key={print._id} print={print} />
              ))}
            </div>
          </div>

          <div className="stats-section">
            <h2>Estadisticas por Impresora</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={printers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombreImpresora" angle={-45} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalPaginasImpresasIm" fill="#8884d8" name="Total de Paginas Impresas" />
                <Bar dataKey="promedioPaginasPorTrabajoIm" fill="#82ca9d" name="Paginas Promedio por Trabajo" />
              </BarChart>
            </ResponsiveContainer>

            <h2>Estadísticas por Usuario</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={users}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombreUsuario" angle={-45} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalPaginasImpresas" fill="#ffc658" name="Total de Paginas Impresas" />
                <Bar dataKey="promedioPaginasPorTrabajo" fill="#ff8042" name="Paginas Promedio por Trabajo" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
