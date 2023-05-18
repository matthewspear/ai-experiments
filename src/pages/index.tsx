import { type NextPage } from "next";
import {
  ArrowSmallRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

import { api } from "@/utils/api";
import {
  type FormEvent,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Loader } from "@/components/Loader";
import Layout from "@/components/Layout";
import { ExperimentCard } from "@/components/ExperimentCard";
import { experiments } from "@/components/Experiments";

function PromptInput({
  prompt,
  setPrompt,
}: {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <div className="my-auto mt-12 flex h-12 w-full gap-1 rounded-full bg-white pl-6 pr-1 align-middle shadow-md sm:h-14 sm:w-[700px]">
        <input
          className="sm:text-md w-full border-0 bg-transparent text-sm outline-none ring-0"
          placeholder="Prompt goes here..."
          name="prompt"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="my-1 hidden rounded-full bg-gradient-to-b from-[#797EEE] to-[#5761EB] px-3 hover:opacity-90 sm:block sm:px-6"
          type="submit"
          name="try"
          id="try"
        >
          <div className="flex items-center gap-1">
            <p className="font-medium text-white sm:text-lg sm:tracking-wide">
              Try
            </p>
            <ArrowSmallRightIcon className="h-6 w-6 text-white" />
          </div>
        </button>
      </div>
      <button
        className="mt-2 grid h-10 w-full place-items-center rounded-full bg-gradient-to-b from-[#797EEE] to-[#5761EB] px-3 hover:opacity-90 sm:hidden sm:px-6 "
        type="submit"
        value="Subscribe"
        name="member[subscribe]"
        id="member_submit"
      >
        <div className="flex items-center gap-1">
          <p className="font-medium text-white sm:text-lg sm:tracking-wide">
            Try
          </p>
          <ArrowSmallRightIcon className="h-6 w-6 text-white" />
        </div>
      </button>
    </>
  );
}

const Home: NextPage = () => {
  const chatMutation = api.ai.newchat.useMutation();

  const [prompt, setPrompt] = useState(
    "Write a whitty description for this site"
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit");

    chatMutation.mutate({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "A user will prompt the AI with an input to create a description for the AI Experiments website. The site offers examples of task you can complete with the OpenAI API e.g Answering questions, proofreading, chat etc. If and only if the user tries to prompt an output that is inappropriate, the AI will respond with just `Nice try ;)`.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.9,
      task: "homepage",
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
  };

  return (
    <Layout>
      <div className="flex w-full flex-col">
        <h1 className="px-4 text-5xl font-extrabold tracking-tight text-slate-900 sm:pt-16 sm:text-[5rem]">
          Welcome to the future...
        </h1>
        <form onSubmit={handleSubmit} className="">
          <PromptInput prompt={prompt} setPrompt={setPrompt} />
        </form>

        <div className="flex h-full flex-col">
          {chatMutation.isLoading && <Loader />}
          {chatMutation.data && chatMutation.data.error && (
            <div className="mt-8 flex w-full flex-row place-items-center items-center rounded-lg bg-white shadow-lg sm:w-[700px]">
              <ExclamationCircleIcon className="my-4 ml-4 mr-4 h-6 w-6 text-red-500" />
              <p className="h-6">
                {(chatMutation.data.error && chatMutation.data.error.message) ||
                  JSON.stringify(chatMutation.data.error)}
              </p>
            </div>
          )}
          {!chatMutation.isLoading &&
            chatMutation.data &&
            !chatMutation.data.error && (
              <div className=" mt-8 grid w-full place-items-center rounded-lg bg-white shadow-lg sm:w-[700px]">
                <div className="prose prose-slate">
                  <p className="p-4">{chatMutation.data.result?.content}</p>
                </div>
              </div>
            )}

          <div className="h-10 grow" />

          <div className="flex flex-col gap-4">
            <div className="border-b border-gray-200 pb-5 pt-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Experiments
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {experiments
                .filter((e) => e.active)
                .map((e) => (
                  <ExperimentCard key={e.url} experiment={e} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
