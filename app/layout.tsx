import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MyBlog — Insights & Stories",
    template: "%s | MyBlog",
  },
  description:
    "Insights and stories powered by WordPress & Next.js. A headless CMS blog using WPGraphQL.",
  openGraph: {
    siteName: "MyBlog",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="site-body" suppressHydrationWarning>{children}</body>
    </html>
  );
}
