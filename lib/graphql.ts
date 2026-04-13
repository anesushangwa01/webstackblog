const WP_API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://webstackagency.co.za/graphql";

export class GraphQLError extends Error {
  constructor(
    message: string,
    public readonly errors?: Array<{ message: string }>
  ) {
    super(message);
    this.name = "GraphQLError";
  }
}

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(WP_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    // Next.js 15+ cache: 'no-store' for always-fresh, or 'force-cache' + revalidate
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new GraphQLError(
      `WPGraphQL request failed: ${res.status} ${res.statusText}`
    );
  }

  const json = (await res.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (json.errors && json.errors.length > 0) {
    throw new GraphQLError(
      json.errors.map((e) => e.message).join("\n"),
      json.errors
    );
  }

  if (!json.data) {
    throw new GraphQLError("No data returned from WPGraphQL");
  }

  return json.data;
}
