import HospitalList from "@/components/HospitalList"
import DashboardHeader from "@/components/DashboardHeader"
import { XataClient } from "@/util/xata"

const xata = new XataClient()

export default async function DashboardPage({ params }) {
  const hospitals = await xata.db.hospitals.getAll();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader title="Hospital Dashboard" />
      <HospitalList hospitals={hospitals} />
    </div>
  )
}