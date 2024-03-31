import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Fathom from "@/components/core/Fathom";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  metadataBase: new URL("https://aiexperiments.co"),
  title: {
    template: "%s | AI Experiments",
    default: "AI Experiments: Explore the possibilities of AI",
  },
  description:
    "AI Experiments is an interactive platform dedicated to showcasing the potential of AI. It provides demos, resources, and tutorials to help anyone experiment with AI and explore its possibilities.",
  image: "/card.png",
  type: "website",
  siteName: "AI Experiments",
  url: "https://aiexperiments.co",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="h-full">
        <body
          className={`h-full min-h-screen bg-slate-100 antialiased ${inter.variable}`}
        >
          <Fathom />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
