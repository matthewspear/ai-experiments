import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";
import { Badge } from "@/components/ui/badge";
import { SummaryForm } from "./SummaryForm";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Summary",
  description:
    "Embark on the 'Summary' experiment, which leverages AI to condense bodies of text into digestible forms. Choose between TLDR, bullet points, or summary paragraph. It's a practical tool for efficiently understanding and retaining the core message of any text.",
};

export default function Summary() {
  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder
        items={[{ href: "/experiments", label: "Experiments" }]}
        page="Summary"
      />
      <div className="prose prose-lg prose-slate pt-8">
        <h3>Summary</h3>
        <Badge variant="outline" className="bg-[#FEFEFE]">
          gpt-4o
        </Badge>
      </div>
      <hr />
      <SummaryForm />
    </div>
  );
}
