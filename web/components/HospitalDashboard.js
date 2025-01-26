import CameraFeed from "./CameraFeed"
import PatientList from "./PatientList"
import QRCodeReader from "@/components/QRCodeReader";

export default function HospitalDashboard({ hospital }) {


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
        {/* <QRCodeReader /> */}
      </div>
    </div>
  )
}

