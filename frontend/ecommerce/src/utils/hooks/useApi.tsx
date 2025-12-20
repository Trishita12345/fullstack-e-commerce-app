"use client";

import { apiFetch } from "@/lib/apiFetch";
import { useState, useCallback } from "react";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (
    endpoint: string,
    options?: Parameters<typeof apiFetch>[1]
  ) => Promise<T | null>;
}

export function useApi<T>(): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (endpoint: string, options: Parameters<typeof apiFetch>[1]) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFetch<T>(endpoint, options);
        setData(response);
        return response;
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, execute };
}
