import { NextResponse } from "next/server";
import { XataClient } from "@/util/xata"

const xata = new XataClient();

export async function GET() {
  try {
    // Fetch users and expand hospital field to include hospital details
    const users = await xata.db.patients
      .select(["first_name", "last_name", "email", "urgency", "hospital.*"])
      .filter({ hospital: null })
      .getAll();

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
