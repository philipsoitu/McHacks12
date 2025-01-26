"use client";  // Ensure this is at the top of the file

import React, { useState } from "react";
import QRCodeScanner from "react-qr-scanner";

const QRCodeReader = () => {
  const [scanning, setScanning] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
      setScanning(false); // Stop scanning once a QR code is successfully scanned
    }
  };

  const handleError = (err) => {
    setError("Scan Error: " + err.message);
    console.error("QR Code Scan Error:", err);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>

      {scanning ? (
        <div>
          <QRCodeScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      ) : (
        <div>
          <h2 className="text-xl">QR Code Scanned:</h2>
          <p className="mt-2 text-lg font-semibold">
            Scanned Data: {scannedData?.text}
          </p>
          <button
            onClick={() => setScanning(true)}
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
          >
            Scan Another QR Code
          </button>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default QRCodeReader;
