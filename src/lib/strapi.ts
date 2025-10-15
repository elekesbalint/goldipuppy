export type StrapiCollectionResponse<T> = {
  data: Array<{
    id: number;
    attributes: T & { createdAt?: string; updatedAt?: string; publishedAt?: string };
  }>;
  meta: unknown;
};

export async function strapiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_CMS_URL;
  if (!baseUrl) {
    throw new Error("CMS disabled");
  }
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }
  const res = await fetch(`${baseUrl}${path}`, { headers, ...init });
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

