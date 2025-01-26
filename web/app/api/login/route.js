import { XataClient } from "@/util/xata";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const xata = new XataClient();

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await xata.db.patients.filter({ email }).getFirst();

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), { status: 401 });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), { status: 401 });
  }

  // Include admin flag in the JWT payload
  const token = jwt.sign(
    { id: user.id, email: user.email, admin: user.admin },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const headers = new Headers();
  headers.append("Set-Cookie", `token=${token}; HttpOnly; Path=/`);

  return new Response(
    JSON.stringify({ success: true, message: "Logged in successfully" }),
    { status: 200, headers }
  );
}
