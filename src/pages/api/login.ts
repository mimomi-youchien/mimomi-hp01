import type { APIRoute } from "astro";
import { getLimited } from "../../library/microcms";

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const pass = formData.get("password");

  const limitedInfo = await getLimited();

  if (id === limitedInfo.loginId && pass === limitedInfo.password) {
    cookies.set("auth", "ok", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1日
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/otayori",
      },
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login?error=1",
    },
  });
};
