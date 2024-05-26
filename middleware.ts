import {
  ClerkMiddlewareAuthObject,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req) => {
  const authObject: ClerkMiddlewareAuthObject = auth();
  const url = req.nextUrl.clone();
  url.pathname = "/";
  if (isProtectedRoute(req))
    authObject.protect({ unauthenticatedUrl: url.toString() });
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
