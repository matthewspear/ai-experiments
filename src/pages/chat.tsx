import { type NextPage } from "next";
import Layout from "@/components/Layout";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";
import { api } from "@/utils/api";
import { type ChangeEvent, useState, useEffect } from "react";
import clsx from "clsx";
import { SmallWhiteLoader } from "@/components/Loader";
import { DisplayBlock } from "@/components/DisplayBlock";
import { AdvancedBlock } from "@/components/AdvancedBlock";

const Chat: NextPage = () => {
  const chatMutation = api.ai.chat.useMutation();
  const [temperature, setTemperature] = useState(0.9);

  const [message, setMessage] = useState<string>("Hello, who are you?");
  const [prompt, setPrompt] = useState<string>(
    // "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n---"
    "Pretend you (AI) are a world leading life coach and I am paying $1000 per hour. Distill your best wisdom and help me become the best version of myself by asking questions.\n---"
  );
  const [chat, setChat] = useState<string>(``); //Human: Hello, who are you?
  // AI:`); //I am an AI created by OpenAI. How can I help you today?`);

  useEffect(() => {
    if (chatMutation.data?.result) {
      setChat(chat + chatMutation.data?.result);
      chatMutation.reset();
    }
    generatePrompt(message);
  }, [chatMutation.data]);

  const [latestPrompt, setLatestPrompt] = useState<string>("");

  const generatePrompt = (message: string) => {
    const fullPrompt =
      prompt.trim() +
      "\n" +
      chat.trim() +
      "\n Human: " +
      message.trim() +
      "\n AI: ";
    setLatestPrompt(fullPrompt);
    return fullPrompt;
  };

  useEffect(() => {
    generatePrompt(message);
  }, [message]);

  const onSubmit = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (chatMutation.isLoading || chatMutation.data) {
      return;
    }

    const prompt = generatePrompt(message);
    setChat(prompt.split("---")[1] ?? "");
    setMessage("");

    chatMutation.mutate({
      text: prompt,
      temperature: temperature,
      task: "chat",
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
  };

  function PromptButton({
    icon,
    label,
    prompt,
  }: {
    icon: string;
    label: string;
    prompt: string;
  }) {
    return (
      <button
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium capitalize text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={(e) => {
          e.preventDefault();
          setPrompt(prompt);
          setChat("");
          setMessage("Hello, who are you?");
          generatePrompt(message);
        }}
      >
        <p className="-ml-1 mr-2">{icon}</p>
        <p>{label}</p>
      </button>
    );
  }

  return (
    <Layout breadcrumbs={ExperimentsLevelBreadcrumbs("Chat", "/chat")}>
      <div className="flex w-full flex-col gap-4">
        <div className="prose prose-lg prose-gray">
          <h3>Chat</h3>
          <p>Built using GPT-3 completions API.</p>
        </div>
        <hr />
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <PromptButton
              icon="📝"
              label="lifecoach"
              prompt={`Pretend you (AI) are a world leading lifecoach and I am paying $1000 per hour. Distill your best wisdom and help me become the best version of myself by asking questions.\n---`}
            />
            <PromptButton
              icon="🗺️"
              label="travel guide"
              prompt={`I want you to act as an AI travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. Ask my location to begin.\n---`}
            />
            <PromptButton
              icon="🔮"
              label="philosophy teacher"
              prompt={`I want you to act as a philosophy teacher. I will provide some topics related to the study of philosophy, and it will be your job to explain these concepts in an easy-to-understand manner. This could include providing examples, posing questions or breaking down complex ideas into smaller pieces that are easier to comprehend.\n---`}
            />
            <PromptButton
              icon="🚀"
              label="motivational speaker"
              prompt={`I want you to act as a motivational coach. I will provide you with some information about someone's goals and challenges, and it will be your job to come up with strategies that can help this person achieve their goals. This could involve providing positive affirmations, giving helpful advice or suggesting activities they can do to reach their end goal.\n---`}
            />
            <PromptButton
              icon="💻"
              label="software engineer"
              prompt={`I want you to act as a staff software engineer. I will write some software engineering concepts and it will be your job to explain them in easy-to-understand terms. We are pair programming and you are my copilot. Ask me what I need help with to begin.\---`}
            />

            {/* <PromptButton
              icon="🍾"
              label="drunk"
              prompt={`I want you to act as a drunk person. You will only answer like a very drunk person texting and nothing else. Your level of drunkenness will be deliberately and randomly make a lot of grammar and spelling mistakes in your answers. You will also randomly ignore what I said and say something random with the same level of drunkenness I mentioned. Do not write explanations on replies.\n---`}
            /> */}
          </div>
          <div>
            <label
              htmlFor="concept"
              className="block text-sm font-medium text-gray-700"
            >
              Prompt
            </label>
            <div className="mt-1">
              <textarea
                rows={6}
                name="text"
                id="text"
                className="block w-full resize rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:w-[700px] sm:text-sm"
                placeholder=""
                value={prompt.split("---")[0]}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  setPrompt(e.target.value.replace("---", "") + "---");
                }}
              />
            </div>
            <p></p>
          </div>
        </div>
        <hr />
        <pre className="prose prose-slate whitespace-pre-line">
          {chat
            .split("AI:")
            .flatMap((c) => c.split("Human:"))
            .map((c, index) => {
              return (
                <div
                  key={index}
                  className={clsx(
                    index % 2 == 0 ? "du-chat-start" : "du-chat-end",
                    "du-chat"
                  )}
                >
                  {c.trim() !== "" && (
                    <div
                      className={clsx(
                        index % 2 == 0 ? "bg-indigo-400" : "bg-blue-400",
                        "du-chat-bubble"
                      )}
                    >
                      {c.trim()}
                    </div>
                  )}
                </div>
              );
            })}
          {(chatMutation.isLoading || chatMutation.data) && (
            <div className="du-chat du-chat-start">
              <div className="du-chat-bubble w-32 bg-indigo-400">
                <SmallWhiteLoader />
              </div>
            </div>
          )}
        </pre>
        <div className="flex flex-row gap-4">
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <input
              type="text"
              name="message"
              id="message"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:w-[600px] sm:text-sm"
              value={message ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setMessage(e.target.value);
              }}
            />
          </form>
          <button
            type="button"
            className="inline-flex w-min items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium capitalize text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:hover:bg-indigo-100"
            disabled={chatMutation.isLoading}
            onClick={(e) => onSubmit(e)}
          >
            <p>Send</p>
          </button>
        </div>
        <hr />
        <div className="flex w-full flex-col gap-2">
          <DisplayBlock title="Prompt">{prompt.trim()}</DisplayBlock>
          <DisplayBlock title="Chat">{chat.trim()}</DisplayBlock>
          <DisplayBlock title="Full Prompt">{latestPrompt.trim()}</DisplayBlock>
          <AdvancedBlock
            temperature={temperature}
            setTemperature={setTemperature}
          />
        </div>
        {/* <DropdownBlocks
          prompt={latestPrompt}
          result={chatMutation.data?.result ?? ""}
          temperature={temperature}
          setTemperature={setTemperature}
        /> */}
        {/* <ResultsBlock
          isLoading={chatMutation.isLoading}
          data={chatMutation.data}
        /> */}
      </div>
    </Layout>
  );
};

export default Chat;
