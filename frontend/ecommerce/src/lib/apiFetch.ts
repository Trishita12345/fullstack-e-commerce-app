import { forbidden, unauthorized } from "next/navigation";
import { refreshToken } from "./refreshToken";
import { ErrorResponse } from "@/constants/types";

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

  // const isServer = typeof window === "undefined";

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

  // console.log(`API Fetch: `, finalHeaders);

  res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
    cache,
    credentials: "include",
    ...(revalidate !== undefined && { next: { revalidate, tags } }),
  });
  // console.log(`API Response: `, res);

  // 🔐 HANDLE 401
  if (res.status === 401 && !_retry) {
    const refreshedCookie = await refreshToken(cookie);
    if (refreshedCookie) {
      return await apiFetch(endpoint, { ...options, cookie: refreshedCookie, _retry: true });
    } else {
      unauthorized();
    }
  }
  if (res.status === 403) {
    forbidden();
  }

  if (!res.ok) {
    let error: ErrorResponse = {
      error: "",
      message: "No message",
      status: 500,
      traceId: 'dummy-trace-id',
      timestamp: Date.now().toString(),
      path: endpoint
    };
    try {
      error = await res.json();
    } catch (e) {
      console.error("Failed to read error response:", e);
    }
    throw new Error(error.message, { cause: error.traceId as string });
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