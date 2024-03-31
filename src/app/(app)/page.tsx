"use client";

import { experiments } from "@/data/experiments";
import { ExperimentCard } from "./experiments/ExperimentCard";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex h-full flex-col">
        <div className="h-10 grow" />

        <div className="flex flex-col gap-4">
          <div className="border-b border-gray-200 pb-5 pt-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Experiments
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {experiments
              .filter((e) => e.active)
              .map((e) => (
                <ExperimentCard key={e.url} experiment={e} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
