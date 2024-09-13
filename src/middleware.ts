import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { experiments } from "./data/experiments";

const isPublicRoute = createRouteMatcher(
  [
    "/",
    "/404",
    "/sign-up(.*)",
    "/sign-in(.*)",
    "/api(.*)",
    "/en/api(.*)",
    "/terms",
    "/privacy",
    "/experiments",
    "/emoji",
    "/credits",
    "/about",
    "/tools(.*)",
    "/resources(.*)",
  ].concat(experiments.map((e) => e.url)),
);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return;
  auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
