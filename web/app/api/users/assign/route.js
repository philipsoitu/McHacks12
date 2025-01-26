import { NextResponse } from "next/server";
import { XataClient } from "@/util/xata"

const xata = new XataClient();

export async function POST(request) {
  try {
    const { userId, hospitalId } = await request.json();

    if (!userId || !hospitalId) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Update user record in the database
    await xata.db.patients.update(userId, { hospital: hospitalId });

    return NextResponse.json({ message: "User assigned successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
