export default function PostCardSkeleton() {
  return (
    <div className="post-card skeleton-card" aria-hidden="true">
      <div className="post-card-image-wrap skeleton-image" />
      <div className="post-card-body">
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line skeleton-text" />
        <div className="skeleton-line skeleton-text short" />
        <div className="post-card-meta">
          <div className="skeleton-avatar" />
          <div className="skeleton-line skeleton-meta-text" />
        </div>
      </div>
    </div>
  );
}
