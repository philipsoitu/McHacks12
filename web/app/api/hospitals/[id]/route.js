import { NextResponse } from "next/server";
import { XataClient } from "@/util/xata"

const xata = new XataClient();

export async function GET(request, { params }) {
  const { id } = params; // Get hospital ID from URL

  if (!id) {
    return NextResponse.json({ error: "Hospital ID is required" }, { status: 400 });
  }

  try {
    // Fetch hospital details from the database using the ID
    const hospital = await xata.db.hospitals.read(id);

    if (!hospital) {
      return NextResponse.json({ error: "Hospital not found" }, { status: 404 });
    }

    return NextResponse.json(hospital);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
