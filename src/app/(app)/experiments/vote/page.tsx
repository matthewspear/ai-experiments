import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";

export default function Dashboard() {
  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder
        items={[{ href: "/experiments", label: "Experiments" }]}
        page="Vote"
      />
      <div className="border-b border-gray-200 pb-5 pt-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Vote</h3>
        <p>Coming soon – submit ideas and vote on what we should build next</p>
      </div>
    </div>
  );
}
