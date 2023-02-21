import { useState, type PropsWithChildren } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Metatags from "./Metatags";
import { MobileSidebar } from "./MobileSidebar";
import { DesktopSideBar } from "./DesktopSideBar";
import type { Post } from "contentlayer/generated";
import { BreadcrumbBar } from "./BreadcrumbBar";
import Footer from "./Footer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export interface Breadcrumb {
  name: string;
  href: string;
  current: boolean;
}

export default function Layout(
  props: PropsWithChildren<{
    title?: string;
    post?: Post;
    breadcrumbs?: Breadcrumb[];
  }>
) {
  const { title, post, breadcrumbs, children } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const fullTitle = title
    ? `${title} | OpenAI Experiments`
    : "OpenAI Experiments";

  return (
    <>
      <Metatags
        title={post?.title ? post.title : fullTitle}
        description={post?.summary || ""}
        image=""
      />
      <div>
        {/* Sidebar for mobile */}
        <MobileSidebar
          session={session}
          router={router}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Static sidebar for desktop */}
        <DesktopSideBar
          session={session}
          router={router}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex min-h-screen flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <main className="flex-1">
            <div className="">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="flex flex-col py-4">
                  {/* <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" /> */}
                  {breadcrumbs && <BreadcrumbBar breadcrumbs={breadcrumbs} />}
                  <div>
                    {title && (
                      <div className="max-w-7xl pt-4 sm:px-6 md:px-8">
                        <h1 className="text-2xl font-semibold text-gray-900">
                          {title}
                        </h1>
                      </div>
                    )}
                  </div>
                  {children}
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>

          <div className="flex grow" />
          <Footer />
        </div>
      </div>
    </>
  );
}
