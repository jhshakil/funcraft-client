import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const AuthRoutes = ["/login", "/registration"];

type Role = keyof typeof roleBaseRoutes;

const roleBaseRoutes = {
  VENDOR: [/^\/vendor/],
  ADMIN: [/^\/admin/],
  SUPER_ADMIN: [/^\/admin/],
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

  if (user.role && user.role === "CUSTOMER") {
    if (pathname === "/" || AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/vendor",
    "/vendor/:page*",
    "/admin",
    "/admin/:page*",
    "/login",
    "/registration",
  ],
};
