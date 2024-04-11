"use client";

import { DataTable } from "../data-table";
import { aiModelPricings } from "./data";
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
        page="Model"
      />
      <DataTable
        title="Model Pricing"
        columns={columns}
        data={aiModelPricings}
      />

      <h3 className="pb-4 text-xl font-medium">Links</h3>
      <div className="grid grid-cols-2 gap-4">
        <PricingLink
          title="OpenAI Pricing"
          author="OpenAI"
          url="https://openai.com/pricing"
        />
        <PricingLink
          title="Anthropic API"
          author="Anthropic"
          url="https://www.anthropic.com/api"
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
          title="Gemini API Pricing"
          author="Google"
          url="https://ai.google.dev/pricing"
        />
        <PricingLink
          title="Chatbot Arena Leaderboard"
          author="LMSys"
          url="https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard"
        />
      </div>
    </div>
  );
}
