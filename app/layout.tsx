import LandingPage from "@/components/core/landing/LandingPage";
import NavigationBar from "@/components/core/layout/NavigationBar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TraceEats",
  description: "Everything you need for smarter, safer food decisions.",
  icons: {
    icon: "/logo-green.svg",
  },
  openGraph: {
    title: "TraceEats",
    description:
      "Scan lot numbers, track food origins, get recall alerts, and join the food safety community — all in one app.",
    locale: "en_DZ",
    type: "website",
    url: "http://10.1.4.158:3000/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <TooltipProvider delayDuration={1000}>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Toaster />
            <SignedIn>
              <div>
                <NavigationBar />
              </div>
              <div className=" mt-24">{children}</div>
            </SignedIn>
            <SignedOut>
              <div>
                <NavigationBar isLanding />
              </div>
              <LandingPage />
              {/* <div className="  h-[30vh]" /> */}
              {/* <AuthenticationPage /> */}
            </SignedOut>
          </body>
        </TooltipProvider>
      </html>
    </ClerkProvider>
  );
}
