"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { CircleDollarSignIcon } from "lucide-react";

export function Credits() {
  const { data, isLoading } = api.credit.getCredit.useQuery();

  return (
    <div className="flex gap-2 border-t border-gray-200 p-4 align-middle">
      <CircleDollarSignIcon className="h-6 w-6 text-slate-600" />
      {isLoading ? <Skeleton className=" h-6 w-32" /> : null}
      {!isLoading && data && <p>{data?.credits} credits</p>}
    </div>
  );
}
