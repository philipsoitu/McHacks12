import { NextResponse } from "next/server";
import { XataClient } from "@/util/xata"

const xata = new XataClient();

export async function GET() {
  try {
    // Fetch all hospitals from the Xata database
    const hospitals = await xata.db.hospitals.getAll();

    if (!hospitals || hospitals.length === 0) {
      return NextResponse.json({ message: "No hospitals found" }, { status: 404 });
    }

    return NextResponse.json(hospitals);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
