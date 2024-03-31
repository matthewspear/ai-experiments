"use client"; // 👈 Don't forget your client directive

import { load, trackPageview } from "fathom-client";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// REF: https://www.codu.co/articles/how-to-add-fathom-analytics-in-next-js-app-router-yvoc6xry

function TrackPageView({
  siteId,
  domains,
}: {
  siteId: string;
  domains: string[];
}) {
  // Current Path
  const pathname = usePathname();
  // Current query params
  const searchParams = useSearchParams();

  // Load the Fathom script on mount
  useEffect(() => {
    // Optional: Only track on production; remove these two lines if you want to track other environments
    const env = process.env.NODE_ENV;
    if (env !== "production") return;

    load(siteId, {
      auto: false,
      // Optional but I like to explicitly choose the domains to track:
      includedDomains: domains,
    });
  }, [siteId, domains]);

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
export default function Fathom({
  siteId,
  domains,
}: {
  siteId: string;
  domains: string[];
}) {
  return (
    <Suspense fallback={null}>
      <TrackPageView siteId={siteId} domains={domains} />
    </Suspense>
  );
}
