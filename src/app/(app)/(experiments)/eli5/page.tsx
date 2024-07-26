import { Badge } from "@/components/ui/badge";

import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";
import { ELI5Form } from "./ELI5Form";

export const metadata = {
  title: "ELI5",
};

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder
        items={[{ href: "/experiments", label: "Experiments" }]}
        page="ELI5"
      />
      <div className="prose prose-lg prose-slate pt-8">
        <h3>What is ELI5?</h3>
        <Badge variant="outline" className="bg-[#FEFEFE]">
          gpt-4o
        </Badge>
        <p>
          ELI5 or Explain Like I&apos;m 5 is a way of explaining concepts
          simply, as if to a child. The term gained popularity with the creation
          of the{" "}
          <a
            href="https://www.reddit.com/r/explainlikeimfive/"
            target="_blank"
            rel="noreferrer"
          >
            r/explainlikeimfive
          </a>{" "}
          subreddit which has now amassed over 22 million subscribers.
        </p>
      </div>
      <hr />
      <ELI5Form />
    </div>
  );
}
