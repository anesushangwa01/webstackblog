import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hero-banner-new">
      {/* Background Image using Next.js Image component */}
      <Image
        src="/hero-banner.jpg" 
        alt="Modern Server Room Background"
        fill
        priority
        className="hero-background-img"
      />
      
      {/* Content Overlay */}
      <div className="hero-banner-overlay">
        <div className="hero-banner-content">
          <p className="hero-eyebrow">Welcome to MyBlog</p>
          <h1 className="hero-headline">
            Insights & Stories Powered by WordPress & Next.js
          </h1>
          <Link href="/posts" className="btn-primary-green hero-cta">
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}
