import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import ThemeProvider from "@/components/ThemeProvider";

const sans = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jbmono", subsets: ["latin"] });
const display = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dennys — Software Engineer",
  description:
    "Dennys is a software engineer who builds with AI and understands what's under it. Self-taught → Pursuit → CUNY SPS, shipping real projects the whole way.",
  openGraph: {
    title: "Dennys — Software Engineer",
    description:
      "I build with AI. I understand what's under it. Real code, real projects, real discipline.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `
    (() => {
      try {
        const stored = localStorage.getItem("portfolio-environment");
        const theme = stored === "space" || stored === "ocean"
          ? stored
          : matchMedia("(prefers-color-scheme: light)").matches
            ? "ocean"
            : "space";
        document.documentElement.dataset.environment = theme;
        document.documentElement.style.colorScheme =
          theme === "ocean" ? "light" : "dark";
      } catch {
        document.documentElement.dataset.environment = "space";
        document.documentElement.style.colorScheme = "dark";
      }
    })();
  `;

  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="environment-theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body className="grain min-h-dvh bg-ink">
        <ThemeProvider>
          <SmoothScroll>
            <Nav />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
