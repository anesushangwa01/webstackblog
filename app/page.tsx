import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PostGrid, { PostGridSkeleton } from "@/components/PostGrid";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home — Insights & Stories Powered by WordPress & Next.js",
  description:
    "Browse the latest posts from our WordPress-powered headless blog built with Next.js and WPGraphQL.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <Suspense fallback={<PostGridSkeleton />}>
          <PostGrid />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
