import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import { SiteDataProvider } from "@/lib/store";

// Display face: Playfair Display — romantic, editorial, high-contrast serif.
// Body face: Jost — geometric, quiet, lets the serif keep the personality.
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const body = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Our Little Universe ❤️",
  description: "A little universe made of us.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-body bg-midnight-900 text-cream antialiased`}>
        <SiteDataProvider>{children}</SiteDataProvider>
      </body>
    </html>
  );
}
