import { Badge } from "@/components/ui/badge";

import { JournalistForm } from "./JournalistForm";
import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Journalist",
};

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder
        items={[{ href: "/experiments", label: "Experiments" }]}
        page="Journalist"
      />
      <div className="prose prose-lg prose-slate pt-8">
        <h3>AI Journalist</h3>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-[#FEFEFE]">
            Claude Haiku
          </Badge>
          <Badge variant="outline" className="bg-[#FEFEFE]">
            Claude Opus
          </Badge>
        </div>
      </div>
      <Link
        className={buttonVariants({
          size: "sm",
          variant: "outline",
          className: "w-fit",
        })}
        href="/journalist/articles"
      >
        <p>Articles</p>
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
      <hr />
      <JournalistForm />
    </div>
  );
}
