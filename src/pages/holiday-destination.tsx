import { type NextPage } from "next";

import Layout from "@/components/Layout";
import { api } from "@/utils/api";
import { type FormEvent, useState, useEffect } from "react";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";
import { ResultsBlock } from "@/components/ResultsBlock";
import { Summary } from "@/components/Summary";
import DropdownBlocks from "@/components/DropdownBlocks";

interface HolidayForm {
  continent: string;
  length: string;
  likes: string[];
}

const Holiday: NextPage = () => {
  const promptMutation = api.ai.prompt.useMutation();

  const [latestPrompt, setLatestPrompt] = useState<string>("");

  const [form, setForm] = useState<HolidayForm>({
    continent: "Europe",
    length: "1 Week",
    likes: [],
  });

  const [temperature, setTemperature] = useState(0.7);

  const generatePrompt = (form: HolidayForm) => {
    const fullPrompt = `Pick me a holiday destination in ${
      form.continent
    } for ${form.length.toLowerCase()}.
    I like ${form.likes.join(", ")}
    
    Destination`;
    setLatestPrompt(fullPrompt);
    return fullPrompt;
  };

  useEffect(() => {
    generatePrompt(form);
  }, [form]);

  const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    promptMutation.mutate({
      text: generatePrompt(form),
      temperature: temperature,
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

  return (
    <Layout
      breadcrumbs={ExperimentsLevelBreadcrumbs(
        "Holiday Destination",
        "/holiday-destination"
      )}
    >
      <div className="flex w-full flex-col gap-4">
        <Summary title="Holiday Destination">
          <p>
            Fill out your critera for the perfect holiday and AI will generate
            you a destination:
          </p>
        </Summary>
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
              <Tickbox label="Luxury" value="luxury" />
            </div>
          </div>
        </div>
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
        <DropdownBlocks
          prompt={latestPrompt}
          result={promptMutation.data?.result ?? ""}
          temperature={temperature}
          setTemperature={setTemperature}
        />
        <ResultsBlock
          isLoading={promptMutation.isLoading}
          data={promptMutation.data}
        />
      </div>
    </Layout>
  );
};

export default Holiday;
