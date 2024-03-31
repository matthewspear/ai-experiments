import { authMiddleware } from "@clerk/nextjs";
import { experiments } from "./data/experiments";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default authMiddleware({
  publicRoutes: [
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
  ].concat(experiments.map((e) => e.url)),
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
