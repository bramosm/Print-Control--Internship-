import './Details.css';
const PrinterDetails = ({ printer }) => {
    return (
      <div className="entity-details">
        <h1>{printer.nombreImpresora}</h1>
        <p><strong>IP de la Impresora:</strong> {printer.ipImpresora}</p>
        <p><strong>Total Páginas Impresas:</strong> {printer.totalPaginasImpresasIm}</p>
        <p><strong>Promedio de Páginas por Trabajo:</strong> {printer.promedioPaginasPorTrabajoIm}</p>
        {/* Add other printer details as needed */}
      </div>
    );
  }
  
  export default PrinterDetails;