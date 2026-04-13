export interface Author {
  name: string;
  avatar: {
    url: string;
  } | null;
}

export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

export interface Post {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  featuredImage: FeaturedImage | null;
  author: {
    node: Author;
  } | null;
  categories: {
    nodes: Array<{ name: string; slug: string }>;
  };
}

export interface PostsData {
  posts: {
    nodes: Post[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface SinglePostData {
  post: Post | null;
}

export interface AllSlugsData {
  posts: {
    nodes: Array<{ slug: string }>;
  };
}
