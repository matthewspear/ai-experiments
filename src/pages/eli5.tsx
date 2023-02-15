import { type NextPage } from "next";
import Layout from "@/components/Layout";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";
import { api } from "@/utils/api";
import { ChangeEvent, type FormEvent, useState } from "react";
import { ResultsView } from "../components/ResultsView";

const ELI5: NextPage = () => {
  const promptMutation = api.ai.prompt.useMutation();
  const [creativity, setCreativity] = useState(0.5);

  const [concept, setConcept] = useState<string>("");

  function ExplainButton({ value }: { value: string }) {
    return (
      <button
        className="inline-flex w-min items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium capitalize text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={(e) => {
          e.preventDefault();
          setConcept(value);
          promptMutation.mutate({
            text: `Explain like I am 5 years old the concept of ${concept}`,
            temperature: creativity,
            task: "eli5",
          });
        }}
      >
        <p>{value}</p>
      </button>
    );
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    promptMutation.mutate({
      text: `Explain like I am 5 years old the concept of ${concept}`,
      temperature: creativity,
      task: "eli5",
    });
  };

  return (
    <Layout
      // title="Explain Like I'm Five"
      breadcrumbs={ExperimentsLevelBreadcrumbs("ELI5", "/eli5")}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="prose prose-lg prose-gray">
          <h3>What is ELI5?</h3>
          <p>
            ELI5 or Explain Like I&apos;m 5 is a way of explaining concepts
            simply, as if to a child. The term gained popularity with the
            creation of the{" "}
            <a
              href="https://www.reddit.com/r/explainlikeimfive/"
              target="_blank"
              rel="noreferrer"
            >
              r/explainlikeimfive
            </a>{" "}
            subreddit which has now amassed over 22 million subscribers.
          </p>
        </div>
        {/* <hr />
        <div className="flex flex-wrap gap-4">
          <ExplainButton value="Blackholes" />
          <ExplainButton value="Toilets" />
        </div> */}
        <hr />
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="concept"
              className="block text-sm font-medium text-gray-700"
            >
              Concept
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="concept"
                id="concept"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:w-[400px] sm:text-sm"
                placeholder="e.g Blackholes"
                value={concept ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setConcept(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex w-full flex-wrap gap-4">
            <div className="w-full sm:w-[400px]">
              <label
                htmlFor="creativity"
                className="block text-sm font-medium text-gray-700"
              >
                Creativity
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="myRange"
                  className="range w-full p-2 accent-indigo-500"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={creativity}
                  onChange={(e) => {
                    setCreativity(parseFloat(e.target.value));
                  }}
                ></input>
                <p>{(creativity * 100).toFixed(0)}%</p>
              </div>
            </div>
          </div>
          <button
            className="inline-flex w-min items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium capitalize text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            <p>Explain</p>
          </button>
        </form>
        <hr />
        <ResultsView
          isLoading={promptMutation.isLoading}
          data={promptMutation.data}
        />
      </div>
    </Layout>
  );
};

export default ELI5;
