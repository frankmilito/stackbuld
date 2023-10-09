import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//setup protected routing for posts routes
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let isAuth = request.cookies.get("secret");
  if (!isAuth) {
    if (request.nextUrl.pathname.startsWith("/posts")) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  } else if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/posts", request.url));
  }
}
