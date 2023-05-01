import { type InferGetStaticPropsType } from "next";

import Layout from "@/components/Layout";
import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import components from "@/components/MDXComponents";
import Image from "next/image";
import { BlogLevelBreadcrumbs } from "@/components/BreadcrumbBar";
import { type ReadTimeResults } from "reading-time";

export function getStaticPaths() {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps({ params }: { params: { slug: string } }) {
  const post = allPosts.find(
    (post) => post._raw.sourceFileName.replace(/\.mdx$/, "") === params.slug
  );
  return {
    props: {
      post,
    },
  };
}

export function getNumberWithOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"] as const;
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}

export function formatDate(value: string) {
  return `${getNumberWithOrdinal(parseInt(format(parseISO(value), "d")))}
  ${format(parseISO(value), " MMMM yyyy")}`;
}

function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const MDXContent = useMDXComponent(post?.body.code ?? "");

  return (
    <Layout
      breadcrumbs={BlogLevelBreadcrumbs(
        post?.breadcrumb ?? post?.title ?? "",
        post?.url ?? ""
      )}
    >
      <div className="mx-auto max-w-3xl">
        {post && (
          <article className="mx-auto mb-16 flex w-full flex-col items-start justify-center px-4 pt-8 sm:px-0">
            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-black sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <a href={post.author}>
                  <span className="sr-only">{post.author}</span>
                  <Image
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                    src={post.authorImage}
                    alt={`Author profile picture for ${post.author}`}
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  <a href={post.author}>{post.author}</a>
                </p>
                <div className="flex space-x-1 text-sm text-gray-500">
                  <time dateTime={post.publishedAt}>
                    {format(parseISO(post.publishedAt), "LLLL d, yyyy")}
                  </time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{(post.readingTime as ReadTimeResults).text}</span>
                </div>
              </div>
            </div>
            {/* <div className="mt-2 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
              <div className="flex items-center">
                <Image
                  alt="Matt Spear"
                  height={24}
                  width={24}
                  src={post.authorImage}
                  className="rounded-full"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
                <p className="ml-2 text-sm text-gray-700">
                  {post.author}
                  {": "}
                  {formatDate(post.publishedAt)}
                </p>
              </div>
              <p className="min-w-32 mt-2 text-sm text-slate-600 md:mt-0">
                {post.readingTime.text}
              </p>
            </div> */}
            <div className="prose prose-lg prose-slate mt-8 w-full">
              <MDXContent components={components} />
            </div>
          </article>
        )}
      </div>
    </Layout>
  );
}

export default PostPage;
