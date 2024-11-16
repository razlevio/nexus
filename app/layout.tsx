import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus",
  description:
    "The connected workspace where better products are built together",
  authors: [{ name: "Raz Levi", url: "https://razlevio.com" }],
  icons: {
    icon: [{ url: "/nexus-blackbg.png" }],
    shortcut: "/nexus-blackbg.png",
    apple: "/nexus-blackbg.png",
  },
  openGraph: {
    title: "Nexus",
    description:
      "The connected workspace where better products are built together",
    url: "https://neexus.vercel.app",
    siteName: "Nexus",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/nexus-blackbg.png",
        width: 1200,
        height: 630,
        alt: "Nexus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus",
    description:"The connected workspace where better products are built together",
    site: "@nexus",
    creator: "@nexus",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
  manifest: "https://neexus.vercel.app/app.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="jotion-theme"
            >
              <Toaster position="bottom-center" />
              <ModalProvider />
              {children}
              <Analytics />
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
