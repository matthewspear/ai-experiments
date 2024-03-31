import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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

  return (
    <a href={url} target="_blank" rel="noreferrer noopener">
      <div className="flex flex-col gap-1 rounded-lg bg-white p-4 shadow-lg">
        <h3 className="font-bold">{title}</h3>
        <p>{description}</p>
        <pre className="truncate pt-2 font-mono text-[12px] underline">
          {url}
        </pre>
      </div>
    </a>
  );
}
