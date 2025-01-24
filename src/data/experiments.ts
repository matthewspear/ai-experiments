import {
  PuzzlePieceIcon,
  ArrowsPointingInIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";

export const colors: Record<
  string,
  { iconForeground: string; iconBackground: string }
> = {};

colors.teal = {
  iconForeground: "text-teal-700",
  iconBackground: "bg-teal-50",
};
colors.purple = {
  iconForeground: "text-purple-700",
  iconBackground: "bg-purple-50",
};
colors.sky = {
  iconForeground: "text-sky-700",
  iconBackground: "bg-sky-50",
};
colors.yellow = {
  iconForeground: "text-yellow-700",
  iconBackground: "bg-yellow-50",
};
colors.rose = {
  iconForeground: "text-rose-700",
  iconBackground: "bg-rose-50",
};
colors.indigo = {
  iconForeground: "text-indigo-700",
  iconBackground: "bg-indigo-50",
};

type Icon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>
>;

export interface Experiment {
  title: string;
  description: string;
  url: string;
  icon: Icon;
  color: "teal" | "purple" | "sky" | "yellow" | "rose" | "indigo";
  active: boolean;
}

export const experiments: Experiment[] = [
  {
    title: "Emoji Picker",
    description: `Generate emojis based on a prompt`,
    url: "/emoji",
    icon: FaceSmileIcon,
    color: "sky",
    active: true,
  },
  {
    title: "Explain Like I Am 5",
    description: `Explain a concept in simple terms, so that anyone can understand it`,
    url: "/eli5",
    icon: PuzzlePieceIcon,
    color: "indigo",
    active: true,
  },
  // {
  //   title: "Chat",
  //   description: `Talk to the AI and ask questions`,
  //   url: "/chatgpt",
  //   icon: ChatBubbleBottomCenterTextIcon,
  //   color: "sky",
  //   active: true,
  // },
  // {
  //   title: "Quick Question",
  //   description: `Ask a question and get an answer`,
  //   url: "/question",
  //   icon: QuestionMarkCircleIcon,
  //   color: "yellow",
  //   active: true,
  // },
  {
    title: "Summary",
    description: `Get a concise summary of any text that captures the key points`,
    url: "/summary",
    icon: ArrowsPointingInIcon,
    color: "rose",
    active: true,
  },
  // {
  //   title: "Startup Name Generator",
  //   description: `Generate a name for your startup / latest project`,
  //   url: "/startup-generator",
  //   icon: RocketLaunchIcon,
  //   color: "teal",
  //   active: false,
  // },
  // {
  //   title: "Tagline Generator",
  //   description: `Taglines, value propositions, and elevator pitches`,
  //   url: "/tagline-generator",
  //   icon: TagIcon,
  //   color: "rose",
  //   active: false,
  // },
  // {
  //   title: "URL Generator",
  //   description: `Generate and validate the latest domains based off your startup name or proposed field`,
  //   url: "/url-generator",
  //   icon: LinkIcon,
  //   color: "sky",
  //   active: false,
  // },
  // {
  //   title: "Holiday Destination",
  //   description: `Unsure where to go on your next holiday? Let the AI decide for you. Pick a continent, length and preferences and we'll give you a random destination.`,
  //   url: "/holiday-destination",
  //   icon: GlobeEuropeAfricaIcon,
  //   color: "teal",
  //   active: false,
  // },

  // {
  //   title: "Explain Like I Am 5",
  //   description: `Explain a concept in simple terms, so that anyone can understand it`,
  //   url: "/eli5",
  //   icon: PuzzlePieceIcon,
  //   color: "indigo",
  //   active: false,
  // },
  // {
  //   title: "Expander",
  //   description: `Expand a text`,
  //   url: "/expand",
  //   icon: ArrowsPointingOutIcon,
  //   color: "teal",
  //   active: false,
  // },
  // {
  //   title: "This or That",
  //   description: `Help making decisions`,
  //   url: "/this-that",
  //   icon: ArrowsRightLeftIcon,
  //   color: "teal",
  //   active: false,
  // },
  // {
  //   title: "Planner",
  //   description: `Help scheduling out your day / week`,
  //   url: "/planner",
  //   icon: PencilSquareIcon,
  //   color: "yellow",
  //   active: false,
  // },
  // {
  //   title: "First Step",
  //   description: `Break down big tasks by identifying the first step and where to start`,
  //   url: "/first-step",
  //   icon: QueueListIcon,
  //   color: "rose",
  //   active: false,
  // },
  // {
  //   title: "Journal Prompt",
  //   description: `Get inspired by customised journalling prompts generated just for you`,
  //   url: "/journal-prompt",
  //   icon: BookmarkIcon,
  //   color: "yellow",
  //   active: false,
  // },
];
