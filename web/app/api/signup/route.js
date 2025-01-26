import { XataClient } from "@/util/xata";
import bcrypt from 'bcryptjs';

const xata = new XataClient();

export async function POST(req) {
  const { email, first_name, last_name, password } = await req.json();

  if (!email || !first_name || !last_name || !password) {
    return new Response(JSON.stringify({ success: false, message: 'All fields are required' }), { status: 400 });
  }

  // Check if user already exists
  const existingUser = await xata.db.patients.filter({ email }).getFirst();

  if (existingUser) {
    return new Response(JSON.stringify({ success: false, message: 'User already exists' }), { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  await xata.db.patients.create({
    email,
    first_name,
    last_name,
    password: hashedPassword,
    urgency: 1,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
