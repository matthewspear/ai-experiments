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
            {/* <MDXContent components={components} /> */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default About;
