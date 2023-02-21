import Link from "next/link";
import Image from "next/image";
import { ExperimentCard } from "@/components/ExperimentCard";
import { experiments } from "./Experiments";

const CustomLink = (props: any): JSX.Element => {
  const href: string = props.href;

  const isInternalLink =
    href !== undefined && (href.startsWith("/") || href?.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props: any): JSX.Element {
  return (
    <Image
      alt={props.alt}
      className="rounded-lg"
      {...props}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
}

function ExperimentLink(props: any): JSX.Element {
  const e = experiments.find((experiment) => experiment.url == props.url);
  if (!e) return <></>;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ExperimentCard experiment={e} />
    </div>
  );
}

function Divider(props: any): JSX.Element {
  return <hr className="w-full px-4" />;
}

const MDXComponents = {
  RoundedImage,
  Image,
  a: CustomLink,
  ExperimentLink,
  Divider,
};

export default MDXComponents;
