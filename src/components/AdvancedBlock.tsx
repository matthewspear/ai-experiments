import type { Dispatch, SetStateAction } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export function AdvancedBlock({
  temperature,
  setTemperature,
}: {
  temperature: number;
  setTemperature: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="w-full sm:w-[700px]">
      <div className="mx-auto w-full rounded-2xl">
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                <span>Advanced Parameters</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-indigo-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="flex w-full flex-wrap gap-4">
                  <div className="w-full sm:w-[400px]">
                    <label
                      htmlFor="temperature"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Temperature
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        id="temperature"
                        className="range w-full p-2 accent-indigo-500"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={temperature}
                        onChange={(e) => {
                          setTemperature(parseFloat(e.target.value));
                        }}
                      ></input>
                      <p>{(temperature * 100).toFixed(0)}%</p>
                    </div>
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
