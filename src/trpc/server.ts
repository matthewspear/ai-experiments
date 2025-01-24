import "server-only";

import { cache } from "react";

import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { auth } from "@clerk/nextjs/server";
import { headers as getHeaders } from "next/headers";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const headers = await getHeaders();

  const heads = new Headers(headers);
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    auth: await auth(),
    headers: heads,
  });
});

export const api = createCaller(createContext);
