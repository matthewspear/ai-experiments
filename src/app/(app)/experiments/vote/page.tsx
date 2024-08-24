import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";

export default function Dashboard() {
  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder
        items={[{ href: "/experiments", label: "Experiments" }]}
        page="Vote"
      />
      <div className="border-b border-gray-200 pb-5 pt-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Vote</h3>
      </div>
      <Badge variant="outline" className="w-fit bg-white">
        Coming Soon
      </Badge>
      <p>Submit ideas and vote on what we should build next 🚀</p>
      <a
      href="https://tally.so/r/wa0PYB"
      target="_blank"
      rel="noreferrer"
      className={clsx(buttonVariants({ variant: "default" }), "w-fit")}
      >Suggest an idea</a>
    </div>
  );
}
