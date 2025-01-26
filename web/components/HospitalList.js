import Link from "next/link";

export default function HospitalList({ hospitals }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {hospitals.map((hospital) => (
        <Link href={`/dashboard/${hospital.id}`} key={hospital.id}>
          <div className="border p-4 rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{hospital.name}</h2>
            <p>Postal Code: {hospital.postal_code}</p>
            <p>Estimated Waiting Time: {hospital.resources["Estimated Waiting Time"]}</p>
            <p>Avg Wait Room: {hospital.resources["Avg Wait Room"]}</p>
            <p>Avg Wait Stretcher: {hospital.resources["Avg Wait Stretcher"]}</p>
            <p>Occupancy Rate: {hospital.resources["Occupancy Rate"]}</p>
            <p>People Waiting: {hospital.resources["People Waiting"]}</p>
            <p>Total People in ER: {hospital.resources["Total People in ER"]}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}