"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { navigationItems } from "@/data/navigation";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { sidebar } from "./atom";
import ProfileButton from "../profile-button";
import { Credits } from "./Credits";

export function MobileSidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebar);

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 md:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute right-0 top-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => void setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="h-0 flex-1 overflow-y-auto pb-4 pt-5">
                <div className="flex flex-shrink-0 items-center px-4">
                  {/* <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
                  <Link href="/">
                    <h1 className="text-lg font-bold text-slate-900">
                      AI Experiments
                    </h1>
                  </Link>
                </div>
                <nav className="mt-5 space-y-1 px-2">
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
                            "group flex items-center rounded-md px-2 py-2 text-base font-medium",
                          )}
                        >
                          <item.icon
                            className={clsx(
                              pathname === item.href
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 h-6 w-6 flex-shrink-0",
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
                <a
                  onClick={async () => {
                    // if (session) {
                    //   await router.push("/profile");
                    // } else {
                    //   await signIn("github");
                    // }
                    setSidebarOpen(false);
                  }}
                  className="group block flex-shrink-0"
                >
                  <div className="flex items-center">
                    <ProfileButton />
                  </div>
                </a>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
