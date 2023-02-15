import { type NextPage } from "next";

import Layout from "@/components/Layout";
import { api } from "@/utils/api";
import { useState } from "react";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";
import { ResultsBlock } from "@/components/ResultsBlock";
import { AdvancedBlock } from "@/components/AdvancedBlock";
import { EstimateBlock } from "@/components/EstimateBlock";
import { PromptBlock } from "@/components/PromptBlock";
import { Summary } from "@/components/Summary";

const JournalPrompt: NextPage = () => {
  const promptMutation = api.ai.prompt.useMutation();
  const [latestPrompt, setLatestPrompt] = useState<string>("");

  function PromptButton({
    icon,
    label,
    prompt,
  }: {
    icon: string;
    label: string;
    prompt: string;
  }) {
    const fullPrompt = `${prompt}
    
    Prompt`;

    return (
      <button
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium capitalize text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={(e) => {
          e.preventDefault();
          setLatestPrompt(fullPrompt);
          promptMutation.mutate({
            text: fullPrompt,
            temperature: temperature,
            task: "journal-prompt",
          });
        }}
      >
        <p className="-ml-1 mr-2">{icon}</p>
        <p>{label}</p>
      </button>
    );
  }

  const [temperature, setTemperature] = useState(0.7);

  return (
    <Layout
      // title="Journal Prompt"
      breadcrumbs={ExperimentsLevelBreadcrumbs(
        "Journal Prompt",
        "/journal-prompt"
      )}
    >
      <div className="flex w-full flex-col gap-4">
        <Summary title="Journal Prompt">
          <p>Tap one of the buttons below to generate a journal prompt:</p>
        </Summary>
        <div className="flex flex-wrap gap-4">
          <PromptButton
            icon="🗓️"
            label="daily prompt"
            prompt={`Generate a single question journal prompt to help me connect back to myself`}
          />
          <PromptButton
            icon="🙏"
            label="gratitude"
            prompt={`Generate a journal prompt to explore the topic of gratitude`}
          />
          <PromptButton
            icon="❤️"
            label="love"
            prompt={`Generate a journal prompt to explore the topic of love`}
          />
          <PromptButton
            icon="🚀"
            label="goals"
            prompt={`Write me a journal prompt to structure my goals`}
          />
          <PromptButton
            icon="💭"
            label="dreams"
            prompt={`Generate a journal prompt to explore my hopes, dreams and future`}
          />
          <PromptButton
            icon="🪁"
            label="childhood"
            prompt={`Write me a journal prompt. Ask me a specific question about my childhood that might invoke nostalgia`}
          />
          <PromptButton
            icon="📝"
            label="weekly review"
            prompt={`Generate a journal prompt to help with my weekly review`}
          />
        </div>
        <hr />
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
          copyable
        />
      </div>
    </Layout>
  );
};

export default JournalPrompt;
