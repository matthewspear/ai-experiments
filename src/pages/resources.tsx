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
    <div className="relative">
      <div className="absolute -mt-20 h-10 md:-mt-2 md:h-0" id={title} />
      <div className="flex flex-col gap-4 pb-4">
        <h1 className="text-xl font-medium">{title}</h1>
        {children}
      </div>
    </div>
  );
}

const Resources: NextPage = () => {
  return (
    <Layout breadcrumbs={TopLevelBreadcrumb("Resources", "/resources")}>
      <div className="flex flex-col gap-4 md:mx-auto md:w-1/2">
        <Summary title="Resources">
          <div className="flex gap-4">
            <a href="#Tools">Tools</a>
            <a href="#OpenAI">OpenAI</a>
            <a href="#YouTube">YouTube</a>
            <a href="#Diving%20Deeper">Diving Deeper</a>
          </div>
          <p></p>
        </Summary>
        <Section title="Tools">
          <ResourceItem
            title="👁️ Peek: Effortless OpenAI API Monitoring for Developers"
            description="A macOS Menubar App for monitoring your OpenAI API usage."
            url="https://mattspear.gumroad.com/l/peekapp"
          />
        </Section>
        {/* <Section title="Code">
          <></>
        </Section> */}
        <Section title="OpenAI">
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
        <Section title="YouTube">
          <ResourceItem
            title="AI Explained"
            description="Covering the biggest news of the century - the arrival of smarter-than-human AI. What is happening, what might soon happen, what it means and what we can do with it."
            url="https://www.youtube.com/@ai-explained-"
          />

          <ResourceItem
            title="Jeremy Howard"
            description="Deep learning is transforming the world. We are making deep learning easier to use and getting more people from all backgrounds involved through our free courses for coders, software library, cutting-edge research, and community."
            url="https://www.youtube.com/@howardjeremyp"
          />
          <ResourceItem
            title="Two Minute Papers"
            description="What a time to be alive! Channel provides brief, accessible summaries and explanations of complex scientific papers."
            url="https://www.youtube.com/user/keeroyz"
          />
          <ResourceItem
            title="Radek Osmulski"
            description="I'm Radek, a Senior Data Scientist at NVIDIA and a 2x Kaggle Grandmaster. I started to learn programming and Machine Learning at 29 using online resources. I create videos for those who want to do awesome things in machine learning and don't have a traditional academic background."
            url="https://www.youtube.com/@radek_osmulski"
          />
          <ResourceItem
            title="Matt Wolfe"
            description="AI, No-Code, Tech, Futurism - I'm a tech nerd and talk about tech nerd stuff"
            url="https://www.youtube.com/@mreflow"
          />
          <ResourceItem
            title="Fireship"
            description="High-intensity ⚡ code tutorials to help you build & ship your app faster. Recently covering AI news, tutorials, and demos."
            url="https://www.youtube.com/watch?v=0rIvB3LZiKA"
          />
          <ResourceItem
            title="Lex Fridman"
            description="Lex Fridman Podcast and other videos."
            url="https://www.youtube.com/channel/UCSHZKyawb77ixDdsGog4iWA"
          />
          <ResourceItem
            title="sentdex"
            description="Python Programming tutorials, going further than just the basics. Learn about machine learning, finance, data analysis, robotics, web development, game development and more."
            url="https://www.youtube.com/channel/UCfzlCWGWYyIQ0aLC5w48gBQ"
          />
          <ResourceItem
            title="Nerdy Rodent"
            description="Showcasing AI Stuff since 2020, including such epics as: Stable Diffusion, VQGAN, StyleGAN, Large Language Models, Style Transfer, Super resolution / upscaling and many other amazing AI applications."
            url="https://www.youtube.com/@NerdyRodent"
          />
          <ResourceItem
            title="enigmatic_e"
            description="Videographer who also enjoys messing around with VFX and AI."
            url="https://www.youtube.com/@enigmatic_e"
          />
        </Section>
        <Section title="Diving Deeper">
          <ResourceItem
            title="ChatGPT Prompt Engineering for Developers"
            description="In ChatGPT Prompt Engineering for Developers, you will learn how to use a large language model (LLM) to quickly build new and powerful applications."
            url="https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/"
          />
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
