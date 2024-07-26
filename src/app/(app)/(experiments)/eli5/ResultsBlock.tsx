"use client";

import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Loader } from "./Loader";

interface ResultsBlockInput {
  isLoading: boolean;
  data:
    | {
        result?: string | undefined;
        error?: { message: string };
      }
    | undefined;
  pretext?: string;
  copyable?: boolean;
}

export function ResultsBlock({
  isLoading,
  data,
  pretext,
  copyable,
}: ResultsBlockInput) {
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
                  await navigator.clipboard.writeText(
                    pretext ?? "" + data.result.trim(),
                  );
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
          <div className="prose prose-slate !max-w-none whitespace-pre-line pr-8">
            <p className="p-4">
              {pretext ?? ""}
              {data.result?.trim()}
            </p>
          </div>
        </div>
      )}
      {/* <div className="h-10 grow" /> */}
    </div>
  );
}
