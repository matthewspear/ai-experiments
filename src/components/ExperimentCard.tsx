import { classNames } from "@/components/Layout";
import { type Experiment, colors } from "../pages/experiments";

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
