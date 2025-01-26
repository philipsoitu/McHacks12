import React, { useState } from "react"
import { QrReader } from "react-qr-reader"
import CameraFeed from "./CameraFeed"
import PatientList from "./PatientList"
import QRCodeReader from "@/components/QRCodeReader";

export default function HospitalDashboard({ hospital }) {
  const [data, setData] = useState("No result")
  const [startScan, setStartScan] = useState(false)
  const [loadingScan, setLoadingScan] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)

  const handleScan = async () => {
    setStartScan(true)
    setLoadingScan(true)
  }

  const handleStopScan = () => {
    setStartScan(false)
    setLoadingScan(false)
  }

  const handleScanSuccess = (data) => {
    console.log("Scanned Data:", data);
  };

  // Define handleScanError function
  const handleScanError = (err) => {
    console.error("Scan Error:", err);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Live Camera Feed</h2>
        <CameraFeed id="1" name="Waiting Area 1" />
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Assign Page</h1>
        <div className="p-6 max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>

          {!startScan && !permissionDenied && (
            <button onClick={handleScan} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Start Scan
            </button>
          )}

          {startScan && (
            <>
              <QrReader
                onResult={(result, error) => {
                  if (!!result) {
                    setData(result?.text)
                    handleStopScan()
                  }

                  if (!!error) {
                    console.info(error)
                    if (error.name === "NotAllowedError") {
                      setPermissionDenied(true)
                      handleStopScan()
                    }
                  }
                }}
                constraints={{ facingMode: "environment" }}
                className="w-full aspect-square"
              />
              <button onClick={handleStopScan} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Stop Scan
              </button>
            </>
          )}

          {loadingScan && <p>Loading camera...</p>}

          {permissionDenied && (
            <p className="text-red-500">Camera permission was denied. Please grant permission and try again.</p>
          )}

          <p className="mt-4">
            <span className="font-semibold">Scanned Data:</span> {data}
          </p>
        </div>
      </div>
    </div>
  )
}