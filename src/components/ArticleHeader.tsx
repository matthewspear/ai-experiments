import Link from "next/link";
import { ContentWrapper } from "./ContentWrapper";
import { FormattedDate } from "./FormattedDate";

export function ArticleHeader({ id, date }: { id: string; date: Date }) {
  return (
    <header className="relative mb-10">
      {/* Line dash */}
      <div className="pointer-events-none absolute left-[max(-0.5rem,calc(50%-38rem))] top-0 z-10 flex h-4 items-center justify-end gap-x-2">
        <div className="h-[0.0625rem] w-3.5 bg-gray-400" />
      </div>
      <ContentWrapper className="">
        <div className="flex">
          <Link href={`#${id}`} className="inline-flex">
            <FormattedDate date={date} />
          </Link>
        </div>
      </ContentWrapper>
    </header>
  );
}
