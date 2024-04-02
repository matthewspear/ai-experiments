"use client";

import Link from "next/link";
import { navigationItems } from "@/data/navigation";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { useAtom } from "jotai";
import ProfileButton from "../profile-button";
import { sidebar } from "./atom";
import { Credits } from "./Credits";

export function DesktopSidebar() {
  const pathname = usePathname();
  const [, setSidebarOpen] = useAtom(sidebar);
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
                      pathname === item.href
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                    )}
                  >
                    <item.icon
                      className={clsx(
                        pathname === item.href
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
        <Credits />
        <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
          <button
            className="group block w-full flex-shrink-0"
            onClick={async (): Promise<void> => {
              // if (session) {
              //   await router.push("/profile");
              // } else {
              //   await signIn("github");
              // }
              setSidebarOpen(false);
            }}
          >
            <div className="flex items-center">
              <ProfileButton />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
