import Link from "next/link"

export default function DashboardHeader({ title }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <nav>
        <Link href="/admin/dashboard" className="text-blue-500 hover:underline">
          Main Dashboard
        </Link>
      </nav>
    </header>
  )
}

