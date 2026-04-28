import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NightTalk | Listeners available",
  description: "A secure, anonymous space when you just need someone to listen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-rose-50/50 text-slate-800 min-h-screen flex flex-col font-sans antialiased text-rendering-optimizeLegibility selection:bg-pink-200 selection:text-pink-900">
        {children}
      </body>
    </html>
  );
}
