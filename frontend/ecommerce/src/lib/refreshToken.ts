"use server"
import { cookies } from "next/headers";

export async function refreshToken(cookie?: string): Promise<string | null> {
  if (!cookie?.includes("refreshToken")) return null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth-service/public/refresh`,
      {
        method: "POST",
        headers: cookie ? { Cookie: cookie } : {},
        credentials: "include",
      }
    );

    const setCookie = res.headers.get("Set-Cookie");

    if (setCookie) {
      const cookieStore = await cookies();

      const { name, value, options } = parseSetCookie(setCookie);

      // ✅ preserves all backend settings
      cookieStore.set(name, value, options);
    }

    return (await cookies()).toString();
  } catch (error) {
    console.error("Refresh token failed:", error);
    return null;
  }
}

function parseSetCookie(setCookie: string) {
  const parts = setCookie.split(";").map(p => p.trim());

  const [nameValue, ...attributes] = parts;
  const [name, value] = nameValue.split("=");

  const options: any = {};

  attributes.forEach(attr => {
    const [key, val] = attr.split("=");

    switch (key.toLowerCase()) {
      case "path":
        options.path = val;
        break;
      case "domain":
        options.domain = val;
        break;
      case "max-age":
        options.maxAge = Number(val);
        break;
      case "expires":
        options.expires = new Date(val);
        break;
      case "secure":
        options.secure = true;
        break;
      case "httponly":
        options.httpOnly = true;
        break;
      case "samesite":
        options.sameSite = val?.toLowerCase();
        break;
    }
  });

  return { name, value, options };
}