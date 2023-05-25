import clsx from "clsx";
import { links } from "./Links";
import Balancer from "react-wrap-balancer";

export function PostLink({ url }: { url: string }) {
  const data = links.find((link) => link.url === url);

  if (!data) {
    return (
      <a
        href={url}
        className="hover:opacity-90"
        target="_blank"
        rel="noreferrer noopener"
      >
        {url}
      </a>
    );
  }

  const { image, title, description, favicon, site, imageAlignment } = data;
  return (
    <a
      href={url}
      className="not-prose cursor-pointer no-underline hover:opacity-90"
      target="_blank"
      rel="noreferrer noopener"
    >
      <article className="relative isolate flex flex-col gap-8 pb-6 sm:flex-row sm:pb-0">
        {image && (
          <div className="relative aspect-[16/9] sm:aspect-[2/1] sm:w-64 sm:shrink-0">
            <img
              src={image}
              alt=""
              className={clsx(
                !imageAlignment ? "object-center" : "",
                imageAlignment === "left" ? "object-left" : "",
                imageAlignment === "right" ? "object-right" : "",
                imageAlignment === "center" ? "object-center" : "",
                "absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
              )}
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
        )}
        <div className="mx-0">
          {/* <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={post.datetime} className="text-gray-500">
            {post.date}
          </time>
          <a
            href={post.category.href}
            className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100"
          >
            {post.category.title}
          </a>
        </div> */}
          <div className="group relative max-w-xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 sm:mt-3">
              <span className="absolute inset-0" />
              <Balancer>{title}</Balancer>
            </h3>
            <p className="mt-5 line-clamp-2 text-sm leading-6 text-gray-600">
              {description}
            </p>
          </div>
          <div className="mb-3 flex pt-6">
            <div className="relative flex items-center gap-x-2">
              {favicon && favicon !== "undefined" && (
                <img
                  src={favicon}
                  alt="Favicon"
                  className="h-6 w-6 rounded-full bg-gray-50"
                />
              )}
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <span className="absolute inset-0" />
                  {site}
                </p>
                {/* <p className="text-gray-600">{post.author.role}</p> */}
              </div>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}
