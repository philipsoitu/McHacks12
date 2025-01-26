import CameraFeed from "./CameraFeed"
import PatientList from "./PatientList"

export default function HospitalDashboard({ hospital }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Live Camera Feeds</h2>
        <div className="grid grid-cols-2 gap-4">
          <CameraFeed id="1" name="Waiting Area 1" />
          <CameraFeed id="2" name="Waiting Area 2" />
        </div>
      </div>
      <div>
        {/* <PatientList hospitalId={hospital.id} /> */}
      </div>
    </div>
  )
}

