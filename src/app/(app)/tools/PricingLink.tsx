"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export function PricingLink({
  title,
  author,
  url,
}: {
  title: string;
  author?: string;
  url: string;
}) {
  return (
    <a href={url} target="_blank" rel="noreferrer noopener">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {author && <CardDescription>{author}</CardDescription>}
        </CardHeader>
        <CardFooter>
          <pre className="truncate pt-2 font-mono text-[12px] underline">
            {url}
          </pre>
        </CardFooter>
      </Card>
    </a>
  );
}
