import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import * as Fathom from "fathom-client";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { env } from "@/env.mjs";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load(env.NEXT_PUBLIC_FATHOM_SITE_ID, {
      includedDomains: ["openai-experiment.vercel.app"],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  });

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
