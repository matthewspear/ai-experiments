import { TopLevelBreadcrumb } from "@/components/BreadcrumbBar";
import Layout, { classNames } from "@/components/Layout";
import { Post, allPosts } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import Link from "next/link";

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
  });
  return { props: { posts } };
}

function PostCard(post: Post) {
  return (
    <div key={post.title}>
      <div>
        <a href={post.category} className="inline-block">
          <span
            className={classNames(
              post.category === "Feature"
                ? "bg-purple-100 text-purple-800"
                : "",
              post.category === "Article"
                ? "bg-indigo-100 text-indigo-800"
                : "",
              post.category === "Video" ? "bg-pink-100 text-pink-800" : "",
              post.category === "Tutorial" ? "bg-green-100 text-green-800" : "",
              post.category === "" ? "bg-gray-100 text-gray-800" : "",
              post.category === "" ? "bg-red-100 text-red-800" : "",
              post.category === "" ? "bg-yellow-100 text-yellow-800" : "",
              post.category === "" ? "bg-blue-100 text-blue-800" : "",
              "inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium"
            )}
          >
            {post.category}
          </span>
        </a>
      </div>
      <a href={post.url} className="mt-4 block">
        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
        <p className="mt-3 text-base text-gray-500">{post.summary}</p>
      </a>
      <div className="mt-6 flex items-center">
        <div className="flex-shrink-0">
          <a href={post.author}>
            <span className="sr-only">{post.author}</span>
            <img
              className="h-10 w-10 rounded-full"
              src={post.authorImage}
              alt=""
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
            <span>{post.readingTime.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const Blog = ({ posts }: { posts: Post[] }) => {
  return (
    <Layout breadcrumbs={TopLevelBreadcrumb("Blog", "/blog")}>
      {/* <div className="mx-auto flex flex-col"> */}
      <div className="relative mx-auto divide-y-2 divide-gray-200">
        {/* <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Blog
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat
            massa dictumst amet. Sapien tortor lacus arcu.
          </p>
        </div> */}
        <div className="grid gap-16 pt-12">
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
