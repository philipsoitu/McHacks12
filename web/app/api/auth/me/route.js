import jwt from "jsonwebtoken";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ success: false, message: "Not logged in" }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return new Response(JSON.stringify({ success: true, user: decoded }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Invalid token" }), { status: 401 });
  }
}
