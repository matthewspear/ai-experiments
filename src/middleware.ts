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
    "/credits",
    "/about",
    "/vote",
    "/tools(.*)",
    "/resources(.*)",
  ].concat(experiments.map((e) => e.url)),
);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
