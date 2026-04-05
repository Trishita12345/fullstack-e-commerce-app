import { forbidden, unauthorized } from "next/navigation";
import { refreshToken } from "./refreshToken";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiFetchOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
  _retry?: boolean;

  // ✅ NEW: allow injecting cookies (SSR only)
  cookie?: string;
}

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
    tags = [],
    _retry = false,
    cookie,
  } = options;

  const isServer = typeof window === "undefined";

  let finalHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  // ✅ Attach cookie only if provided (SSR)
  if (cookie) {
    finalHeaders = {
      ...finalHeaders,
      Cookie: cookie,
    };
  }

  let res: Response;

  console.log(`API Fetch: `, finalHeaders);

  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
      cache,
      credentials: "include",
      ...(revalidate !== undefined && { next: { revalidate, tags } }),
    });
  } catch (error) {
    console.error("API Fetch Error:", error);

    if (isServer) {
      throw new Error("Server failed to reach API");
    } else {
      throw error;
    }
  }

  // 🔐 HANDLE 401
  if (res.status === 401 && !_retry) {
    try {
      const refreshedCookie = await refreshToken(cookie);

      if (refreshedCookie) {
        return await apiFetch(endpoint, { ...options, cookie: refreshedCookie, _retry: true });
      } else {
        unauthorized();
      }
    } catch (error) {
      console.error("Retry after refresh failed:", error);
      unauthorized();
    }
  }
  if (res.status === 403) {
    forbidden();
  }

  if (!res.ok) {
    let message = "API request failed";

    try {
      message = await res.text();
    } catch (e) {
      console.error("Failed to read error response:", e);
    }

    throw new Error(message);
  }

  if (res.status === 204) {
    return null as T;
  }
  const contentType = res.headers.get("content-type");

  try {
    if (contentType && contentType.includes("application/json")) {
      return res.json();
    } else {
      return res.text() as T;
    }
  } catch (error) {
    console.error("JSON parsing failed:", error);
    throw new Error("Invalid JSON response");
  }
}