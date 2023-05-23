import Head from "next/head";

export default function Metatags({
  title,
  description,
  url, // image,
}:
{
  title?: string;
  description: string;
  url: string;
  // image?: string;
}) {
  const fullTitle = title ? `${title} | AI Experiments` : "AI Experiments";
  return (
    <Head>
      {/* HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={"/card.png"} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="aiexperiments.co" />
      <meta name="twitter:site" content="@matthew_spear" />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={"/card.png"} />
    </Head>
  );
}
