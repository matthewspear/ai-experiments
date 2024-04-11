import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";
import { CalculatorForm } from "./CalculatorForm";

export const metadata = {
  title: "Token Calculator",
};

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
        page="Calculator"
      />
      <div className="prose prose-lg prose-slate pt-8">
        <h3>Calculator</h3>
      </div>
      <hr />
      <CalculatorForm />
    </div>
  );
}
