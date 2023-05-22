import { type NextPage } from "next";

import Layout from "@/components/Layout";
import { TopLevelBreadcrumb } from "@/components/BreadcrumbBar";
import { experiments } from "@/components/Experiments";
import { ExperimentCard } from "@/components/ExperimentCard";

export const colors: {
  [id: string]: { iconForeground: string; iconBackground: string };
} = {};

colors["teal"] = {
  iconForeground: "text-teal-700",
  iconBackground: "bg-teal-50",
};
colors["purple"] = {
  iconForeground: "text-purple-700",
  iconBackground: "bg-purple-50",
};
colors["sky"] = {
  iconForeground: "text-sky-700",
  iconBackground: "bg-sky-50",
};
colors["yellow"] = {
  iconForeground: "text-yellow-700",
  iconBackground: "bg-yellow-50",
};
colors["rose"] = {
  iconForeground: "text-rose-700",
  iconBackground: "bg-rose-50",
};
colors["indigo"] = {
  iconForeground: "text-indigo-700",
  iconBackground: "bg-indigo-50",
};

type Icon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>
>;

export interface Experiment {
  title: string;
  description: string;
  url: string;
  icon: Icon;
  color: string;
  active: boolean;
}

const Experiments: NextPage = () => {
  return (
    <Layout
      title="Experiments"
      description="Explore the 'Experiments' page, a central hub linking to an array of AI-driven experiments. Ranging from conversational interactions with GPT-3, custom journal prompts, quick question answering, to AI-generated holiday destinations and more. Each experiment showcases a unique use-case of AI, offering a glimpse into the vast capabilities of modern machine learning models."
      breadcrumbs={TopLevelBreadcrumb("Experiments", "/experiments")}
    >
      <div className="flex w-full flex-col gap-4">
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
    </Layout>
  );
};

export default Experiments;
