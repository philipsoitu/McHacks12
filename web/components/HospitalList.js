import Link from "next/link";

export default function HospitalList({ hospitals }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {hospitals.map((hospital) => (
        <Link href={`/admin/dashboard/${hospital.id}`} key={hospital.id}>
          <div className="border p-6 rounded-2xl bg-white hover:shadow-xl transition-shadow transform hover:-translate-y-1" style = {{backgroundColor: '#FFFFFF'}}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{hospital.name}</h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Postal Code:</span> {hospital.postal_code}
              </p>
              <p>
                <span className="font-semibold">Estimated Waiting Time:</span> {hospital.resources["Estimated Waiting Time"]}
              </p>
              <p>
                <span className="font-semibold">Avg Wait Room:</span> {hospital.resources["Avg Wait Room"]}
              </p>
              <p>
                <span className="font-semibold">Avg Wait Stretcher:</span> {hospital.resources["Avg Wait Stretcher"]}
              </p>
              <p>
                <span className="font-semibold">Occupancy Rate:</span> {hospital.resources["Occupancy Rate"]}
              </p>
              <p>
                <span className="font-semibold">People Waiting:</span> {hospital.resources["People Waiting"]}
              </p>
              <p>
                <span className="font-semibold">Total People in ER:</span> {hospital.resources["Total People in ER"]}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
