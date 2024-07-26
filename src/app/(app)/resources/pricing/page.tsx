import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { Summary } from "@/components/summary";

export const metadata = {
  title: "Pricing Tracker",
};

export default function Pricing() {
  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder
        items={[{ href: "/resources", label: "Resources" }]}
        page="Pricing"
      />
      <Summary title="Pricing" />
      <Link
        className={clsx(buttonVariants({ variant: "link" }), "w-fit")}
        href="/resources/pricing/model"
      >
        Model
      </Link>
      <Link
        className={clsx(buttonVariants({ variant: "link" }), "w-fit")}
        href="/resources/pricing/embedding"
      >
        Embedding
      </Link>
      <Link
        className={clsx(buttonVariants({ variant: "link" }), "w-fit")}
        href="/resources/pricing/calculator"
      >
        Calculator
      </Link>
    </div>
  );
}
