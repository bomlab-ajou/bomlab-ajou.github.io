import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { DraftBanner } from "@/components/draft-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import { previewImage, sharedOpenGraph, siteTitle } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: siteTitle,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  // No canonical URL or og:url here. This layout wraps every route, including
  // the 404 page, and pages inherit whatever it sets; each page declares its
  // own through `pageMetadata` instead.
  openGraph: {
    ...sharedOpenGraph,
    title: siteTitle,
    description: site.description,
  },
  // X falls back to og:image, but naming the image here keeps it independent of that.
  twitter: { card: "summary_large_image", images: [previewImage] },
};

/**
 * Applies the stored theme before the first paint so there is no flash of the
 * wrong colours. Kept inline and tiny on purpose.
 */
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Skip to content
        </a>
        <DraftBanner />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
