import { api } from "@/utils/api";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { Loader } from "./Loader";

export function EstimateBlock({
  prompt,
  result,
  max_tokens,
}: {
  prompt: string;
  result: string;
  max_tokens?: number;
}) {
  const tokenInputMutation = api.ai.tokens.useMutation();
  const tokenOutputMutation = api.ai.tokens.useMutation();

  const inputCount = tokenInputMutation?.data?.count ?? 0;
  let outputCount = tokenOutputMutation?.data?.count ?? 0;
  if (outputCount === 0) {
    outputCount = max_tokens ?? 265;
  }
  const sum = inputCount + outputCount;

  return (
    <div className="w-full sm:w-[700px]">
      <div className="mx-auto w-full rounded-2xl">
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                <span>Estimate</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-indigo-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <button
                  className="w-min-fit mb-2 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium capitalize text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    tokenInputMutation.mutate({
                      text: prompt,
                    });
                    tokenOutputMutation.mutate({
                      text: result,
                    });
                  }}
                >
                  <p>Estimate Cost</p>
                </button>
                {tokenInputMutation.isLoading &&
                  tokenOutputMutation.isLoading && <Loader />}
                {tokenInputMutation.isSuccess &&
                  tokenOutputMutation.isSuccess && (
                    <>
                      <p>Input: {inputCount} tokens </p>
                      <p>
                        Output: {outputCount} tokens{" "}
                        {outputCount === (max_tokens ?? 265)
                          ? "(estimating on max_tokens)"
                          : ""}{" "}
                      </p>
                      <p>Total: {sum} tokens</p>
                      <br />
                      <p>
                        <code>davinci-text-3</code> = $0.0200 per 1000 tokens
                      </p>
                      <br />
                      <p>${((sum / 1000) * 0.02).toFixed(5)} per call</p>
                      <p>
                        ${((sum / 1000) * 0.02 * 100).toFixed(5)} per 100 call
                      </p>
                      <p>
                        ${((sum / 1000) * 0.02 * 1000).toFixed(5)} per 1000 call
                      </p>
                    </>
                  )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
