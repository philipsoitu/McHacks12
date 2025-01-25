import { notFound } from "next/navigation"
import HospitalDashboard from "@/components/HospitalDashboard"
import DashboardHeader from "@/components/DashboardHeader"
import { XataClient } from "@/util/xata"

const xata = new XataClient()

export default async function HospitalPage({ params }) {
  const hospital = await xata.db.hospitals.read(params.hospitalId)

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
