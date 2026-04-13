import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            Logo
          </Link>
          <p className="footer-tagline">
            Insights &amp; Stories Powered by WordPress &amp; Next.js
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/" className="footer-link">Home</Link>
          <Link href="/about" className="footer-link">About</Link>
          <Link href="/contact" className="footer-link">Contact</Link>
          <Link href="/posts" className="footer-link">Blog</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} MyBlog. Built with WordPress &amp; Next.js.</p>
      </div>
    </footer>
  );
}
