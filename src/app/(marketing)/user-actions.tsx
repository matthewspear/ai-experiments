"use client";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function UserActions() {
  const user = useUser();
  return (
    <div className="mb-5 flex h-8 items-center gap-4">
      <div className="grow" />

      {!user.isLoaded && <Skeleton className="h-8 w-8 rounded-full" />}
      {user.isLoaded && user.isSignedIn && (
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "ghost" })}
        >
          Go to Dashboard
        </Link>
      )}
      {user.isLoaded && user.isSignedIn && (
        <UserButton />
      )}
      {user.isLoaded && !user.isSignedIn && (
        <Link href="/sign-in" className={buttonVariants({ variant: "ghost" })}>
          Sign In
        </Link>
      )}
    </div>
  );
}
