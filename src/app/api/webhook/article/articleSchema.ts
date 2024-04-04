import { z } from "zod";

export const articleSchema = z.object({
  id: z.string(),
  topic: z.string(),
  article: z.string().nullable(),
  editedArticle: z.string().nullable(),
  searchTerms: z.array(z.string()).nullable(),
  sources: z.array(z.string()).nullable(),
});
