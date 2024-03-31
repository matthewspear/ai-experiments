"use client";

import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useClerk } from "@clerk/nextjs";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

// TODO: Improve loading states / skeletons

export default function Profile() {
  const { data: user } = api.user.getUser.useQuery();
  const { signOut } = useClerk();

  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder page="Profile" />

      <Avatar className="inline-block h-32 w-32 rounded-full">
        <AvatarImage
          src={user?.image ?? undefined}
          width={128}
          height={128}
          alt="Profile picture for user"
        />
        <AvatarFallback className="bg-transparent">
          <UserCircleIcon
            strokeWidth={1}
            className="inline-block h-32 w-32 text-slate-500"
          />
        </AvatarFallback>
      </Avatar>

      <h2>
        {user?.firstName} {user?.lastName}
      </h2>
      <pre className="my-4 overflow-y-scroll whitespace-pre-wrap rounded-lg bg-white/50 p-4 text-sm backdrop-blur-md">
        {JSON.stringify(user, null, 2)}
      </pre>
      <p>Signed in as {user?.email}</p>
      <Button
        variant="outline"
        className="w-fit"
        onClick={() => signOut(() => router.push("/"))}
      >
        Sign out
      </Button>
    </div>
  );
}
