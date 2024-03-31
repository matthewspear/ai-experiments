"use client";

import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function ProfileButton() {
  const { user, isLoaded } = useUser();
  return (
    <Link href="/profile">
      {!isLoaded && <Skeleton className="h-8 w-8 rounded-full" />}
      {isLoaded && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>
            <Skeleton className="h-8 w-8 rounded-full" />
          </AvatarFallback>
        </Avatar>
      )}
    </Link>
  );
}
