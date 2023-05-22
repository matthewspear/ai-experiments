import { TopLevelBreadcrumb } from "@/components/BreadcrumbBar";
import Layout from "@/components/Layout";
import { type Changelog, allChangelogs } from "contentlayer/generated";
import { compareDesc, isValid, parse } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import components from "@/components/MDXComponents";
import { useEffect, useRef, useState } from "react";
import { Timeline } from "@/components/Timeline";
import { ContentWrapper } from "@/components/ContentWrapper";
import { ArticleHeader } from "@/components/ArticleHeader";

function isValidDate(input: string) {
  const date = parse(input, "yyyy-MM-dd", new Date());
  return isValid(date);
}

export function getStaticProps() {
  const changelogs = allChangelogs
    .filter((c) => isValidDate(c.filename))
    .sort((a, b) => {
      return compareDesc(new Date(a.filename), new Date(b.filename));
    });

  return { props: { changelogs } };
}

function Entry({ changelog }: { changelog: Changelog }) {
  const heightRef = useRef<HTMLDivElement | null>(null);
  const [heightAdjustment, setHeightAdjustment] = useState(0);

  useEffect(() => {
    const observer = new window.ResizeObserver(() => {
      const height = heightRef?.current?.getBoundingClientRect().height;
      if (height) {
        const nextMultipleOf8 = 8 * Math.ceil(height / 8);
        setHeightAdjustment(nextMultipleOf8 - height);
      }
    });

    if (heightRef.current) {
      observer.observe(heightRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const MDXContent = useMDXComponent(changelog?.body.code ?? "");

  return (
    <article
      id={changelog.filename}
      className="scroll-mt-16"
      style={{ paddingBottom: `${heightAdjustment}px` }}
    >
      <div ref={heightRef}>
        <ArticleHeader
          id={changelog.filename}
          date={new Date(changelog.filename)}
        />
        <ContentWrapper className="">
          <a className="mt-4 block">
            <p className="text-xl font-semibold text-gray-900">
              {changelog.title}
            </p>
            <p className="prose prose-slate mt-3">
              <MDXContent components={components} />
            </p>
          </a>
        </ContentWrapper>
      </div>
    </article>
  );
}

const ChangelogPage = ({ changelogs }: { changelogs: Changelog[] }) => {
  return (
    <Layout
      title="Changelog"
      description="Changelog page for AI experiments, detailing the addition of new experiments, updates to existing ones, and enhancement of resources over time. This page offers a comprehensive, chronological record of all changes and improvements made, providing an in-depth understanding of the ongoing development in AI experimentation. It is a valuable source for those interested in tracking the progression and advancements in AI experimentation."
      breadcrumbs={TopLevelBreadcrumb("Changelog", "/changelog")}
    >
      <div className="relative mt-4 flex-auto">
        <Timeline />
        <main className="space-y-20 py-20">
          {changelogs.map((changelog, idx) => (
            <Entry key={idx} changelog={changelog} />
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default ChangelogPage;
