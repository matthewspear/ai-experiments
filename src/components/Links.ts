interface LinkType {
  url: string;
  image?: string;
  title: string;
  description: string;
  favicon?: string;
  site: string;
  generated?: string;
  imageAlignment?: "left" | "center" | "right";
}

export const links: LinkType[] = [
  {
    url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers",
    title: "ChatGPT Prompt Engineering for Developers",
    description:
      "In this course, you will learn how to use a large language model (LLM) to swiftly build new and powerful applications using the OpenAI API.",
    image:
      "https://wordpress.deeplearning.ai/wp-content/uploads/2023/04/DLAI-OAI-Image-Preview.png",
    favicon: "https://www.deeplearning.ai/static/favicons/favicon.ico",
    site: "DeepLearning.ai",
    generated: "2023-05-23T07:22:23.187Z",
    imageAlignment: "left",
  },
  {
    url: "https://www.youtube.com/playlist?list=PL1T8fO7ArWleyIqOy37OVXsP4hFXymdOZ",
    title: "LLM Bootcamp - Spring 2023",
    description:
      "Learn how to construct an application powered by large language models, like GPT-4, through recorded videos from the Full Stack Large Language Models Bootcamp.",
    image:
      "https://i.ytimg.com/vi/twHxmU9OxDU/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAREGExxlLyLH9wviB7jfX-v2V7LQ",
    favicon:
      "https://www.youtube.com/s/desktop/95c4ab27/img/favicon_144x144.png",
    site: "The Full Stack",
    generated: "2023-05-23T07:25:27.318Z",
  },
  {
    url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ",
    title: "Neural Networks: Zero to Hero",
    description:
      "A course by Andrej Karpathy on building neural networks, from scratch, in code. We start with the basics of backpropagation and build up to modern deep neural networks, like GPT.",
    image:
      "https://i.ytimg.com/vi/VMj-3S1tku0/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLChyxrlO8apEF00Y6TnKYY5Rpg8gQ",
    favicon:
      "https://www.youtube.com/s/desktop/95c4ab27/img/favicon_144x144.png",
    site: "Andrej Karpathy",
    generated: "2023-05-23T07:26:44.418Z",
  },
  {
    url: "https://course.fast.ai",
    title: "Practical Deep Learning for Coders",
    description:
      "A free course designed for people with some coding experience, who aspire to apply deep learning and machine learning to practical problems.",
    image: "https://course.fast.ai/www/social.png",
    favicon: "undefined",
    site: "Fast.ai",
    generated: "2023-05-23T07:33:54.574Z",
    imageAlignment: "left",
  },
  {
    url: "https://course.fast.ai/Lessons/part2.html",
    title: "Practical Deep Learning for Coders - Part 2",
    description:
      "In collaboration with experts from Stability.ai and Hugging Face (creators of the Diffusers library), we offer a thorough exploration of the latest techniques, including coverage of papers released after Stable Diffusion. We also teach how to interpret research papers, and practice this skill by studying and implementing many papers throughout the course.",
    image: "https://course.fast.ai/Lessons/diffusion.png",
    favicon: "undefined",
    site: "Fast.ai",
    generated: "2023-05-23T07:36:44.128Z",
    imageAlignment: "left",
  },
  {
    url: "https://www.youtube.com/playlist?list=PLoROMvodv4rNjRoawgt72BBNwL2V7doGI",
    title: "Stanford CS330: Deep Multi-Task and Meta Learning I Autumn 2022",
    description:
      "Delve deep into the success of deep learning in fields such as image classification, natural language processing, and speech recognition.",
    image:
      "https://i.ytimg.com/vi/jDzuGEcnRkA/hqdefault.jpg?sqp=-oaymwExCNACELwBSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYZSBlKGUwDw==&rs=AOn4CLAVY3eKw0LazneloMpXh1KnHZOhnA",
    favicon:
      "https://www.youtube.com/s/desktop/95c4ab27/img/favicon_144x144.png",
    site: "Stanford Online",
    generated: "2023-05-23T07:40:31.278Z",
    imageAlignment: "right",
  },
  {
    url: "https://github.com/openai/openai-cookbook",
    title:
      "openai/openai-cookbook: Examples and guides for using the OpenAI API",
    description:
      "Explore examples and guides for using the OpenAI API, and contribute to its development by creating an account on GitHub.",
    image:
      "https://opengraph.githubassets.com/e4329eb56ccb6d3a73a337b184943f04995d0957a4f59c370f6b44c029d4c551/openai/openai-cookbook",
    favicon: "https://github.githubassets.com/favicons/favicon.svg",
    site: "GitHub",
    generated: "2023-05-23T07:43:49.014Z",
    imageAlignment: "left",
  },
  {
    url: "https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api",
    title: "Best practices for prompt engineering with OpenAI API",
    description:
      "Discover how to provide clear and effective instructions to GPT-3 and Codex.",
    image:
      "https://images.openai.com/blob/fb4a2ba6-9109-4c7b-af4d-cae530c3fa78/recruitment-video-poster.jpg?trim=0%2C0%2C0%2C0",
    favicon:
      "https://static.intercomassets.com/assets/educate/educate-favicon-64x64-at-2x-52016a3500a250d0b118c0a04ddd13b1a7364a27759483536dd1940bccdefc20.png",
    site: "OpenAI Help Center",
    generated: "2023-05-23T07:44:55.830Z",
  },
];
