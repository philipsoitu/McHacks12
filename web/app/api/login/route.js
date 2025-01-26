import { XataClient } from "@/util/xata";
import bcrypt from 'bcryptjs';

const xata = new XataClient();

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ success: false, message: 'Email and password are required' }), { status: 400 });
  }

  // Find the user in the 'patients' table
  const user = await xata.db.patients.filter({ email }).getFirst();

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), { status: 401 });
  }

  // Successfully logged in
  return new Response(JSON.stringify({ success: true, user }), { status: 200 });
}
