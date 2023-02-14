import { type NextPage } from "next";

import Layout from "@/components/Layout";
import { TopLevelBreadcrumb } from "@/components/BreadcrumbBar";
import Image from "next/image";
import { format, parseISO } from "date-fns";

const About: NextPage = () => {
  const publishedAt = "2022-02-14";

  return (
    <Layout breadcrumbs={TopLevelBreadcrumb("About", "/about")}>
      <div className="mx-auto max-w-3xl">
        <article className="mx-auto mb-16 flex w-full flex-col items-start justify-center px-4 pt-8 sm:px-0">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-black sm:text-4xl">
            About
          </h1>
          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0">
              <span className="sr-only">Matt Spear</span>
              <Image
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
                src="/profile.png"
                alt="Author profile picture for Matt Spear"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Matt Spear</p>
              <div className="flex space-x-1 text-sm text-gray-500">
                <time dateTime={publishedAt}>
                  {format(parseISO(publishedAt), "LLLL d, yyyy")}
                </time>
                {/* <span aria-hidden="true">&middot;</span> */}
                {/* <span>{post.readingTime.text}</span> */}
              </div>
            </div>
          </div>

          <div className="prose prose-lg prose-slate mt-8 w-full">
            <p>
              👋 Hi, I'm{" "}
              <a href="https://mattspear.co" target="_blank" rel="noreferrer">
                Matt Spear
              </a>
              . I'm a freelance software engineer and for the last decade I've
              been facinated with technology, building with it and learning from
              it.
            </p>
            <p>
              Since learning to program AI, Deep Learning, ML has always been an
              illusive interest. I've spent time in the AR space, on SLAM
              systems and working with CoreML, Apple's ML framework. But{" "}
              <a href="https://fast.ai" target="_blank" rel="noreferrer">
                Fast.ai
              </a>{" "}
              and the "Deep Learning for Coders" course was my first real
              introduction to everyday coders working on cutting edge ML. Jeremy
              Howard is a legend and who doesn't love the tagline "Making neural
              nets uncool again".
            </p>
            <p>
              The good news is I still feel like a beginner and this site is a
              result of wanting to learn, share and try something new. I'm eagar
              to build a SaaS business / App / Startup and I want to take you
              with me along the way! In the coming weeks I plan on starting a
              YouTube channel and creating some video content and building out
              usecases, tutorials and examples.
            </p>
            <p>
              Thanks,
              <br />
              Matt
            </p>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default About;
