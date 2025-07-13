import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { getUserById } from "./utils/getMiddlewareUser";
import { getCookieToken } from "./utils/cookieGet";
import { cookies } from "next/headers";

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

  // Get the accessToken cookie
  const token = (await cookies()).get("accessToken")?.value || null;
  // console.log(token);
  const user = token ? getCookieToken(token) : null;

  // 1. Block access to login/signup if user is authenticated
  if (user && privateAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. Allow login/signup for unauthenticated users
  if (!user && privateAuthRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 3. Block unauthenticated users from other routes
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. Role-based route access
  const userRole = user?.role as TRole;
  const allowedRoutes = [
    ...(roleBasedRoutes[userRole] || []),
    ...(userRole === "admin" ? roleBasedRoutes.manager : []), // Admin can access manager routes too
  ];

  if (allowedRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  // 5. Redirect unauthorized access to homepage
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
