import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug, getAllSlugs } from "@/lib/queries";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-generate static pages for all published posts
export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

// Dynamic metadata per post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    if (!post) return {};
    const image = post.featuredImage?.node.sourceUrl;
    return {
      title: post.title,
      description: post.excerpt?.replace(/<[^>]+>/g, "").slice(0, 160),
      openGraph: {
        title: post.title,
        images: image ? [{ url: image }] : [],
        type: "article",
        publishedTime: post.date,
        authors: [post.author?.node.name ?? "Unknown"],
      },
    };
  } catch {
    return {};
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function SinglePostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) notFound();

  const authorName = post.author?.node.name ?? "Unknown Author";
  const avatarUrl = post.author?.node.avatar?.url ?? null;
  const featuredSrc = post.featuredImage?.node.sourceUrl ?? null;
  const featuredAlt = post.featuredImage?.node.altText || post.title;

  return (
    <>
      <Navbar />
      <main id="main-content" className="single-post-main">
        <article className="single-post">
          {/* Back link */}
          <div className="single-post-back">
            <Link href="/" className="back-link">
              ← Back to posts
            </Link>
          </div>

          {/* Categories */}
          {post.categories.nodes.length > 0 && (
            <div className="post-categories">
              {post.categories.nodes.map((cat) => (
                <span key={cat.slug} className="category-badge">
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="single-post-title">{post.title}</h1>

          {/* Meta */}
          <div className="single-post-meta">
            <div className="post-author-row">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={authorName}
                  width={40}
                  height={40}
                  className="author-avatar-lg"
                />
              ) : (
                <span className="author-avatar-placeholder-lg">
                  {authorName.charAt(0)}
                </span>
              )}
              <div>
                <span className="author-name-lg">{authorName}</span>
                <time className="post-date-lg" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>
            </div>
          </div>

          {/* Featured image */}
          {featuredSrc && (
            <div className="single-post-featured">
              <Image
                src={featuredSrc}
                alt={featuredAlt}
                width={1200}
                height={630}
                priority
                className="featured-image"
              />
            </div>
          )}

          {/* Post content */}
          <div
            className="post-content prose"
            dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
          />

          {/* Back link bottom */}
          <div className="single-post-back">
            <Link href="/" className="back-link">
              ← Back to posts
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
