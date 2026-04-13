import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/wordpress";

interface PostCardProps {
  post: Post;
}

/** Strip HTML tags from WP excerpt */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

/** Format WP date string to readable form */
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostCard({ post }: PostCardProps) {
  const excerpt = stripHtml(post.excerpt || "");
  const truncated =
    excerpt.length > 120 ? excerpt.slice(0, 120) + "..." : excerpt;
  const authorName = post.author?.node.name ?? "Unknown Author";
  const avatarUrl = post.author?.node.avatar?.url ?? null;
  const featuredSrc = post.featuredImage?.node.sourceUrl ?? null;
  const featuredAlt = post.featuredImage?.node.altText || post.title;

  return (
    <article className="post-card">
      {/* Featured image */}
      <Link href={`/posts/${post.slug}`} className="post-card-image-link" tabIndex={-1}>
        <div className="post-card-image-wrap">
          {featuredSrc ? (
            <Image
              src={featuredSrc}
              alt={featuredAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="post-card-image"
            />
          ) : (
            <div className="post-card-image-placeholder" aria-hidden="true" />
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="post-card-body">
        <Link href={`/posts/${post.slug}`} className="post-card-title-link">
          <h2 className="post-card-title">{post.title}</h2>
        </Link>

        <p className="post-card-excerpt">{truncated}</p>

        {/* Meta */}
        <div className="post-card-meta">
          <div className="post-card-author">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={authorName}
                width={28}
                height={28}
                className="author-avatar"
              />
            ) : (
              <span className="author-avatar-placeholder" aria-hidden="true">
                {authorName.charAt(0)}
              </span>
            )}
            <span className="author-name">{authorName}</span>
          </div>

          <div className="post-card-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>

          <Link href={`/posts/${post.slug}`} className="read-more-link">
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
