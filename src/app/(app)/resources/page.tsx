import { type Metadata, type NextPage } from "next";
import { Section } from "./Section";
import { ResourceItem } from "./ResourceItem";
import { Summary } from "@/components/summary";
import { allSections, resources } from "./resources";
import { buttonVariants } from "@/components/ui/button";
import { BreadcrumbBuilder } from "@/components/breadcrumb-builder";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Discover the 'Resources' page, a comprehensive repository of tools, learning materials, and thought-provoking content to deepen your understanding of AI and Machine Learning. Here, you'll find resources ranging from OpenAI's API documentation, comparison tools, and the latest research papers to insightful YouTube channels and in-depth courses. Whether you're a beginner or an advanced learner, this page serves as a valuable reference for all things AI.",
};

const Resources: NextPage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <BreadcrumbBuilder page="Resources" />
      <Summary title="Resources">
        <div className="flex gap-2 rounded-lg border bg-white px-2 shadow-sm">
          {allSections.map((section) => (
            <a
              key={section}
              href={`#${section.replace(" ", "%20")}`}
              className={buttonVariants({ variant: "link" })}
            >
              {section}
            </a>
          ))}
        </div>
      </Summary>

      {allSections.map((section) => (
        <Section key={section} title={section}>
          {resources
            .filter((r) => r.section === section)
            .map((r) => (
              <ResourceItem key={r.url} {...r} />
            ))}
        </Section>
      ))}
    </div>
  );
};

export default Resources;
