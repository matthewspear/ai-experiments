"use client";

import { DataTable } from "../data-table";
import { aiEmbeddingPricings } from "./data";
import { PricingLink } from "../PricingLink";
import { columns } from "./columns";
import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";

export default function Pricing() {
  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder
        items={[
          { href: "/resources", label: "Resources" },
          {
            href: "/resources/pricing",
            label: "Pricing",
          },
        ]}
        page="Embedding"
      />
      <DataTable
        title="Embedding Pricing"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        columns={columns}
        data={aiEmbeddingPricings}
      />

      <h3 className="pb-4 text-xl font-medium">Links</h3>
      <div className="grid grid-cols-2 gap-4">
        <PricingLink
          title="MTEB Leaderboard"
          author="MTEB"
          url="https://huggingface.co/spaces/mteb/leaderboard"
        />
        <PricingLink
          title="OpenAI Pricing"
          author="OpenAI"
          url="https://openai.com/pricing"
        />
        <PricingLink
          title="Mistral Pricing and Rate Limits"
          author="Mistral"
          url="https://docs.mistral.ai/platform/pricing/"
        />
        <PricingLink
          title="Cohere Pricing"
          author="Cohere"
          url="https://cohere.com/pricing"
        />
        <PricingLink
          title="New embedding models and API"
          author="OpenAI"
          url="https://openai.com/blog/new-embedding-models-and-api-updates"
        />
      </div>
    </div>
  );
}
