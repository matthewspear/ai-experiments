import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ResourceItem({
  title,
  author,
  description,
  url,
}: {
  title: string;
  author?: string;
  description: string;
  url: string;
}) {
  return (
    <a href={url} target="_blank" rel="noreferrer noopener">
      <Card className="mb-4 break-inside-avoid-column">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {author && <CardDescription>{author}</CardDescription>}
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
        <CardFooter>
          <pre className="truncate pt-2 font-mono text-[12px] underline">
            {url}
          </pre>
        </CardFooter>
      </Card>
    </a>
  );
}
