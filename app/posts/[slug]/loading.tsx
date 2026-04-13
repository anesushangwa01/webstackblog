import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PostLoading() {
  return (
    <>
      <Navbar />
      <main className="single-post-main">
        <div className="single-post">
          <div className="skeleton-line skeleton-back" />
          <div className="skeleton-line skeleton-category" />
          <div className="skeleton-line skeleton-post-title" />
          <div className="skeleton-line skeleton-post-title short" />
          <div className="skeleton-author-row">
            <div className="skeleton-avatar-lg" />
            <div>
              <div className="skeleton-line skeleton-author" />
              <div className="skeleton-line skeleton-date" />
            </div>
          </div>
          <div className="skeleton-featured" />
          <div className="skeleton-content">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={`skeleton-line skeleton-paragraph ${i % 3 === 2 ? "short" : ""}`} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
