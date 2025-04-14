import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const PUBLIC_ROUTES = ["/login", "/registration"];

const roleBaseRoutes = {
  CUSTOMER: [/^\/dashboard\/user/],
  VENDOR: [/^\/dashboard\/vendor/],
  ADMIN: [/^\/dashboard\/admin/],
  SUPER_ADMIN: [/^\/dashboard\/admin/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  // Not logged in and not visiting a public route → redirect to login
  if (!user || !user.role) {
    if (!PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
    return NextResponse.next();
  }

  const allowedRoutes =
    roleBaseRoutes[user.role as keyof typeof roleBaseRoutes] || [];

  const canAccess = allowedRoutes.some((regex) => regex.test(pathname));

  if (canAccess || PUBLIC_ROUTES.includes(pathname) || pathname === "/") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/dashboard/user/:path*",
    "/dashboard/vendor/:path*",
    "/dashboard/admin/:path*",
    "/login",
    "/registration",
  ],
};
