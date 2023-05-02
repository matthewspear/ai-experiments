import { useId } from "react";

export function Timeline() {
  const id = useId();

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <svg
        className="absolute left-[max(0px,calc(50%-38rem))] top-0 h-full w-1.5"
        aria-hidden="true"
      >
        <defs>
          <pattern id={id} width="6" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 0H6M0 8H6" className="stroke-sky-900/10" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
