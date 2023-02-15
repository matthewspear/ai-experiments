import { type NextPage } from "next";
import Layout from "@/components/Layout";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";
import { ResultsBlock } from "@/components/ResultsBlock";
import { api } from "@/utils/api";
import { useState, type FormEvent, type ChangeEvent, useEffect } from "react";
import { PromptBlock } from "@/components/PromptBlock";
import { EstimateBlock } from "@/components/EstimateBlock";
import { AdvancedBlock } from "@/components/AdvancedBlock";
import { Summary } from "@/components/Summary";

enum Mode {
  tldr = "Tl;dr",
  summary = "Summary",
  bullet = "Bullet Points",
}

const SummaryPage: NextPage = () => {
  const promptMutation = api.ai.prompt.useMutation();

  const [temperature, setTemperature] = useState(0.7);
  const [text, setText] = useState<string>("");
  const [mode, setMode] = useState(Mode.tldr);

  const [latestPrompt, setLatestPrompt] = useState<string>("");
  const [pretext, setPretext] = useState<string>("");

  function generatePrompt() {
    let command = "";

    switch (mode) {
      case Mode.tldr:
        command = "Tl;dr";
        setPretext("");
        break;
      case Mode.summary:
        command = "summarize";
        setPretext("");
        break;
      case Mode.bullet:
        command = `summarize as bullet points

- `;
        setPretext("- ");
        break;
    }

    const fullPrompt = `${text} 

${command}`;

    setLatestPrompt(fullPrompt);
    return fullPrompt;
  }

  useEffect(() => {
    generatePrompt();
  }, [mode, text]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    promptMutation.mutate({
      text: generatePrompt(),
      temperature: temperature,
      task: "tldr",
    });
  };

  return (
    <Layout breadcrumbs={ExperimentsLevelBreadcrumbs("Summary", "/summary")}>
      <div className="flex w-full flex-col gap-4">
        <Summary title="Summary"></Summary>
        <hr />
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="concept"
              className="block text-sm font-medium text-gray-700"
            >
              Text
            </label>
            <div className="mt-1">
              <textarea
                rows={6}
                name="text"
                id="text"
                className="block w-full resize rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:w-[700px] sm:text-sm"
                placeholder=""
                value={text}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  setText(e.target.value);
                }}
              />
            </div>
            <p></p>
          </div>

          <select
            id="mode"
            name="mode"
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:w-min sm:text-sm"
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
          >
            <option value={Mode.tldr}>{Mode.tldr.toString()}</option>
            <option value={Mode.summary}>{Mode.summary.toString()}</option>
            <option value={Mode.bullet}>{Mode.bullet.toString()}</option>
          </select>

          <button
            className="inline-flex w-min items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium capitalize text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            <p>Generate</p>
          </button>
        </form>

        <hr className="w-full sm:w-[700px]" />
        <PromptBlock prompt={latestPrompt} />
        <EstimateBlock
          prompt={latestPrompt}
          result={promptMutation.data?.result ?? ""}
        />
        <AdvancedBlock
          temperature={temperature}
          setTemperature={setTemperature}
        />
        <ResultsBlock
          isLoading={promptMutation.isLoading}
          data={promptMutation.data}
          pretext={pretext}
        />
      </div>
    </Layout>
  );
};

export default SummaryPage;
