import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const AuthRoutes = ["/login", "/registration"];

type Role = keyof typeof roleBaseRoutes;

const roleBaseRoutes = {
  user: [/^\/user/],
  admin: [/^\/admin\/dashboard/, /^\/admin\/profile/, /^\/admin\/user-list/],
  superAdmin: [
    /^\/admin\/dashboard/,
    /^\/admin\/create-admin/,
    /^\/admin\/user-list/,
    /^\/admin\/admin-list/,
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBaseRoutes[user?.role as Role]) {
    const routes = roleBaseRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/user",
    "/user/:page*",
    "/admin",
    "/admin/:page*",
    "/login",
    "/registration",
  ],
};
