import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Loader } from "@/components/Loader";
import { useState } from "react";

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
        <div className="mt-8 flex w-full flex-row place-items-center items-center rounded-lg bg-white shadow-lg sm:w-[700px]">
          <ExclamationCircleIcon className="my-4 ml-4 mr-4 h-6 w-6 text-red-500" />
          <p className="break-words">
            {data.error?.message || JSON.stringify(data.error)}
          </p>
        </div>
      )}
      {!isLoading && data && !data.error && (
        <div className="relative mt-8 grid w-full place-items-center rounded-lg bg-white shadow-lg sm:w-[700px]">
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
          <div className="prose prose-slate whitespace-pre-line">
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
