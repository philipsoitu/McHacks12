import { XataClient } from "@/util/xata";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const xata = new XataClient();

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ success: false, message: "Email and password are required" }), { status: 400 });
  }

  // Find the user
  const user = await xata.db.patients.filter({ email }).getFirst();

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: "User not found" }), { status: 404 });
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), { status: 401 });
  }

  // Create JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: "admin" }, // Add role-based authorization if needed
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Set the token in cookies
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 3600,
  });

  return new Response(JSON.stringify({ success: true, user }), {
    status: 200,
    headers: { "Set-Cookie": cookie },
  });
}
