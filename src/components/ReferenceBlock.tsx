import { Disclosure } from "@headlessui/react";
import { ArrowUpRightIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface Reference {
  title: string;
  url: string;
}

export function ReferenceBlock({ references }: { references: Reference[] }) {
  return (
    <div className="w-full sm:w-[700px]">
      <div className="mx-auto w-full rounded-2xl">
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                <span>References</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-indigo-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="flex w-full flex-wrap gap-4">
                  <div className="flex w-full flex-col gap-2">
                    {references.map((reference, index) => {
                      return (
                        <a
                          href={reference.url}
                          target="_blank"
                          rel="noreferrer"
                          key={index}
                        >
                          <div className="group flex cursor-pointer items-center">
                            <p className="text-slate-500 group-hover:cursor-pointer group-hover:text-slate-600 group-hover:underline">
                              {reference.title}
                            </p>
                            <div className="grow" />
                            <ArrowUpRightIcon className="h-5 w-5 group-hover:cursor-pointer group-hover:text-slate-600" />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
