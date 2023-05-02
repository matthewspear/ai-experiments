import clsx from "clsx";
import { type PropsWithChildren } from "react";

export function ContentWrapper({
  className,
  children,
}: PropsWithChildren<{ className: string }>) {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="">
        <div className={clsx("mx-auto max-w-6xl", className)}>{children}</div>
      </div>
    </div>
  );
}
