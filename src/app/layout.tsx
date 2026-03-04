import localfont from "next/font/local";
import AppProvider from "./contexts/providers/Index";
import "./globals.css";
import { Metadata , Viewport } from "next";

const favorit = localfont({
  src: "./fonts/Favorit_Regular_Mono.ttf",
  variable: "--font-favorit",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", 
};

export const metadata: Metadata = {
  title: { absolute: "", default: "dublab BCN", template: "%s | dublab BCN " },
  description: "Pagina web de la radio comunitaria dublab BCN",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ca">
      <body className={`${favorit.variable} font-favorit antialiased w-full overflow-x-hidden`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
