import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware running..."); // Debugging

  const token = req.cookies.get("token")?.value;
  console.log("Token:", token); // See if token exists

  if (!token) {
    console.log("No token, redirecting...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect /dashboard and all subroutes
};
