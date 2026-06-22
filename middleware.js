import { NextResponse } from "next/server";

export function middleware(req) {
  const isLoggedIn =
    req.cookies.get("admin-auth");

  const isLoginPage =
    req.nextUrl.pathname === "/admin/login";

  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    !isLoginPage &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};