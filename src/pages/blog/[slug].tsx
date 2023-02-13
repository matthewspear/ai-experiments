import { GetStaticProps, InferGetStaticPropsType, type NextPage } from "next";

import Layout from "@/components/Layout";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Post, allPosts } from "contentlayer/generated";

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  return {
    props: {
      post,
    },
  };
}

const PostPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      {post && (
        <div className="flex w-full flex-col">
          <article className="mx-auto max-w-2xl py-16">
            <div className="mb-6 text-center">
              <Link href="/" legacyBehavior>
                <a className="text-center text-sm font-bold uppercase text-blue-700">
                  Home
                </a>
              </Link>
            </div>
            <div className="mb-6 text-center">
              <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
              <time dateTime={post.date} className="text-sm text-slate-600">
                {format(parseISO(post.date), "LLLL d, yyyy")}
              </time>
            </div>
            <div
              className="cl-post-body"
              dangerouslySetInnerHTML={{ __html: post.body.html }}
            />
          </article>
        </div>
      )}
    </Layout>
  );
};

export default PostPage;
