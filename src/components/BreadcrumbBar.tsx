import { HomeIcon } from "@heroicons/react/20/solid";
import { type Breadcrumb } from "./Layout";
import Link from "next/link";

export function TopLevelBreadcrumb(name: string, href: string) {
  return [
    {
      name: name,
      href: href,
      current: true,
    },
  ];
}

export function BlogLevelBreadcrumbs(name: string, href: string) {
  return [
    { name: "Blog", href: "/blog", current: false },
    { name: name, href: href, current: true },
  ];
}

export function ExperimentsLevelBreadcrumbs(name: string, href: string) {
  return [
    { name: "Experiments", href: "/experiments", current: false },
    { name: name, href: href, current: true },
  ];
}

export function BreadcrumbBar({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <nav className="flex py-6" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {breadcrumbs.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
