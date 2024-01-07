import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jotion",
  description:
    "The connected workspace where better products are built together",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        href: "./logo-dark.svg",
        url: "./logo-dark.svg",
      },
      {
        media: "(prefers-color-scheme: light)",
        href: "./logo.svg",
        url: "./logo.svg",
      },
    ],
  },
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
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
