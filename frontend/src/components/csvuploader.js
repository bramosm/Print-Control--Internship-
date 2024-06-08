import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';
import './csvuploader.css';

function CSVUploader() {
  const [csvData, setCsvData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [csvFilename, setCsvFilename] = useState('downloaded_data.csv');

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        const response = await fetch('/getcsv'); 
        if (!response.ok) {
          throw new Error('Could not fetch CSV file');
        }

        const csvDataBuffer = await response.text(); // Get CSV data as text

        Papa.parse(csvDataBuffer, {
          header: true,
          complete: (results) => {
            setCsvData(results.data);
            setIsLoading(false); 
          },
          error: (err) => {
            setError(err.message);
            setIsLoading(false);
          },
        });
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCsvData();

    return () => {
      setCsvData([]);
      setIsLoading(false);
      setError(null);
    };
  }, []); 

  const handleDownload = () => {
    setCsvFilename('Registros');
  };

  return (
  
  
    <div className="csv-uploader-container">
     <h2 className='h2'>CSV Data</h2>

      {isLoading ? ( 
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <div class="flex items-center" className="table-container">
          {csvData.length > 0 ? ( // Check csvData length before rendering
            <table>
              <thead>
                <tr>
                  {Object.keys(csvData[0]).map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available.</p> // Message if csvData is empty
          )}

        
          {/* Render CSVLink only if csvData has data */}

          <div class="flex flex-col relative top-5">
           {csvData.length > 0 && ( 
               
                 <CSVLink 
                   class=""
                   data={csvData} 
                   filename={csvFilename} 
                   onClick={handleDownload}
                   className="download-button" 
                 >
                   Download CSV
                 </CSVLink>
           )}
           </div>
          
        </div>

      )}
    </div>
     
  );
}

export default CSVUploader;


