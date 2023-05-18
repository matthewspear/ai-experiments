import { type NextPage } from "next";
import Layout from "@/components/Layout";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";
import { api } from "@/utils/api";
import React, { type ChangeEvent, useState, useEffect } from "react";
import { SmallWhiteLoader } from "@/components/Loader";
import type {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
} from "openai";
import { DisplayBlock } from "@/components/DisplayBlock";
import clsx from "clsx";
import { AdvancedBlock } from "@/components/AdvancedBlock";
import { ReferenceBlock } from "@/components/ReferenceBlock";
import { downloadJSON } from "@/utils/download";
import { ChatGPTBadge } from "@/components/Badges";
import Link from "next/link";
import { UpgradeButton } from "@/components/UpgradeButton";

const Chat: NextPage = () => {
  const chatMutation = api.ai.newchat.useMutation();

  const [temperature, setTemperature] = useState(0.9);
  const [model, setModel] = useState<"gpt-4" | "gpt-3.5-turbo">(
    "gpt-3.5-turbo"
  );
  const [prompt, setPrompt] = useState<string>(
    "Pretend you are a world leading life coach and I am paying $1000 per hour. Distill your best wisdom and help me become the best version of myself by asking questions."
  );
  const [userInput, setUserInput] = useState<string>("Hello, who are you?");
  const [messages, setMessages] = useState<ChatCompletionResponseMessage[]>([
    {
      role: "system",
      content: prompt,
    },
  ]);

  useEffect(() => {
    if (chatMutation.data?.result) {
      setMessages([...messages, chatMutation.data.result]);
      chatMutation.reset();
    }
  }, [chatMutation.data]);

  useEffect(() => {
    const allMessages = messages;
    allMessages[0] = {
      role: "system",
      content: prompt,
    };
    setMessages(allMessages);
  }, [prompt]);

  const onSubmit = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (chatMutation.isLoading || chatMutation.data) {
      return;
    }

    const updatedMessages: ChatCompletionRequestMessage[] = [
      ...messages,
      {
        role: "user",
        content: userInput,
      },
    ];

    setUserInput("");
    setMessages(updatedMessages);

    chatMutation.mutate({
      model: model,
      messages: updatedMessages,
      temperature: temperature,
      task: "chatgpt",
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
          setMessages([
            {
              role: "system",
              content: prompt,
            },
          ]);
          setUserInput("Hello, who are you?");
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
          <ChatGPTBadge />
          <p>Built using the new ChatGPT API.</p>
          <Link href="/chat">Visit GPT-3 Chat</Link>
        </div>
        <hr />
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <PromptButton
              icon="📝"
              label="lifecoach"
              prompt={`Pretend you are a world leading life coach and I am paying $1000 per hour. Distill your best wisdom and help me become the best version of myself by asking questions.`}
            />
            <PromptButton
              icon="🗺️"
              label="travel guide"
              prompt={`I want you to act as an AI travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. Ask my location to begin.`}
            />
            <PromptButton
              icon="🔮"
              label="philosophy teacher"
              prompt={`I want you to act as a philosophy teacher. I will provide some topics related to the study of philosophy, and it will be your job to explain these concepts in an easy-to-understand manner. This could include providing examples, posing questions or breaking down complex ideas into smaller pieces that are easier to comprehend.`}
            />
            <PromptButton
              icon="🚀"
              label="motivational speaker"
              prompt={`I want you to act as a motivational coach. I will provide you with some information about someone's goals and challenges, and it will be your job to come up with strategies that can help this person achieve their goals. This could involve providing positive affirmations, giving helpful advice or suggesting activities they can do to reach their end goal.`}
            />
            <PromptButton
              icon="💻"
              label="software engineer"
              prompt={`I want you to act as a staff software engineer. I will write some software engineering concepts and it will be your job to explain them in easy-to-understand terms. We are pair programming and you are my copilot. Ask me what I need help with to begin.`}
            />
            {/* <PromptButton
              icon="🍾"
              label="drunk"
              prompt={`I want you to act as a drunk person. You will only answer like a very drunk person texting and nothing else. Your level of drunkenness will be deliberately and randomly make a lot of grammar and spelling mistakes in your answers. You will also randomly ignore what I said and say something random with the same level of drunkenness I mentioned. Do not write explanations on replies.`}
            /> */}
          </div>
          <hr />
          <div className="flex flex-wrap items-center gap-4">
            <p>New:</p>
            <PromptButton
              icon="🔮"
              label="socrates"
              prompt={`You are Socrates, please help me with an issue in my life. Please ask me questions to try to understand what my issue is and help me unpack it. You can start the conversation however you feel is best.`}
            />
            <PromptButton
              icon="✍️"
              label="journal"
              prompt={`You are a warm, loving, and compassionate chat bot who wants to help me increase my sense of positivity, love, gratitude, and joy. You help access these feelings by asking me questions that get me to reflect on and journal about parts of my life that evoke those feelings. You always ask follow up questions that help me get into the details and the narrative of the things that I am grateful for-so that I really feel into them. Please ask me a question to help me get started. You can start however you feel is best.`}
            />
          </div>
          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700"
            >
              Model
            </label>
            <select
              id="model"
              name="model"
              className="mt-1 block w-fit rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={model}
              onChange={(e) =>
                setModel(
                  e.target.value === "gpt-3.5-turbo" ? "gpt-3.5-turbo" : "gpt-4"
                )
              }
            >
              <option value="gpt-3.5-turbo">ChatGPT</option>
              <option disabled value="gpt-4">
                GPT-4
              </option>
            </select>
            <UpgradeButton />
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
                value={prompt}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  setPrompt(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <hr />
        <pre className="prose prose-slate whitespace-pre-line">
          {/* {JSON.stringify(chatMutation.data, null, 2)} */}
          {messages
            .filter((m) => m.role !== "system")
            .map((m, index) => {
              return (
                <div
                  key={index}
                  className={clsx(
                    m.role === "assistant" ? "du-chat-start" : "du-chat-end",
                    "du-chat"
                  )}
                >
                  {m.content.trim() !== "" && (
                    <div
                      className={clsx(
                        m.role === "assistant"
                          ? "bg-indigo-400"
                          : "bg-blue-400",
                        "du-chat-bubble"
                      )}
                    >
                      {m.content.trim()}
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
              name="userInput"
              id="userInput"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:w-[600px] sm:text-sm"
              value={userInput ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setUserInput(e.target.value);
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
          <DisplayBlock
            title="Messages"
            download={() => {
              downloadJSON(JSON.stringify(messages, null, 2), "messages");
            }}
          >
            <p className="not-prose whitespace-pre-wrap">
              {JSON.stringify(messages, null, 2)}
            </p>
          </DisplayBlock>
          <AdvancedBlock
            temperature={temperature}
            setTemperature={setTemperature}
          />
          <ReferenceBlock
            references={[
              {
                title: "Awesome ChatGPT Prompts",
                url: "https://github.com/f/awesome-chatgpt-prompts",
              },
              {
                title: "GPT-3 Is the Best Journal I've Ever Used",
                url: "https://every.to/chain-of-thought/gpt-3-is-the-best-journal-you-ve-ever-used",
              },
            ]}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
