import { fetchGraphQL } from "./graphql";
import type { PostsData, SinglePostData, AllSlugsData, Post } from "@/types/wordpress";

// ─── Query Strings ─────────────────────────────────────────────────────────

const POST_FIELDS = /* GraphQL */ `
  id
  databaseId
  title
  slug
  date
  excerpt(format: RENDERED)
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  author {
    node {
      name
      avatar(size: 80) {
        url
        width
        height
      }
    }
  }
  categories {
    nodes {
      name
      slug
    }
  }
`;

export const GET_POSTS = /* GraphQL */ `
  query GetPosts($first: Int = 12, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
      nodes {
        ${POST_FIELDS}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_POST_BY_SLUG = /* GraphQL */ `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ${POST_FIELDS}
      content(format: RENDERED)
    }
  }
`;

export const GET_ALL_SLUGS = /* GraphQL */ `
  query GetAllSlugs {
    posts(first: 100, where: { status: PUBLISH }) {
      nodes {
        slug
      }
    }
  }
`;

// ─── Typed Fetchers ─────────────────────────────────────────────────────────

export async function getPosts(
  first = 12,
  after?: string
): Promise<PostsData["posts"]> {
  const data = await fetchGraphQL<PostsData>(GET_POSTS, { first, after });
  return data.posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await fetchGraphQL<SinglePostData>(GET_POST_BY_SLUG, { slug });
  return data.post;
}

export async function getAllSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<AllSlugsData>(GET_ALL_SLUGS);
  return data.posts.nodes.map((n) => n.slug);
}
