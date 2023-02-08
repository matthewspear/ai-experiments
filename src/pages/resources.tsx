import { type NextPage } from "next";

import Layout from "../components/Layout";

function ResourceItem({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <a href={url}>
      <div className="flex flex-col gap-1 rounded-lg bg-white p-4 shadow-lg">
        <h3 className="font-bold">{title}</h3>
        <p>{description}</p>
        <pre className="pt-2 font-mono text-[12px] underline">{url}</pre>
      </div>
    </a>
  );
}

const Resources: NextPage = () => {
  return (
    <Layout title="Resources">
      <div className="flex w-1/2 flex-col gap-4">
        <ResourceItem
          title="OpenAI Documentation"
          description="Guide to getting started with the OpenAI API."
          url="https://platform.openai.com/docs/introduction"
        />
        <ResourceItem
          title="OpenAI Tokenizer"
          description="A tool to understand how a piece of text would be tokenized by the API, and the total count of tokens in that piece of text."
          url="https://platform.openai.com/tokenizer"
        />
      </div>
    </Layout>
  );
};

export default Resources;
