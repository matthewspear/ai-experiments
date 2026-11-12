"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { sidebar } from "./atom";

export function SidebarButton() {
  // const [, setSidebarOpen] = usePersistentState<boolean>("showSidebar", false);
  const [, setSidebarOpen] = useAtom(sidebar);
  return (
    <div className="sticky top-0 z-10 bg-gray-100 pt-1 pl-1 sm:pt-3 sm:pl-3 md:hidden">
      <button
        type="button"
        className="-mt-0.5 -ml-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
