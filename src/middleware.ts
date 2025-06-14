import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./services/authServices";

type TRole = keyof typeof roleBasedRoutes;
const authRoutes = ["/login", "/signup"];
const roleBasedRoutes = {
  user: [],
  admin: [/^\/admin/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getUser();
  //   console.log(user);
  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as TRole]) {
    const routes = roleBasedRoutes[user?.role as TRole];
    console.log(routes);
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup", "/about"],
};
