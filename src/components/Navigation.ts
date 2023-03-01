import {
  GlobeEuropeAfricaIcon,
  BookmarkIcon,
  NewspaperIcon,
  InboxIcon,
  InformationCircleIcon,
  Square3Stack3DIcon,
  PuzzlePieceIcon,
  ArrowsPointingInIcon,
  ChatBubbleBottomCenterTextIcon,
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
  {
    name: "Journal Prompt",
    href: "/journal-prompt",
    icon: BookmarkIcon,
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
  {
    name: "Explain Like I Am 5",
    href: "/eli5",
    icon: PuzzlePieceIcon,
  },
  {
    name: "Summary",
    href: "/summary",
    icon: ArrowsPointingInIcon,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  // {
  //   name: "Expander",
  //   href: "/expand",
  //   icon: ArrowsPointingOutIcon,
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
