import type { APIRoute } from 'astro';
import { getPassword } from '../library/microcms';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const enteredPassword = formData.get('password')?.toString() ?? '';
  const cmsPasswordData = await getPassword();

  if (enteredPassword === cmsPasswordData.password) {
    cookies.set('auth', enteredPassword, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      // secure: false, // ローカル環境では false にする
      maxAge: 60 * 60 * 24 * 7, // 1週間
    });

    return redirect('/limited'); // ←ここで正常にリダイレクト
  }

  return redirect('/password?error=1');
};
