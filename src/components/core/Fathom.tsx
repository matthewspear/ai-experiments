"use client"; // 👈 Don't forget your client directive

import { load, trackPageview } from "fathom-client";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { env } from "@/env";

// REF: https://www.codu.co/articles/how-to-add-fathom-analytics-in-next-js-app-router-yvoc6xry

function TrackPageView() {
  // Current Path
  const pathname = usePathname();
  // Current query params
  const searchParams = useSearchParams();

  // Load the Fathom script on mount
  useEffect(() => {
    // Optional: Only track on production; remove these two lines if you want to track other environments
    if (process.env.NODE_ENV !== "production") return;

    if (!env.NEXT_PUBLIC_FATHOM_SITE_ID || !env.NEXT_PUBLIC_FATHOM_DOMAINS) {
      return;
    }

    let includedDomains = [env.NEXT_PUBLIC_FATHOM_DOMAINS];

    if (env.NEXT_PUBLIC_FATHOM_DOMAINS.includes(",")) {
      includedDomains = env.NEXT_PUBLIC_FATHOM_DOMAINS.split(",").filter(
        (d) => d !== "",
      );
    }

    console.log(includedDomains);

    load(env.NEXT_PUBLIC_FATHOM_SITE_ID, {
      auto: false,
      // Optional but I like to explicitly choose the domains to track:
      includedDomains: includedDomains,
    });
  }, []);

  // Record a pageview when route changes
  useEffect(() => {
    if (!pathname) return;

    trackPageview({
      url: pathname + searchParams.toString(),
      referrer: document.referrer,
    });
  }, [pathname, searchParams]); // 👈 Track page views if path or params change

  return null;
}

// We use this in our main layout.tsx or jsx file
export default function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}
