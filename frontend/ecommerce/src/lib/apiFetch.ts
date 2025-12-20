import { cache } from "react";
import { authClient } from "./auth-client";
import { getServerToken } from "./get-server-auth";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiFetchOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidate?: number;
}

const getToken = cache(async () => {
  if (typeof window === "undefined") {
    const { token } = await getServerToken();
    return token;
  }
  const { data } = await authClient.token();
  return data?.token;
});

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    headers,
    cache = "no-store",
    revalidate,
  } = options;

  const token = await getToken();
  let header = {
    "Content-Type": "application/json",
    ...headers,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method,
    headers: token ? { ...header, Authorization: `Bearer ${token}` } : header,
    body: body ? JSON.stringify(body) : undefined,
    cache,
    ...(revalidate !== undefined && { next: { revalidate } }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "API request failed");
  }

  return res.json();
}
