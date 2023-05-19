import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";
import { baseURL } from "./generate-rss.mjs";

async function generate() {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");

  const pages = await globby([
    "src/pages/**/*.tsx",
    "data/posts/*.mdx",
    "!drafts/*.mdx",
    "!src/pages/_*.tsx",
    "!src/pages/**/[slug].tsx",
    "!src/pages/api",
    "!src/pages/404.tsx",
  ]);

  // console.log("paths:", pages);

  var processedURLs = pages
    .map((page) => {
      const path = page
        .replace("src/pages/", "")
        .replace("data/posts/", "blog/")
        .replace(".tsx", "")
        .replace(".mdx", "")
        .replace("index", "");

      return `${baseURL}/${path}`;
    })
    .map((url) => {
      return url.lastIndexOf("/") === url.length - 1 ? url.slice(0, -1) : url;
    });

  console.log("urls:", processedURLs);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${processedURLs
          .map((url) => {
            return `
              <url>
                  <loc>${url}</loc>
              </url>
            `;
          })
          .join("")}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  writeFileSync("public/sitemap.xml", formatted);
}

generate();
