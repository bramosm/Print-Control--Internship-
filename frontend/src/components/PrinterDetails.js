import React from 'react';
import './Details.css';

const PrinterDetails = ({ printer, onUpdate, onDelete }) => {
  return (
    <div className="entity-details">
      <h1>{printer.nombreImpresora}</h1>
      <p><strong>IP de la Impresora:</strong> {printer.ipImpresora || 'N/A'}</p>
      <p><strong>Total Páginas Impresas:</strong> {printer.totalPaginasImpresasIm || 0}</p>
      <p><strong>Promedio de Páginas por Trabajo:</strong> {printer.promedioPaginasPorTrabajoIm || 0}</p>
      {/* Add other printer details as needed */}

      <div>
        <button onClick={() => onUpdate(printer)}>Edit</button>
        <button onClick={() => onDelete('printers', printer._id)} className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default PrinterDetails;
