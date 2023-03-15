import { Disclosure } from "@headlessui/react";
import { ArrowDownTrayIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { type PropsWithChildren } from "react";

export function DisplayBlock({
  title,
  children,
  download,
}: PropsWithChildren<{ title: string; download?: () => void }>) {
  return (
    <div className="w-full sm:w-[700px]">
      <div className="mx-auto w-full rounded-2xl">
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="focus-visiable:ring-indigo-500 flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                <span>{title}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-indigo-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="relative whitespace-pre-line px-4 pt-4 pb-2 font-mono text-sm text-gray-500">
                {download && children && (
                  <button
                    className="focus-visiable:ring-indigo-500 absolute right-0  bottom-0 m-[2px] grid h-8 w-8 place-items-center justify-center rounded-full hover:bg-slate-200 focus:outline-none"
                    aria-label="Download copy"
                    onClick={download}
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 text-gray-400" />
                  </button>
                )}
                {children}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
