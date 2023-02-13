import { type NextPage } from "next";

import Layout, { classNames } from "@/components/Layout";
import { TopLevelBreadcrumb } from "@/components/BreadcrumbBar";
import { experiments } from "@/components/Experiments";

const colors: {
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
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }
>;

interface Experiment {
  title: string;
  description: string;
  url: string;
  icon: Icon;
  color: string;
  active: boolean;
}

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <div
      key={experiment.url}
      className={classNames(
        // actionIdx === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
        // actionIdx === 1 ? "sm:rounded-tr-lg" : "",
        // actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
        // actionIdx === actions.length - 1
        //   ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
        //   : "",
        "group relative rounded-lg bg-white p-6"
      )}
    >
      <div>
        <span
          className={classNames(
            colors[experiment.color]?.iconForeground,
            colors[experiment.color]?.iconBackground,
            "inline-flex rounded-full p-3 ring-4 ring-white"
          )}
        >
          <experiment.icon className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium">
          <a href={experiment.url} className="focus:outline-none">
            {/* Extend touch target to entire panel */}
            <span className="absolute inset-0" aria-hidden="true" />
            {experiment.title}
          </a>
        </h3>
        <p className="mt-2 text-sm text-gray-500">{experiment.description}</p>
      </div>
      <span
        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
        </svg>
      </span>
    </div>
  );
}

const About: NextPage = () => {
  return (
    <Layout breadcrumbs={TopLevelBreadcrumb("Experiments", "/experiments")}>
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

export default About;
