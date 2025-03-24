"use client";

import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Loader } from "./Loader";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ResultsBlockInput {
  isLoading: boolean;
  data:
    | {
        result?: string | undefined;
        error?: { message: string };
      }
    | undefined;
  copyable?: boolean;
}

export function ResultsBlock({ isLoading, data, copyable }: ResultsBlockInput) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex h-full flex-col">
      {isLoading && <Loader />}
      {data?.error && (
        <div className="mt-8 flex w-full flex-row items-center rounded-lg bg-white shadow-lg">
          <ExclamationCircleIcon className="my-4 ml-4 mr-4 h-6 w-6 text-red-500" />
          <p className="break-words">
            {data.error?.message || JSON.stringify(data.error)}
          </p>
        </div>
      )}
      {!isLoading && data && !data.error && (
        <div className="relative mt-8 grid w-full rounded-lg bg-white shadow-lg">
          {copyable && (
            <button
              className="absolute bottom-0 right-0 p-4"
              aria-label="Copy to clipboard"
              onClick={async () => {
                if (data.result) {
                  await navigator.clipboard.writeText(data.result.trim());
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }
              }}
            >
              {copied && (
                <ClipboardDocumentCheckIcon className="-mb-1 w-6 text-gray-400 transition-all" />
              )}
              {!copied && (
                <ClipboardDocumentIcon className="-mb-1 w-6 text-gray-300 transition-all" />
              )}
            </button>
          )}
          <div className="prose prose-base prose-slate !max-w-none pr-8 prose-code:before:hidden prose-code:after:hidden prose-pre:bg-slate-50 prose-pre:text-slate-800">
            <div className="px-4 pb-4">
              <Markdown remarkPlugins={[remarkGfm]}>
                {data.result?.trim()}
              </Markdown>
            </div>
          </div>
        </div>
      )}
      <div className="h-10 grow" />
    </div>
  );
}
