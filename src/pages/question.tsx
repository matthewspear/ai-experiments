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
import { downloadJSON } from "@/utils/download";
import { ChatGPTBadge } from "@/components/Badges";
import { UpgradeButton } from "@/components/UpgradeButton";
import { useRouter } from "next/router";
import Metatags from "@/components/Metatags";

const questions = [
  "How do I determine north from the sun?",
  "What's the weather going to be like tomorrow?",
  "How can I get a wine stain out of my carpet?",
  "What are some exercises I can do at home to stay fit?",
  "How do I change a flat tire?",
  "What's a simple recipe for a homemade tomato sauce?",
  "How do I reset my Wi-Fi router?",
  "What are the symptoms of the common cold?",
  "How do I get my indoor plants to thrive?",
  "What are some tips for managing stress?",
  "How can I improve my sleep quality?",
];

const Question: NextPage = () => {
  const router = useRouter();
  const chatMutation = api.ai.newchat.useMutation();

  const [temperature, setTemperature] = useState(0.2);
  const [model, setModel] = useState<"gpt-4" | "gpt-3.5-turbo">(
    "gpt-3.5-turbo"
  );
  const [prompt] = useState<string>(
    "Pretend you are a helpful google search, answer the question and avoid mentioning that your are an AI model"
  );

  const [userInput, setUserInput] = useState<string>(
    router.query.q
      ? String(router.query.q)
      : questions.at(Math.floor(Math.random() * questions.length)) ?? ""
  );
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
      task: "question",
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
  };

  return (
    <Layout
      title="Quick Question"
      description="Step into the 'Quick Questions' experiment, designed to provide concise, helpful answers to your queries, mimicking a helpful Google search. This experiment is engineered to focus solely on addressing your questions, dispensing with AI self-references and delivering clear, straightforward responses."
      breadcrumbs={ExperimentsLevelBreadcrumbs("Quick Question", "/question")}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="prose prose-lg prose-gray">
          <h3>Quick Question</h3>
          <ChatGPTBadge />
          <p>Sometimes you just want the answer to a quick question!</p>
        </div>
        <hr />
        <div className="flex w-full flex-col gap-4">
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
        </div>
      </div>
    </Layout>
  );
};

export default Question;
