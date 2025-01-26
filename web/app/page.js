import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-8">
      <div className="max-w-3xl">
        {/* <Image 
          src="/hospital-dashboard.svg" 
          alt="Hospital Dashboard" 
          width={400} 
          height={400} 
          className="mx-auto mb-6"
        /> */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Hospital Dashboard</h1>
        <p className="text-lg text-gray-600 mb-6">
          Our platform helps optimize patient waiting times across hospitals in Quebec by providing 
          real-time insights and decision-making tools to hospital staff. Easily monitor hospital capacity, 
          resource availability, and patient wait times.
        </p>
        <Link href="/signup">
          <Button className="px-6 py-3 text-lg rounded-lg shadow-lg">Sign Up</Button>
        </Link>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
