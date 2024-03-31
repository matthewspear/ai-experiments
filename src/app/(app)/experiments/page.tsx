import { type NextPage } from "next";

import { ExperimentCard } from "./ExperimentCard";
import { experiments } from "@/data/experiments";
import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";

export const metadata = {
  title: "Experiments",
  description:
    "Explore the 'Experiments' page, a central hub linking to an array of AI-driven experiments. Ranging from conversational interactions with GPT-3, custom journal prompts, quick question answering, to AI-generated holiday destinations and more. Each experiment showcases a unique use-case of AI, offering a glimpse into the vast capabilities of modern machine learning models.",
};

const Experiments: NextPage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder items={[]} page="Experiments" />

      <div className="border-b border-gray-200 pb-5 pt-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Live</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {experiments
          .filter((e) => e.active)
          .map((e) => (
            <ExperimentCard key={e.url} experiment={e} />
          ))}
      </div>
      <div className="border-b border-gray-200 pb-5 pt-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Coming Soon
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {experiments
          .filter((e) => !e.active)
          .map((e) => (
            <ExperimentCard key={e.url} experiment={e} />
          ))}
      </div>
    </div>
  );
};

export default Experiments;
