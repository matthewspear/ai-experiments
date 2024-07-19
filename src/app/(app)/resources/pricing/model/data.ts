export interface AIModelPricing {
  model: string;
  company: string;
  inputCost: number; // $/MTok
  outputCost: number; // $/MTok,
  contextLength: number; // tokens
}

export const aiModelPricings: AIModelPricing[] = [
  {
    model: "GPT-4o mini",
    company: "OpenAI",
    inputCost: 0.015,
    outputCost: 0.6,
    contextLength: 128_000,
  },
  {
    model: "Claude 3 Haiku",
    company: "Anthropic",
    inputCost: 0.25,
    outputCost: 1.25,
    contextLength: 200_000,
  },
  {
    model: "Mistral 7B",
    company: "Mistral",
    inputCost: 0.25,
    outputCost: 0.25,
    contextLength: 32_000,
  },
  {
    model: "Command Light",
    company: "Cohere",
    inputCost: 0.3,
    outputCost: 0.6,
    contextLength: 4_096,
  },
  {
    model: "GPT-3.5 Turbo",
    company: "OpenAI",
    inputCost: 0.5,
    outputCost: 1.5,
    contextLength: 16_385,
  },
  {
    model: "Gemini Pro",
    company: "Google",
    inputCost: 0.5,
    outputCost: 1.5,
    contextLength: 30_720,
  },
  {
    model: "Command-R",
    company: "Cohere",
    inputCost: 0.5,
    outputCost: 1.5,
    contextLength: 128_000,
  },
  {
    model: "Mixtral 8x7B",
    company: "Mistral",
    inputCost: 0.7,
    outputCost: 0.7,
    contextLength: 32_000,
  },
  {
    model: "Mixtral 8x22B",
    company: "Mistral",
    inputCost: 2.0,
    outputCost: 6.0,
    contextLength: 64_000,
  },
  {
    model: "Mistral Small",
    company: "Mistral",
    inputCost: 2,
    outputCost: 6,
    contextLength: 32_000,
  },
  {
    model: "Mistral Medium",
    company: "Mistral",
    inputCost: 2.7,
    outputCost: 8.1,
    contextLength: 32_000,
  },
  {
    model: "Command-R+",
    company: "Cohere",
    inputCost: 3.0,
    outputCost: 15.0,
    contextLength: 128_000,
  },
  {
    model: "Claude 3.5 Sonnet",
    company: "Anthropic",
    inputCost: 3,
    outputCost: 15,
    contextLength: 200_000,
  },
  {
    model: "GPT-4o",
    company: "OpenAI",
    inputCost: 5.0,
    outputCost: 15.0,
    contextLength: 128_000,
  },
  {
    model: "Mistral Large",
    company: "Mistral",
    inputCost: 8,
    outputCost: 24,
    contextLength: 32_000,
  },
  {
    model: "GPT-4 Turbo",
    company: "OpenAI",
    inputCost: 10,
    outputCost: 30,
    contextLength: 128_000,
  },
  {
    model: "Claude 3 Opus",
    company: "Anthropic",
    inputCost: 15,
    outputCost: 75,
    contextLength: 200_000,
  },
  // {
  //   model: "GPT-4",
  //   company: "OpenAI",
  //   inputCost: 30,
  //   outputCost: 60,
  //   contextLength: 8_192,
  // },
];
