import { cookies } from "next/headers";

export async function POST(req) {
  const { password } = await req.json();

  if (
    password !== process.env.ADMIN_PASSWORD
  ) {
    return Response.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set(
    "admin-auth",
    "true",
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    }
  );

  return Response.json({
    success: true,
  });
}