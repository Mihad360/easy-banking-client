import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookieToken } from "./utils/cookieGet";
import { JwtPayload } from "./types/common.type";

type TRole = keyof typeof roleBasedRoutes;

// Private auth routes - if user has token, they shouldn't access these
const privateAuthRoutes = ["/login", "/signup"];

// Role-based route patterns
const roleBasedRoutes = {
  customer: [
    /^\/dashboard\/customer(\/.*)?$/, // Only customer routes
  ],
  manager: [
    /^\/dashboard\/manager(\/.*)?$/, // Only manager routes
  ],
  admin: [
    /^\/dashboard\/admin(\/.*)?$/,
    /^\/dashboard\/manager(\/.*)?$/, // Admin can access manager routes
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = (await getCookieToken("accessToken")) as JwtPayload;
  console.log(user);
  // 1. Block access to login/signup if user is already authenticated
  if (user && privateAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. Allow access to login/signup for unauthenticated users
  if (!user && privateAuthRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 3. Block unauthenticated users from other routes
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. Check role-based access
  const userRole = user?.role as TRole;
  const allowedRoutes = [
    ...(roleBasedRoutes[userRole] || []),
    ...(userRole === "admin" ? roleBasedRoutes.manager : []), // Admin gets manager routes
  ];

  if (allowedRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  // 5. Redirect unauthorized access
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/dashboard/:path*", // Protect all dashboard routes
    // Add other protected paths here as needed
  ],
};
