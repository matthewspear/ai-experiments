import { Badge } from "@/components/ui/badge";

import { EmojiForm } from "./EmojiForm";
import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Emoji Picker",
};

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder
        items={[{ href: "/experiments", label: "Experiments" }]}
        page="Emoji Picker"
      />
      <div className="prose prose-lg prose-slate pt-8">
        <h3>Emoji Picker</h3>
        <Badge variant="outline" className="bg-[#FEFEFE]">
          gpt-4o
        </Badge>
      </div>
      <hr />
      <EmojiForm />
    </div>
  );
}
