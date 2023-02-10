import {
  type Dispatch,
  Fragment,
  type SetStateAction,
  useState,
  type PropsWithChildren,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowsRightLeftIcon,
  Bars3Icon,
  BookmarkIcon,
  GlobeEuropeAfricaIcon,
  HomeIcon,
  InboxIcon,
  InformationCircleIcon,
  LinkIcon,
  PencilSquareIcon,
  PuzzlePieceIcon,
  QueueListIcon,
  RocketLaunchIcon,
  TagIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import { type NextRouter, useRouter } from "next/router";
import Head from "next/head";
import { type Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import Metatags from "./Metatags";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Startup Name Generator",
    href: "/startup-generator",
    icon: RocketLaunchIcon,
  },
  {
    name: "Tagline Generator",
    href: "/tagline-generator",
    icon: TagIcon,
  },
  {
    name: "URL Generator",
    href: "/url-generator",
    icon: LinkIcon,
  },
  {
    name: "Holiday Destination",
    href: "/holiday-destination",
    icon: GlobeEuropeAfricaIcon,
  },
  {
    name: "Summary",
    href: "/summary",
    icon: ArrowsPointingInIcon,
  },
  {
    name: "Expander",
    href: "/expand",
    icon: ArrowsPointingOutIcon,
  },
  {
    name: "Explain Like I Am 5",
    href: "/eli5",
    icon: PuzzlePieceIcon,
  },
  {
    name: "This or That",
    href: "/this-that",
    icon: ArrowsRightLeftIcon,
  },
  {
    name: "Planner",
    href: "/planner",
    icon: PencilSquareIcon,
  },
  {
    name: "First Step",
    href: "/first-step",
    icon: QueueListIcon,
  },
  {
    name: "Journal Prompt",
    href: "/journal-prompt",
    icon: BookmarkIcon,
  },
  {
    name: "Resources",
    href: "/resources",
    icon: InboxIcon,
  },
  {
    name: "About",
    href: "/about",
    icon: InformationCircleIcon,
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function MobileSidebar({
  sidebarOpen,
  setSidebarOpen,
  session,
  router,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
  router: NextRouter;
}) {
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
                <div className="absolute top-0 right-0 -mr-12 pt-2">
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
              <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  /> */}
                  <h1 className="text-lg font-bold text-slate-900">
                    OpenAI Experiments
                  </h1>
                </div>
                <nav className="mt-5 space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        router.asPath === item.href
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          router.asPath === item.href
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-4 h-6 w-6 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                <a
                  onClick={async () => {
                    if (session) {
                      await router.push("/profile");
                    } else {
                      await signIn("github");
                    }
                    setSidebarOpen(false);
                  }}
                  className="group block flex-shrink-0"
                >
                  <div className="flex items-center">
                    <div>
                      {session && (
                        <Image
                          src={session.user.image as string}
                          alt="Profile picture for user"
                          className="inline-block h-10 w-10 rounded-full"
                          width={40}
                          height={40}
                        />
                      )}
                      {!session && (
                        <UserCircleIcon className="inline-block h-10 w-10 text-slate-500" />
                      )}
                    </div>
                    <div className="ml-3">
                      {!session && (
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                          User
                        </p>
                      )}
                      {session && (
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                          {session.user.name}
                        </p>
                      )}
                      {!session && (
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                          Login
                        </p>
                      )}
                      {session && (
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                          View profile
                        </p>
                      )}
                    </div>
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

function DesktopSideBar({
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
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            {/* <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h1 className="font-bold text-slate-900">OpenAI Experiments</h1>
          </div>
          <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  router.asPath === item.href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                )}
              >
                <item.icon
                  className={classNames(
                    router.asPath === item.href
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 h-6 w-6 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
          <button
            className="group block w-full flex-shrink-0"
            onClick={async () => {
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
                    src={session.user.image as string}
                    alt="Profile picture for user"
                    className="inline-block h-9 w-9 rounded-full"
                    width={36}
                    height={36}
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

export default function Layout(props: PropsWithChildren<{ title?: string }>) {
  const { title, children } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const fullTitle = title
    ? `${title} | OpenAI Experiments`
    : "OpenAI Experiments";

  return (
    <>
      <Metatags title={fullTitle} description={""} image={""} />
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

        <div className="flex flex-1 flex-col md:pl-64">
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
            <div className="py-6">
              {title && (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {title}
                  </h1>
                </div>
              )}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="flex flex-col py-4">
                  {/* <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" /> */}
                  {children}
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
