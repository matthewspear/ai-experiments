import { type Dispatch, type SetStateAction } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { type NextRouter } from "next/router";
import { type Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { navigationItems } from "./Navigation";
import clsx from "clsx";

export function DesktopSideBar({
  setSidebarOpen,
  session,
  router,
}: {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
  router: NextRouter;
}) {
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
        <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            {/* <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <Link href="/">
              <h1 className="font-bold text-slate-900">AI Experiments</h1>
            </Link>
          </div>
          <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
            {navigationItems.map((item, index) => (
              <div key={item.name + index.toString()}>
                {item.divider && (
                  <div className="flex items-center px-2 py-2">
                    <hr className="w-full" />
                  </div>
                )}
                {!item.divider && (
                  <Link
                    href={item.href}
                    target={item.openNewTab ? "_blank" : "_self"}
                    rel={item.openNewTab ? "noreferrer" : ""}
                    className={clsx(
                      router.asPath === item.href
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                    )}
                  >
                    <item.icon
                      className={clsx(
                        router.asPath === item.href
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 h-6 w-6 flex-shrink-0",
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
          <button
            className="group block w-full flex-shrink-0"
            onClick={async (): Promise<void> => {
              if (session) {
                await router.push("/profile");
              } else {
                await signIn("github");
              }
              setSidebarOpen(false);
            }}
          >
            <div className="flex items-center">
              <div>
                {session && (
                  <Image
                    src={session.user.image!}
                    alt="Profile picture for user"
                    className="inline-block h-9 w-9 rounded-full"
                    width={36}
                    height={36}
                    priority
                  />
                )}
                {!session && (
                  <UserCircleIcon className="inline-block h-9 w-9 text-slate-500" />
                )}
              </div>
              <div className="ml-3">
                {!session && (
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    User
                  </p>
                )}
                {session && (
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {session.user.name}
                  </p>
                )}
                {!session && (
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    Login
                  </p>
                )}
                {session && (
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    View profile
                  </p>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
