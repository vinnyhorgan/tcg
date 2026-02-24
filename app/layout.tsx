import type { Metadata } from "next";
import { Cinzel, Nunito_Sans } from "next/font/google";
import { Nav } from "@/components/nav";
import { ConvexClientProvider } from "./convex-client-provider";
import "./globals.css";

const display = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "700", "900"],
});

const body = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arcana — Trading Card Game",
  description:
    "A browser-based indie trading card game. Collect, build, and battle with cards infused by the elements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${display.variable} ${body.variable} font-[family-name:var(--font-body)] antialiased`}
      >
        <ConvexClientProvider>
          <Nav />
          <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
