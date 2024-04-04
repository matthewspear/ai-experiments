"use client";

import { articleSchema } from "@/app/api/webhook/article/articleSchema";
import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { api } from "@/trpc/react";
import { Terminal } from "lucide-react";
import { redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function Article({ params }: { params: { id: string } }) {
  console.log(params.id);

  const { data, isLoading } = api.article.getArticle.useQuery({
    id: params.id,
  });

  if (isLoading) {
    // TODO: Centered Spinner
    return "";
  }

  if (!data) {
    redirect("/journalist/articles");
  }

  let article = null;

  try {
    article = articleSchema.parse(data[0]);
  } catch (error) {
    console.error(error);
    redirect("/journalist/articles");
  }
  if (!article) {
    redirect("/journalist/articles");
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder
        items={[
          { href: "/experiments", label: "Experiments" },
          { href: "/journalist", label: "Journalist" },
          { href: "/journalist/articles", label: "Articles" },
        ]}
        page={article.topic ?? "Article"}
      />
      <div className="prose prose-base prose-slate max-w-4xl pt-8 dark:prose-invert prose-p:my-[16px]">
        <h2>Topic: {article.topic}</h2>
        <hr />

        {article.article == null && (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Your articles is being generated!</AlertTitle>
            <AlertDescription>
              Please wait a few minutes and refresh the page.
            </AlertDescription>
          </Alert>
        )}
        {article.article !== null && (
          <>
            <ReactMarkdown>
              {article?.editedArticle ??
                article?.article ??
                "Article not found"}
            </ReactMarkdown>
            <hr />
            <h3>Search Terms</h3>
            <div className="flex flex-wrap gap-1">
              {article.searchTerms?.map((term) => (
                <Badge key={term} variant="outline" className="bg-white">
                  {term}
                </Badge>
              ))}
            </div>
            <hr />
            <h3>Sources</h3>
            <div className="flex flex-col truncate">
              {article.sources?.map((source: string) => (
                <a
                  key={source}
                  href={source}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  {source}
                </a>
              ))}
            </div>
          </>
        )}

        <h4>Raw</h4>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  );
}
