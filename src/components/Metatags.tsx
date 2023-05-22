import Head from "next/head";

export default function Metatags({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  const fullTitle = title ? `${title} | AI Experiments` : "AI Experiments";
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@matthew_spear" />
      <meta name="twitter: title" content={title} />
      <meta name="twitter: description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
