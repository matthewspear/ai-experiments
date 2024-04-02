"use client";

import { SmallSpinner } from "@/components/core/SmallSpinner";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

export default function Home() {
  const { data, refetch, isLoading, error } = api.credit.getCredit.useQuery();
  const updateCredit = api.credit.updateCredit.useMutation();

  const queryClient = useQueryClient();
  const key = getQueryKey(api.credit.getCredit, undefined, "query");

  function updateCache(value: number) {
    queryClient.setQueryData<{
      ip?: string | undefined;
      credits: string;
    }>(key, (oldData) => {
      return {
        ...oldData,
        credits: value.toString(),
      };
    });
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="prose prose-lg prose-slate pt-8">
        <h3>Credits</h3>
      </div>
      <hr />
      <div className="flex flex-row items-center gap-4">
        <Button variant="outline" onClick={() => refetch()}>
          Refresh
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            try {
              const data = await updateCredit.mutateAsync({ amount: +1 });
              updateCache(data.credits);
            } catch {
              console.log(error);
            }
          }}
        >
          +1
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            try {
              const data = await updateCredit.mutateAsync({ amount: -1 });
              updateCache(data.credits);
            } catch {
              console.log(error);
            }
          }}
        >
          -1
        </Button>
        {(isLoading || updateCredit.isPending) && <SmallSpinner />}
      </div>
      <pre>Key: {data?.creditsKey}</pre>
      <pre>Credits: {data?.credits}</pre>
      {error?.message && <pre>{error.message}</pre>}
      {updateCredit.error && <pre>{updateCredit.error.message}</pre>}
    </div>
  );
}
