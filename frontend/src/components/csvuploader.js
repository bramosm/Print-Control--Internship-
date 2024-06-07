import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';
import './csvuploader.css';

function CSVUploader() {
  const [csvData, setCsvData] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csvFilename, setCsvFilename] = useState('downloaded_data.csv');

  useEffect(() => {
    // Reset csvData when the component unmounts
    return () => {
      setCsvData([]); 
    };
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setIsLoading(true);

      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setIsLoading(false);
          setCsvData(results.data);
        },
        error: (err) => {
          setIsLoading(false);
          setError(err.message);
        },
      });
    }
  };

  const handleDownload = () => {
    setCsvFilename('my_custom_filename.csv');
  };

  return (
    <div className="csv-uploader-container">
      <h2>CSV Uploader</h2>

      <div className="file-input">
        <input type="file" accept=".csv" onChange={handleFileUpload} id="file-upload" />
        <label htmlFor="file-upload">Choose a CSV file</label>
      </div>

      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      )}
      {error && <p className="error-message">Error: {error}</p>}

      {/* Conditional Rendering of CSVLink */}
      {csvData && csvData.length > 0 && ( // Check if csvData is available and not empty
        <div className="table-container">
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
        </div>
      )}
      <CSVLink 
            data={csvData} 
            filename={csvFilename} 
            onClick={handleDownload}
            className="download-button" 
          >
            Download CSV
          </CSVLink>
    </div>
  );
}

export default CSVUploader;

