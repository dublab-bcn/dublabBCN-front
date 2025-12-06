import { Analytics } from "@vercel/analytics/react";
import localfont from "next/font/local";
import AppProvider from "./contexts/providers/Index";
import "./globals.css";
import { Metadata } from "next";
import Link from "next/link";

const favorit = localfont({
  src: "./fonts/Favorit_Regular_Mono.ttf",
  variable: "--font-favorit",
});

export const metadata: Metadata = {
  title: { absolute: "", default: "dublab BCN", template: "%s | dublab BCN " },
  description: "Pagina web de la radio comunitaria dublab BCN",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ca">
      <body className={`${favorit.variable} font-favorit antialiased`}>
        <AppProvider>{children}</AppProvider>
        <Analytics />
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.mixcloud.com/dublabes/subscribe/"
          className="fixed bottom-16 z-40 left-2 p-2  bg-white border border-black rounded hover:bg-gray-200 text-sm md:text-base"
        >
          Donate
        </Link>
      </body>
    </html>
  );
};

export default RootLayout;
