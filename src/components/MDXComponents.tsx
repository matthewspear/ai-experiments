import Link from "next/link";
import Image from "next/image";
import { ExperimentCard } from "@/components/ExperimentCard";
import { experiments } from "./Experiments";
import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { ChatGPTBadge, GPT3Badge, GPT4Badge } from "./Badges";

type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type CustomLinkProps = Omit<LinkProps, "ref">;

const CustomLink = (props: CustomLinkProps): JSX.Element => {
  const { href, ...rest } = { ...props };

  const isInternalLink =
    href !== undefined && (href.startsWith("/") || href?.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link {...rest} href={href}>
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

type ImageProps = DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

type CustomImageProps = Omit<ImageProps, "placeholder" | "ref">;

function RoundedImage(props: CustomImageProps): JSX.Element {
  const { src, height, width, ...rest } = props;
  return (
    <Image
      src={src || ""}
      width={Number(width)}
      height={Number(height)}
      alt={props.alt || ""}
      className="rounded-lg"
      {...rest}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
}

function ExperimentLink({ url }: { url: string }): JSX.Element {
  const e = experiments.find((experiment) => experiment.url == url);
  if (!e) return <></>;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ExperimentCard experiment={e} />
    </div>
  );
}

function Divider(): JSX.Element {
  return <hr className="w-full px-4" />;
}

const MDXComponents = {
  RoundedImage,
  Image,
  a: CustomLink,
  ExperimentLink,
  Divider,
  GPT3Badge,
  ChatGPTBadge,
  GPT4Badge,
};

export default MDXComponents;
