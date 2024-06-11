import React, { useState, useEffect } from 'react';
import PrinterList from '../components/PrinterList';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../components/PrinterCRUD.css';

function PrinterCRUD() {
  const [printers, setPrinters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await fetch('/api/printers');
        const json = await response.json();

        if (response.ok) {
          setPrinters(json);
        } else {
          setError('Error fetching printers: ' + response.statusText);
        }
      } catch (err) {
        setError('Error fetching printers: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrinters();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="printercrud">

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <div className="printercrud flex flex-row flex grow"> {/* Main container is now using flexbox */}
          {/* Printer List Section */}
          <div className="printers-list">
            {printers.map((printer) => (
              <PrinterList key={printer._id} printer={printer} />
            ))}
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <h2>Printer Statistics</h2>

            {/* Bar Chart for Total Pages Printed */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={printers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombreImpresora" angle={-45} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalPaginasImpresasIm" fill="#ffc658" name="Total de Páginas Impresas" />
              </BarChart>
            </ResponsiveContainer>

            {/* Bar Chart for Average Pages per Job */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={printers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombreImpresora" angle={-45} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="promedioPaginasPorTrabajoIm" fill="#ff8042" name="Promedio de Páginas por Trabajo" />
              </BarChart>
            </ResponsiveContainer>

            {/* Pie Chart for Comparing Printer Stats */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={printers.map(printer => ({ name: printer.nombreImpresora, value: printer.totalPaginasImpresasIm }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {printers.map((entry, index) => (
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


export default PrinterCRUD