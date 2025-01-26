import Link from "next/link";

export default function main() {

  return (
    <ul>
      <li>
        <Link href="/admin/dashboard" className="text-white hover:text-gray-400">
          Dashboard
        </Link>
      </li>
      <li>
        <Link href="/admin/form" className="text-white hover:text-gray-400">
          Form
        </Link>
      </li>
    </ul>
  )
}
