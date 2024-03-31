"use client";

import { api } from "@/trpc/react";

export default function Dashboard() {
  const getUser = api.user.getUser.useQuery();

  return (
    <div className="mt-8">
      {getUser.isLoading ? (
        "isLoading"
      ) : (
        <pre className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {JSON.stringify(getUser.data, null, 2)}
        </pre>
      )}
      {getUser.isError ? getUser.error.message : ""}
    </div>
  );
}
