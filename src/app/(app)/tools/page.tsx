import clsx from "clsx";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";
import { Summary } from "@/components/summary";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tools",
};

export default function Pricing() {
  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder page="Tools" />
      <Summary title="Tools" />
      <Link
        className={clsx(buttonVariants({ variant: "link" }), "w-fit")}
        href="/tools/prompt-calculator"
      >
        Prompt Calculator
      </Link>
      <Link
        className={clsx(buttonVariants({ variant: "link" }), "w-fit")}
        href="/tools/model-pricing-tracker"
      >
        Model Pricing Tracker
      </Link>
      <Link
        className={clsx(buttonVariants({ variant: "link" }), "w-fit")}
        href="/tools/embedding-pricing-tracker"
      >
        Embedding Pricing Tracker
      </Link>
    </div>
  );
}
