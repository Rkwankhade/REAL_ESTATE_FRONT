import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import VideoBackground from "@/components/VideoBackground";

export const metadata: Metadata = {
  title: "Aurelle Estates | Coastal homes, considered",
  description: "A frontend demo of a luxury coastal property website. Listings are sample content.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2">Skip to content</a>
        <VideoBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
