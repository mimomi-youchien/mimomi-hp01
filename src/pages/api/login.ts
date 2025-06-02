// src/pages/api/login.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (email === 'test@example.com' && password === 'password123') {
      return new Response(JSON.stringify({ message: 'ログイン成功' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ error: '認証失敗' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: '不正なリクエスト' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
