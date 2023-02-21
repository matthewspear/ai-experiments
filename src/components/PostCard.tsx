import { classNames } from "@/components/Layout";
import { type Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { type ReadTimeResults } from "reading-time";

export function PostCard(post: Post) {
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
        <p className="mt-3 w-full text-base text-gray-500 sm:w-[550px]">
          {post.summary}
        </p>
      </a>
      <div className="mt-6 flex items-center">
        <div className="flex-shrink-0">
          <a href={post.author}>
            <span className="sr-only">{post.author}</span>
            <Image
              width={40}
              height={40}
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
            <span>{(post.readingTime as ReadTimeResults).text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
