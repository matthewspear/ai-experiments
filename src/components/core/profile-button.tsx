"use client";

import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function ProfileButton() {
  const { user, isLoaded } = useUser();

  return (
    <Link href="/profile" className="flex w-full items-center">
      {!isLoaded && (
        <div className="flex w-full items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-8 grow rounded-lg" />
        </div>
      )}

      {isLoaded && (
        <Avatar className="h-9 w-9">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback className="bg-transparent">
            <UserCircleIcon className="inline-block h-9 w-9 text-slate-500" />
          </AvatarFallback>
        </Avatar>
      )}

      {isLoaded && (
        <div className="ml-3 flex flex-col text-left font-medium">
          <p className="text-sm text-gray-700 group-hover:text-gray-900">
            {user ? user?.fullName : "User"}
          </p>
          <p className="text-xs text-gray-500 group-hover:text-gray-700">
            {user ? "View profile" : "Login"}
          </p>
        </div>
      )}
    </Link>
  );
}
