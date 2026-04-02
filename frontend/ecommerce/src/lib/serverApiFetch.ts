import "server-only";
import { cookies } from "next/headers";
import { apiFetch } from "./apiFetch";

type ApiFetchOptions = Parameters<typeof apiFetch>[1];

export async function serverApiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const cookieStore = await cookies();
  console.log("Cookies sent with request:", cookieStore.getAll());
  return apiFetch<T>(endpoint, {
    ...options,
    cookie: cookieStore.toString(),
  });
}