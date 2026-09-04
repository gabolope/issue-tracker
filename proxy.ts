import { auth } from "./auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;

  if (req.nextUrl.pathname.startsWith("/issues") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/issues/:id/edit", "/issues/new"],
};
