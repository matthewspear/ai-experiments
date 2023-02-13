import Link from "next/link";
import Image from "next/image";

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

const MDXComponents = {
  Image: RoundedImage,
  a: CustomLink,
};

export default MDXComponents;
