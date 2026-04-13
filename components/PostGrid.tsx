import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";
import { getPosts } from "@/lib/queries";
import type { Post } from "@/types/wordpress";

// Server Component — fetches posts at build/revalidate time
export default async function PostGrid() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    const data = await getPosts(12);
    posts = data.nodes;
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Failed to load posts. Please try again later.";
    posts = [];
  }

  return (
    <section className="post-grid-section">
      <div className="post-grid-inner">
        <h2 className="section-title">Latest Posts</h2>

        {error && (
          <div className="error-banner" role="alert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <strong>Could not load posts</strong>
              <p>{error}</p>
              <p className="error-hint">
                Make sure WPGraphQL is installed and <code>NEXT_PUBLIC_WORDPRESS_API_URL</code> is set correctly in <code>.env</code>.
              </p>
            </div>
          </div>
        )}

        {!error && posts.length === 0 && (
          <p className="no-posts">No posts found. Publish some posts in WordPress first.</p>
        )}

        {posts.length > 0 && (
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Skeleton grid for Suspense boundaries
export function PostGridSkeleton() {
  return (
    <section className="post-grid-section">
      <div className="post-grid-inner">
        <h2 className="section-title">Latest Posts</h2>
        <div className="post-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
