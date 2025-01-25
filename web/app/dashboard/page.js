import HospitalList from "@/components/HospitalList"
import DashboardHeader from "@/components/DashboardHeader"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader title="Hospital Dashboard" />
      <HospitalList />
    </div>
  )
}
