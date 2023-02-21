import { type NextPage } from "next";
import Layout from "@/components/Layout";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";
import { api } from "@/utils/api";
import { type ChangeEvent, type FormEvent, useState, useEffect } from "react";
import { ResultsBlock } from "@/components/ResultsBlock";
import DropdownBlocks from "@/components/DropdownBlocks";

const ELI5: NextPage = () => {
  const promptMutation = api.ai.prompt.useMutation();
  const [temperature, setTemperature] = useState(0.5);
  const [concept, setConcept] = useState<string>("");

  const [latestPrompt, setLatestPrompt] = useState<string>("");

  const generatePrompt = (concept: string) => {
    const prompt = `Explain like I am 5 years old the concept of ${concept}`;
    setLatestPrompt(prompt);
    return prompt;
  };

  useEffect(() => {
    generatePrompt(concept);
  }, [concept]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    promptMutation.mutate({
      text: generatePrompt(concept),
      temperature: temperature,
      task: "eli5",
    });
  };

  return (
    <Layout breadcrumbs={ExperimentsLevelBreadcrumbs("ELI5", "/eli5")}>
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
          <button
            className="inline-flex w-min items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium capitalize text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            <p>Explain</p>
          </button>
        </form>
        <hr />
        <DropdownBlocks
          prompt={latestPrompt}
          result={promptMutation.data?.result ?? ""}
          temperature={temperature}
          setTemperature={setTemperature}
        />
        <ResultsBlock
          isLoading={promptMutation.isLoading}
          data={promptMutation.data}
        />
      </div>
    </Layout>
  );
};

export default ELI5;
