import { type NextPage } from "next";

import Layout from "@/components/Layout";
import { api } from "@/utils/api";
import { Loader } from "@/components/Loader";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import { type FormEvent, useState } from "react";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";

interface HolidayForm {
  continent: string;
  length: string;
  likes: string[];
  randomness: number;
}

const Planner: NextPage = () => {
  const promptMutation = api.ai.prompt.useMutation();

  const [form, setForm] = useState<HolidayForm>({
    continent: "Europe",
    length: "1 Week",
    likes: [],
    randomness: 0.7,
  });

  const generatePrompt = () => {
    const fullPrompt = `Pick me a holiday destination in ${
      form.continent
    } for ${form.length.toLowerCase()}.
    I like ${form.likes.join(", ")}
    \n\n
    Destination`;
    return fullPrompt;
  };

  const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    promptMutation.mutate({
      text: generatePrompt(),
      temperature: form.randomness,
      task: "holiday-destination",
    });
  };

  function Tickbox({ label, value }: { label: string; value: string }) {
    return (
      <div className="relative flex w-[150px] pt-4">
        <div className="flex h-5 items-center">
          <input
            id={value}
            aria-describedby="comments-description"
            name={value}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            checked={form.likes.includes(value)}
            onChange={(e) => {
              if (form.likes.includes(value)) {
                setForm({
                  ...form,
                  likes: form.likes.filter((like) => like !== value),
                });
                e.target.checked = false;
              } else {
                setForm({
                  ...form,
                  likes: form.likes.concat([value]),
                });
                e.target.checked = true;
              }
            }}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="comments" className="font-medium text-gray-700">
            {label}
          </label>
        </div>
      </div>
    );
  }

  const breadcrumbs = [{ name: "Experiments", href: "", current: false }];

  return (
    <Layout
      // title="Holiday Destination"
      breadcrumbs={ExperimentsLevelBreadcrumbs(
        "Holiday Destination",
        "/holiday-destination"
      )}
    >
      <div className="flex w-full flex-col gap-4">
        {/* <ComingSoon /> */}
        <div className="flex flex-wrap gap-4">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Continent
            </label>
            <select
              id="location"
              name="location"
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue="Europe"
              value={form.continent}
              onChange={(e) => setForm({ ...form, continent: e.target.value })}
            >
              <option>North America</option>
              <option>South America</option>
              <option>Europe</option>
              <option>Africa</option>
              <option>Asia</option>
              <option>Oceania</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Length
            </label>
            <select
              id="location"
              name="location"
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue="1 Week"
              value={form.length}
              onChange={(e) => setForm({ ...form, length: e.target.value })}
            >
              <option>Long Weekend</option>
              <option>1 Week</option>
              <option>2 Weeks</option>
              <option>1 Month</option>
              <option>1 Year</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Likes
            </label>

            <div className="grid grid-cols-3">
              <Tickbox label="City" value="cities" />
              <Tickbox label="Nature" value="nature" />
              <Tickbox label="Adventure" value="adventure" />
              <Tickbox label="Beach" value="beach" />
              <Tickbox label="Culture" value="culture" />
              <Tickbox label="Nightlife" value="nightlife" />
              <Tickbox label="Coffee" value="coffee shops" />
              <Tickbox label="Cheap" value="cheap" />
              <Tickbox label="Expensive" value="expensive" />
            </div>
          </div>
        </div>
        {/* <div className="flex w-full flex-wrap gap-4">
          <div className="w-full sm:w-[400px]">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Randomness
            </label>
            <input
              id="myRange"
              className="range w-full p-4 accent-indigo-500"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={form.randomness}
              onChange={(e) => {
                setForm({ ...form, randomness: parseFloat(e.target.value) });
              }}
            ></input>
            <p>{(form.randomness * 100).toFixed(0)}%</p>
          </div>
        </div> */}

        <hr />

        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={(e) => onSubmit(e)}
            className="inline-flex w-min items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Try
          </button>
        </div>
        <div className="flex h-full flex-col">
          {promptMutation.isLoading && <Loader />}
          {promptMutation.data && promptMutation.data.error && (
            <div className="mt-8 flex w-full flex-row place-items-center items-center rounded-lg bg-white shadow-lg sm:w-[700px]">
              <ExclamationCircleIcon className="my-4 mr-4 ml-4 h-6 w-6 text-red-500" />
              <p className="h-6">
                {(promptMutation.data.error &&
                  promptMutation.data.error.message) ||
                  JSON.stringify(promptMutation.data.error)}
              </p>
            </div>
          )}
          {!promptMutation.isLoading &&
            promptMutation.data &&
            !promptMutation.data.error && (
              <div className=" mt-8 grid w-full place-items-center rounded-lg bg-white shadow-lg sm:w-[700px]">
                <div className="prose prose-slate">
                  <p className="p-4">{promptMutation.data.result}</p>
                </div>
              </div>
            )}
          <div className="h-10 grow" />
        </div>
      </div>
    </Layout>
  );
};

export default Planner;
