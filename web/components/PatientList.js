import { XataClient } from "@/util/xata"

const xata = new XataClient()

// This function will run on the server during the page rendering
export async function getServerSideProps({ params }) {
  const hospitalId = params.hospitalId

  // Fetch patients from the database for the specified hospital
  const patients = await xata.db.patients
    .filter({ hospital: hospitalId })
    .getAll()

  return {
    props: {
      patients, // Pass patients to the component
    },
  }
}

export default function PatientList({ patients }) {
  if (patients.length === 0) {
    return <p>No patients found for this hospital.</p>
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Patient List</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Needed Resource</th>
            <th className="text-left">Position</th>
            <th className="text-left">Urgency</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{`${patient.first_name} ${patient.last_name}`}</td>
              <td>{patient.needed_resource}</td>
              <td>{patient.position}</td>
              <td>{patient.urgency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
