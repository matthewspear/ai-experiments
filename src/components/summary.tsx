import { type PropsWithChildren } from "react";

export function Summary(props: PropsWithChildren<{ title: string }>) {
  return (
    <>
      <div className="prose prose-lg prose-gray">
        <h3>{props.title}</h3>
      </div>
      {props.children}
    </>
  );
}
