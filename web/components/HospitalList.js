import Link from "next/link"

export default function HospitalList({ hospitals }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {hospitals.map((hospital) => (
        <Link href={`/dashboard/${hospital.id}`} key={hospital.id}>
          <div className="border p-4 rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{hospital.name}</h2>
            <p> {hospital.postal_code} </p>
          </div>
        </Link>
      ))}
    </div>
  )
}