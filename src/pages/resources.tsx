import { type NextPage } from "next";

import Layout from "@/components/Layout";
import { TopLevelBreadcrumb } from "@/components/BreadcrumbBar";
import { Summary } from "@/components/Summary";

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
    <a href={url} target="_blank" rel="noreferrer noopener">
      <div className="flex flex-col gap-1 rounded-lg bg-white p-4 shadow-lg">
        <h3 className="font-bold">{title}</h3>
        <p>{description}</p>
        <pre className="truncate pt-2 font-mono text-[12px] underline">
          {url}
        </pre>
      </div>
    </a>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 pb-4">
      <h1 className="text-xl font-medium">{title}</h1>
      {children}
    </div>
  );
}

const Resources: NextPage = () => {
  return (
    <Layout breadcrumbs={TopLevelBreadcrumb("Resources", "/resources")}>
      <div className="flex flex-col gap-4 md:mx-auto md:w-1/2">
        <Summary title="Resources">
          <p></p>
        </Summary>
        <Section title="Tools">
          <ResourceItem
            title="👁️ Peek: Effortless OpenAI API Monitoring for Developers"
            description="A macOS Menubar App for monitoring your OpenAI API usage."
            url="https://mattspear.gumroad.com/l/peekapp"
          />
        </Section>
        <Section title="Open AI">
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
          <ResourceItem
            title="Best practices for prompt engineering"
            description="Article from the OpenAI help center on how to give clear and effective instructions to GPT-3 and Codex"
            url="https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api"
          />
          <ResourceItem
            title="GPT Comparison tool"
            description="This tool lets you try out different settings (engines, temp, top p, etc.) and compare the results."
            url="https://gpttools.com/comparisontool"
          />
          <ResourceItem
            title="GPT-4 Paper"
            description="The paper describing GPT-4, the latest version of OpenAI's language model."
            url="https://openai.com/research/gpt-4"
          />
        </Section>

        <Section title="Diving Deeper">
          <ResourceItem
            title="Fast.ai: Practical Deep Learning for Coders"
            description="A free course designed for people with some coding experience, who want to learn how to apply deep learning and machine learning to practical problems."
            url="https://course.fast.ai/"
          />
          <ResourceItem
            title="Meta Learning: How To Learn Deep Learning"
            description="Meta Learning is an actionable roadmap to learning machine learning efficiently. It will show you exactly what you need to learn and how to learn it in order to become a world-class machine learning professional in the least amount of time."
            url="https://rosmulski.gumroad.com/l/learn_machine_learning"
          />
          <ResourceItem
            title="Anton Teaches Packy AI"
            description="Digestible breakdowns of AI for non-technical and technical folks alike."
            url="https://www.youtube.com/playlist?list=PL5em81iKs2atYsYcis2ogPpsKqJnQBtkI"
          />
          <ResourceItem
            title="Neural Networks: Zero to Hero"
            description="A course by Andrej Karpathy on building neural networks, from scratch, in code.
            We start with the basics of backpropagation and build up to modern deep neural networks, like GPT."
            url="https://karpathy.ai/zero-to-hero.html"
          />
        </Section>
      </div>
    </Layout>
  );
};

export default Resources;
