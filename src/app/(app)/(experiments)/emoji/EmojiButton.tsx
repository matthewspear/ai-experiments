"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function EmojiButton({ emoji }: { emoji: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="outline"
      className="grid h-[100px] w-[100px] place-items-center text-2xl"
      onClick={async (e) => {
        e.preventDefault();
        await navigator.clipboard.writeText(emoji);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }}
    >
      {copied ? "copied" : emoji}
    </Button>
  );
}
