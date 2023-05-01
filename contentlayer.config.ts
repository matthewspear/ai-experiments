import {
  type ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
  url: {
    type: "string",
    resolve: (post) =>
      `/blog/${post._raw.sourceFileName.replace(/\.mdx$/, "")}`,
  },
  wordCount: {
    type: "number",
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
  },
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/*.mdx`,
  contentType: "mdx",
  fields: {
    createdAt: { type: "string", required: true },
    updatedAt: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    title: { type: "string", required: true },
    author: { type: "string", required: true },
    authorImage: { type: "string", required: true },
    summary: { type: "string", required: true },
    category: { type: "string", required: true },
    breadcrumb: { type: "string", required: false },
  },
  computedFields,
}));

export default makeSource({
  documentTypes: [Post],
  contentDirPath: "data",
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
