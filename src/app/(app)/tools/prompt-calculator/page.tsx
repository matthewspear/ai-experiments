import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";
import { CalculatorForm } from "./CalculatorForm";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Calculator",
  openGraph: {
    title: "Prompt Calculator",
    description:
      "Calculate the cost of your prompts with the prompt calculator. Enter the input, output and model to get an estimate of the total cost.",
  },
};

export default function Pricing() {
  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder
        items={[{ href: "/tools", label: "Tools" }]}
        page="Prompt Calculator"
      />
      <div className="prose prose-lg prose-slate pt-8">
        <h3>Prompt Calculator</h3>
      </div>
      <hr />
      <CalculatorForm />
    </div>
  );
}
