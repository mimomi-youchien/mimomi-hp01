// src/middleware.ts
import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async ({ cookies, request }, next) => {
  const auth = cookies.get("auth");

  // 特定のパスだけ認証チェック（例: /otayori/**）
  if (request.url.includes("/otayori")) {
    if (!auth || auth.value !== "ok") {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      });
    }
  }

  return next();
};
