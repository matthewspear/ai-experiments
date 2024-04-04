"use client";

import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";
import { api } from "@/trpc/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Articles() {
  const { data, isLoading } = api.article.getArticles.useQuery();

  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder
        items={[
          { href: "/experiments", label: "Experiments" },
          { href: "/journalist", label: "Journalist" },
        ]}
        page="Articles"
      />
      <div className="prose prose-lg prose-slate pt-8">
        <h3>Articles</h3>
      </div>
      <hr />
      {isLoading && <div>Loading...</div>}
      {data &&
        data.length > 0 &&
        data.map((article) => {
          return (
            <div key={article.id} className="group flex flex-col gap-2">
              <Link
                href={`/journalist/articles/${article.id}`}
                className="flex cursor-pointer flex-row items-center gap-2"
              >
                <p className="text-base font-normal group-hover:opacity-75">
                  {article.topic}
                </p>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="grow" />
            </div>
          );
        })}
    </div>
  );
}
