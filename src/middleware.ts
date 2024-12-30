import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const AuthRoutes = ["/login", "/registration"];

type Role = keyof typeof roleBaseRoutes;

const roleBaseRoutes = {
  CUSTOMER: [/^\/dashboard\/user/],
  VENDOR: [/^\/dashboard\/vendor/],
  ADMIN: [/^\/dashboard\/admin/],
  SUPER_ADMIN: [/^\/dashboard\/admin/],
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
    "/dashboard/user",
    "/dashboard/user/:page*",
    "/dashboard/vendor",
    "/dashboard/vendor:page*",
    "/dashboard/admin",
    "/dashboard/admin:page*",
    "/login",
    "/registration",
  ],
};
