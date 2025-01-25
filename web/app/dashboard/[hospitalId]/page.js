import { notFound } from "next/navigation"
import HospitalDashboard from "@/components/HospitalDashboard"
import DashboardHeader from "@/components/DashboardHeader"

export default function HospitalPage({ params }) {
  // In a real application, you would fetch the hospital data here
  const hospital = getHospitalData(params.hospitalId)

  if (!hospital) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader title={`${hospital.name} Dashboard`} />
      <HospitalDashboard hospital={hospital} />
    </div>
  )
}

// This is a placeholder function. In a real application, you would
// fetch this data from your backend or API.
function getHospitalData(id) {
  const hospitals = {
    1: { id: "1", name: "Montreal General Hospital" },
    2: { id: "2", name: "Jewish General Hospital" },
    // Add more hospitals as needed
  }
  return hospitals[id]
}

