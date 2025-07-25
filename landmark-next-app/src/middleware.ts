import type { NextRequest } from "next/server";
import { auth0 } from "./shared/lib/auth0";

export async function middleware(request: NextRequest) {
  // auth0.middleware auto-configures the routes:
  // /auth...
  // - /login
  // - /logout
  // - /callback
  // - /profile
  // - /access-token
  // - /backchannel-logout
  // Should redirect the browser to these routes
  return await auth0.middleware(request); // delegates the request to Auth0's middleware handler
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
