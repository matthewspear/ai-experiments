// import { allPosts } from "contentlayer/generated";
import { writeFileSync } from "fs";
import RSS from "rss";
import allPosts from "../.contentlayer/generated/Post/_index.json" assert { type: "json" };

export const baseURL = "https://openai-experiment.vercel.app";

async function generate() {
  const feed = new RSS({
    title: "OpenAI Experiments",
    site_url: baseURL,
    feed_url: `${baseURL}/feed.xml`,
  });

  allPosts.map((post) => {
    feed.item({
      title: post.title,
      url: `${baseURL}/blog/${post.slug}`,
      date: post.publishedAt,
      description: post.summary,
    });
  });

  writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}

generate();
