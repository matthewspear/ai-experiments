import { AdvancedBlock } from "@/components/AdvancedBlock";
import { EstimateBlock } from "@/components/EstimateBlock";
import { PromptBlock } from "@/components/PromptBlock";
import type { Dispatch, SetStateAction } from "react";

interface BlocksInputType {
  prompt: string;
  result: string;
  temperature: number;
  setTemperature: Dispatch<SetStateAction<number>>;
}

export default function DropdownBlocks({
  prompt,
  result,
  temperature,
  setTemperature,
}: BlocksInputType) {
  return (
    <div className="flex w-full flex-col gap-2">
      <PromptBlock prompt={prompt} />
      <EstimateBlock prompt={prompt} result={result} />
      <AdvancedBlock
        temperature={temperature}
        setTemperature={setTemperature}
      />
    </div>
  );
}
