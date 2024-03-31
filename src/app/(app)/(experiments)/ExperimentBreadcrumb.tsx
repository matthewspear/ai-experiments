import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";

export function ExperimentBreadcrumb({ title }: { title: string }) {
  return BreadcrumbBuilder({
    items: [{ href: "/experiments", label: "Experiments" }],
    page: title,
  });
}
