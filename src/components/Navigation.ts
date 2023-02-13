import {
  HomeIcon,
  RocketLaunchIcon,
  TagIcon,
  LinkIcon,
  GlobeEuropeAfricaIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  PuzzlePieceIcon,
  ArrowsRightLeftIcon,
  PencilSquareIcon,
  QueueListIcon,
  BookmarkIcon,
  NewspaperIcon,
  InboxIcon,
  InformationCircleIcon,
  BeakerIcon,
  Square2StackIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

export const navigationItems = [
  // {
  //   name: "Home",
  //   href: "/",
  //   icon: HomeIcon,
  // },
  {
    name: "Experiments",
    href: "/experiments",
    icon: Square3Stack3DIcon,
  },
  {
    divider: true,
    name: "",
    href: "",
    icon: () => null,
  },
  // {
  //   name: "Startup Name Generator",
  //   href: "/startup-generator",
  //   icon: RocketLaunchIcon,
  // },
  // {
  //   name: "Tagline Generator",
  //   href: "/tagline-generator",
  //   icon: TagIcon,
  // },
  // {
  //   name: "URL Generator",
  //   href: "/url-generator",
  //   icon: LinkIcon,
  // },
  {
    name: "Holiday Destination",
    href: "/holiday-destination",
    icon: GlobeEuropeAfricaIcon,
  },
  // // {
  // //   name: "Summary",
  // //   href: "/summary",
  // //   icon: ArrowsPointingInIcon,
  // // },
  // // {
  // //   name: "Expander",
  // //   href: "/expand",
  // //   icon: ArrowsPointingOutIcon,
  // // },
  // {
  //   name: "Explain Like I Am 5",
  //   href: "/eli5",
  //   icon: PuzzlePieceIcon,
  // },
  // {
  //   name: "This or That",
  //   href: "/this-that",
  //   icon: ArrowsRightLeftIcon,
  // },
  // {
  //   name: "Planner",
  //   href: "/planner",
  //   icon: PencilSquareIcon,
  // },
  // {
  //   name: "First Step",
  //   href: "/first-step",
  //   icon: QueueListIcon,
  // },
  {
    name: "Journal Prompt",
    href: "/journal-prompt",
    icon: BookmarkIcon,
  },
  {
    divider: true,
    name: "",
    href: "",
    icon: () => null,
  },
  {
    name: "Blog",
    href: "/blog",
    icon: NewspaperIcon,
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
