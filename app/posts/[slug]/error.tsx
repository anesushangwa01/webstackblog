"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Navbar />
      <main className="single-post-main">
        <div className="error-page">
          <div className="error-icon" aria-hidden="true">⚠️</div>
          <h1 className="error-page-title">Something went wrong</h1>
          <p className="error-page-message">{error.message}</p>
          <div className="error-page-actions">
            <button onClick={reset} className="btn-primary">
              Try Again
            </button>
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
