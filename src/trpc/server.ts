import "server-only";

import { cache } from "react";

import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { auth } from "@clerk/nextjs/server";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  return createTRPCContext({
    auth: auth(),
  });
});

export const api = createCaller(createContext);
