export type Section = "News" | "YouTube" | "OpenAI" | "Diving Deeper";

export type Resource = {
  title: string;
  author?: string;
  description: string;
  url: string;
  section: Section;
};

export const allSections = ["News", "YouTube", "OpenAI", "Diving Deeper"];

export const resources: Resource[] = [
  {
    title: "AI News",
    description:
      "Email summary of top AI discords + AI reddits + AI X/Twitters, and send to you each day!",
    url: "https://buttondown.email/ainews",
    section: "News",
  },
  {
    title: "Hype",
    description:
      "A feed of trending repos/models from GitHub, Replicate, HuggingFace, and Reddit.",
    url: "https://hype.replicate.dev/",
    section: "News",
  },
  {
    title: "AI Explained",
    description:
      "Covering the biggest news of the century - the arrival of smarter-than-human AI. What is happening, what might soon happen, what it means and what we can do with it.",
    url: "https://www.youtube.com/@ai-explained-",
    section: "YouTube",
  },
  {
    title: "Dwarkesh Patel",
    description:
      "Deeply researched interviews – features insightful interviews with experts across fields like technology, entrepreneurship, and philosophy, unpacking complex ideas on societal impacts.",
    url: "https://www.youtube.com/@DwarkeshPatel",
    section: "YouTube",
  },
  {
    title: "David Shapiro",
    description: "Deep philosophical dives into the future of AI and humanity.",
    url: "https://www.youtube.com/@DaveShap",
    section: "YouTube",
  },
  {
    title: "Jeremy Howard",
    description:
      "Deep learning is transforming the world. We are making deep learning easier to use and getting more people from all backgrounds involved through our free courses for coders, software library, cutting-edge research, and community.",
    url: "https://www.youtube.com/@howardjeremyp",
    section: "YouTube",
  },
  {
    title: "Two Minute Papers",
    description:
      "What a time to be alive! Channel provides brief, accessible summaries and explanations of complex scientific papers.",
    url: "https://www.youtube.com/user/keeroyz",
    section: "YouTube",
  },
  {
    title: "Data Independent",
    description:
      "Great resource for those interested in AI technologies like ChatGPT, OpenAI, and LangChain, as well as individuals seeking knowledge about data science, data visualization, and data bootcamps.",
    url: "https://www.youtube.com/channel/UCyR2Ct3pDOeZSRyZH5hPO-Q",
    section: "YouTube",
  },
  {
    title: "Radek Osmulski",
    description:
      "I'm Radek, a Senior Data Scientist at NVIDIA and a 2x Kaggle Grandmaster. I started to learn programming and Machine Learning at 29 using online resources. I create videos for those who want to do awesome things in machine learning and don't have a traditional academic background.",
    url: "https://www.youtube.com/@radek_osmulski",
    section: "YouTube",
  },
  {
    title: "Matt Wolfe",
    description:
      "AI, No-Code, Tech, Futurism - I'm a tech nerd and talk about tech nerd stuff.",
    url: "https://www.youtube.com/@mreflow",
    section: "YouTube",
  },
  {
    title: "Fireship",
    description:
      "High-intensity ⚡ code tutorials to help you build & ship your app faster. Recently covering AI news, tutorials, and demos.",
    url: "https://www.youtube.com/@Fireship",
    section: "YouTube",
  },
  {
    title: "The Inside View",
    description:
      "Michaël Trazzi discuss why experts believe what they believe about the future of AI progress.",
    url: "https://www.youtube.com/@TheInsideView",
    section: "YouTube",
  },
  {
    title: "Lex Fridman",
    description: "Lex Fridman Podcast and other videos.",
    url: "https://www.youtube.com/channel/UCSHZKyawb77ixDdsGog4iWA",
    section: "YouTube",
  },
  {
    title: "sentdex",
    description:
      "Python Programming tutorials, going further than just the basics. Learn about machine learning, finance, data analysis, robotics, web development, game development and more.",
    url: "https://www.youtube.com/channel/UCfzlCWGWYyIQ0aLC5w48gBQ",
    section: "YouTube",
  },
  //   {
  //     title: "Nerdy Rodent",
  //     description:
  //       "Showcasing AI Stuff since 2020, including such epics as: Stable Diffusion, VQGAN, StyleGAN, Large Language Models, Style Transfer, Super resolution / upscaling and many other amazing AI applications.",
  //     url: "https://www.youtube.com/@NerdyRodent",
  //     section: "YouTube",
  //   },
  //   {
  //     title: "enigmatic_e",
  //     description: "Videographer who also enjoys messing around with VFX and AI.",
  //     url: "https://www.youtube.com/@enigmatic_e",
  //     section: "YouTube",
  //   },
  {
    title: "HuggingFace",
    description:
      "HuggingFace is on a mission to solve Natural Language Processing (NLP) one commit at a time by open-source and open-science.",
    url: "https://www.youtube.com/@HuggingFace",
    section: "YouTube",
  },
  {
    title: "OpenAI Documentation",
    author: "OpenAI",
    description: "Guide to getting started with the OpenAI API.",
    url: "https://platform.openai.com/docs/introduction",
    section: "OpenAI",
  },
  {
    title: "OpenAI Tokenizer",
    author: "OpenAI",
    description:
      "A tool to understand how a piece of text would be tokenized by the API, and the total count of tokens in that piece of text.",
    url: "https://platform.openai.com/tokenizer",
    section: "OpenAI",
  },
  {
    title: "Best practices for prompt engineering",
    author: "OpenAI",
    description:
      "Article from the OpenAI help center on how to give clear and effective instructions to GPT-3 and Codex",
    url: "https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api",
    section: "OpenAI",
  },
  {
    title: "GPT Comparison tool",
    description:
      "This tool lets you try out different settings (engines, temp, top p, etc.) and compare the results.",
    url: "https://gpttools.com/comparisontool",
    section: "OpenAI",
  },
  {
    title: "GPT-4 Paper",
    author: "OpenAI",
    description:
      "The paper describing GPT-4, the latest version of OpenAI's language model.",
    url: "https://openai.com/research/gpt-4",
    section: "OpenAI",
  },
  {
    title: "ChatGPT Prompt Engineering for Developers",
    author: "DeepLearning.AI",
    description:
      "In ChatGPT Prompt Engineering for Developers, you will learn how to use a large language model (LLM) to quickly build new and powerful applications.",
    url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
    section: "Diving Deeper",
  },
  {
    title: "Fast.ai: Practical Deep Learning for Coders",
    author: "Fast.ai",
    description:
      "A free course designed for people with some coding experience, who want to learn how to apply deep learning and machine learning to practical problems.",
    url: "https://course.fast.ai/",
    section: "Diving Deeper",
  },
  {
    title: "Meta Learning: How To Learn Deep Learning",
    author: "Radek Osmulski",
    description:
      "Meta Learning is an actionable roadmap to learning machine learning efficiently. It will show you exactly what you need to learn and how to learn it in order to become a world-class machine learning professional in the least amount of time.",
    url: "https://rosmulski.gumroad.com/l/learn_machine_learning",
    section: "Diving Deeper",
  },
  {
    title: "Anton Teaches Packy AI",
    author: "Ages of Miracles",
    description:
      "Digestible breakdowns of AI for non-technical and technical folks alike.",
    url: "https://www.youtube.com/playlist?list=PL5em81iKs2atYsYcis2ogPpsKqJnQBtkI",
    section: "Diving Deeper",
  },
  {
    title: "Neural Networks: Zero to Hero",
    author: "Andrej Karpathy",
    description:
      "A course by Andrej Karpathy on building neural networks, from scratch, in code. We start with the basics of backpropagation and build up to modern deep neural networks, like GPT.",
    url: "https://karpathy.ai/zero-to-hero.html",
    section: "Diving Deeper",
  },
];
