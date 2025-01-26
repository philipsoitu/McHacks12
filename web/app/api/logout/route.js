import { serialize } from "cookie";

export async function GET() {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Set-Cookie": cookie },
  });
}
