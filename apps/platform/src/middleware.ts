import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
import { ProjectUrls } from "./const/url";

const isPublicRoute = createRouteMatcher([
  ProjectUrls.home,
  ProjectUrls.roadMap,
  "/auth/(.*)",
  "/api/(.*)",
]);

export default clerkMiddleware((auth, req) => {
  // if (req.nextUrl.pathname.startsWith("/api")) {
  //   const res = NextResponse.next();

  //   res.headers.append("Access-Control-Allow-Credentials", "true");
  //   res.headers.append("Access-Control-Allow-Origin", "*");
  //   res.headers.append(
  //     "Access-Control-Allow-Methods",
  //     "GET,DELETE,PATCH,POST,PUT,OPTIONS"
  //   );
  //   res.headers.append(
  //     "Access-Control-Allow-Headers",
  //     "X-CSRF-Token, X-Requested-With, Authorization, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  //   );
  //   return res;
  // }

  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
