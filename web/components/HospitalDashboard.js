import CameraFeed from "./CameraFeed"
import ResourceInventory from "./ResourceInventory"
import StaffAvailability from "./StaffAvailability"
import EmergencyCases from "./EmergencyCases"

export default function HospitalDashboard({ hospital }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Live Camera Feeds</h2>
        <div className="grid grid-cols-2 gap-4">
          <CameraFeed id="1" name="Main Entrance" />
          <CameraFeed id="2" name="Emergency Room" />
          <CameraFeed id="3" name="Waiting Area 1" />
          <CameraFeed id="4" name="Waiting Area 2" />
        </div>
      </div>
      <div>
        <ResourceInventory hospitalId={hospital.id} />
        <EmergencyCases hospitalId={hospital.id} />
      </div>
    </div>
  )
}

