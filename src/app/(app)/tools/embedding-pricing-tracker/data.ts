export interface AIEmbeddingPricing {
  model: string;
  company: string;
  cost: number; // $/MTok
  dimensions: number;
}

export const aiEmbeddingPricings: AIEmbeddingPricing[] = [
  {
    model: "text-embedding-3-small",
    company: "OpenAI",
    cost: 0.02,
    dimensions: 1536,
  },
  {
    model: "text-embedding-ada-002",
    company: "OpenAI",
    cost: 0.1,
    dimensions: 1536,
  },
  { model: "mistral-embed", company: "Mistral", cost: 0.1, dimensions: 1024 },
  { model: "v3 Light", company: "Cohere", cost: 0.1, dimensions: 384 },
  { model: "v3", company: "Cohere", cost: 0.1, dimensions: 1024 },
  {
    model: "text-embedding-3-large",
    company: "OpenAI",
    cost: 0.13,
    dimensions: 3072,
  },
];
