import {
  InboxIcon,
  Square3Stack3DIcon,
  FaceSmileIcon,
  RectangleStackIcon,
  CurrencyDollarIcon,
  PuzzlePieceIcon,
  InformationCircleIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";

type Icon = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

export interface NavigationItem {
  name: string;
  href: string;
  icon: Icon | (() => null);
  divider?: boolean;
  openNewTab?: boolean;
}

export const navigationItems: NavigationItem[] = [
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
    name: "Vote",
    href: "/experiments/vote",
    icon: RectangleStackIcon,
  },
  {
    divider: true,
    name: "",
    href: "",
    icon: () => null,
  },
  {
    name: "Emoji Picker",
    href: "/emoji",
    icon: FaceSmileIcon,
  },
  {
    name: "Explain Like I Am 5",
    href: "/eli5",
    icon: PuzzlePieceIcon,
  },
  // {
  //   name: "AI Journalist",
  //   href: "/journalist",
  //   icon: PencilSquareIcon,
  // },
  // {
  //   name: "Journal Prompt",
  //   href: "/journal-prompt",
  //   icon: BookmarkIcon,
  // },
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
  // {
  //   name: "Holiday Destination",
  //   href: "/holiday-destination",
  //   icon: GlobeEuropeAfricaIcon,
  // },
  {
    name: "Summary",
    href: "/summary",
    icon: ArrowsPointingInIcon,
  },
  // {
  //   name: "Chat",
  //   href: "/chat",
  //   icon: ChatBubbleBottomCenterIcon,
  // },
  // {
  //   name: "Quick Question",
  //   href: "/question",
  //   icon: QuestionMarkCircleIcon,
  // },
  // {
  //   name: "Chat",
  //   href: "/chatgpt",
  //   icon: ChatBubbleBottomCenterTextIcon,
  // },
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
  // {
  //   divider: true,
  //   name: "",
  //   href: "",
  //   icon: () => null,
  // },
  // {
  //   name: "Peek: AI API Monitoring",
  //   href: "https://apps.apple.com/gb/app/peek-ai-api-monitoring/id6447682119?mt=12",
  //   icon: EyeIcon,
  //   openNewTab: true,
  // },
  {
    divider: true,
    name: "",
    href: "",
    icon: () => null,
  },
  // {
  //   name: "Blog",
  //   href: "/blog",
  //   icon: NewspaperIcon,
  // },
  // {
  //   name: "Changelog",
  //   href: "/changelog",
  //   icon: ArrowPathRoundedSquareIcon,
  // },
  {
    name: "Pricing Tracker",
    href: "/resources/pricing",
    icon: CurrencyDollarIcon,
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
