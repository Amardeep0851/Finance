import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isRouteProtected = createRouteMatcher(["/(.*)"]);
const publicRoutes = ["/sign-in(.*)", "/sign-up(.*)"];



export default clerkMiddleware(async (auth, request) => {
  
  const { pathname } = request.nextUrl;
  if (publicRoutes.some(route => new RegExp(`^${route}$`).test(pathname))) {
    return NextResponse.next();
  }
  if(isRouteProtected(request)){
    await auth.protect()
  }
  return NextResponse.next(); 
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/api/(.*)'
  ],
};