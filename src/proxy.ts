import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

// Protect only the /admin routes (except login)
export const config = {
  matcher: ["/admin/:path*", "/((?!admin/login)admin.*)"],
};
