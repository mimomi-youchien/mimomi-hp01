import { defineMiddleware, sequence } from 'astro:middleware';
import { getPassword } from './library/microcms'; // microCMSのパスワード取得関数をインポート

// パスワードをMicroCMSから一度取得し、メモリにキャッシュする（ビルド時 or 初回リクエスト時）
// 実際にはビルド時にパスワードをフェッチするか、環境変数で設定することも検討
let cachedPassword: string | null = null;

const getCorrectPassword = async () => {
  if (cachedPassword) {
    return cachedPassword;
  }
  try {
    const passwordData = await getPassword();
    cachedPassword = passwordData.password;
    return cachedPassword;
  } catch (error) {
    console.error("Failed to fetch password from microCMS:", error);
    return null; // または適切なエラーハンドリング
  }
};

const authMiddleware = defineMiddleware(async (context, next) => {
  const correctPassword = await getCorrectPassword();
  if (!correctPassword) {
    // パスワードが取得できない場合は、認証をスキップするか、エラーページにリダイレクト
    return next();
  }

  const currentPath = context.url.pathname;
  const isProtectedPage = currentPath.startsWith('/otayori/');

  if (!isProtectedPage) {
    return next(); // 保護対象外のページはスキップ
  }

  let isAuthenticated = context.cookies.has('authenticated');

  if (context.request.method === 'POST') {
    const formData = await context.request.formData();
    const submittedPassword = formData.get('password');

    if (submittedPassword === correctPassword) {
      // 認証成功: Cookieを設定
      context.cookies.set('authenticated', 'true', {
        httpOnly: true, // JavaScriptからアクセス不可
        secure: import.meta.env.PROD, // HTTPSでのみ送信
        maxAge: 60 * 60 * 24, // 24時間有効
        path: '/', // サイト全体で有効
        sameSite: 'lax' // CSRF対策
      });
      isAuthenticated = true;
      // 認証成功後、同じURLにリダイレクトすることでPOSTリクエストをGETに変換
      // これにより、フォームの再送信を防ぐ
      return new Response(null, {
        status: 302,
        headers: {
          Location: currentPath
        }
      });
    } else {
      // 認証失敗: Cookieを削除し、エラーメッセージをセット（Astro.locals経由）
      context.cookies.delete('authenticated', { path: '/' });
      context.locals.errorMessage = 'パスワードが間違っています。';
      isAuthenticated = false;
    }
  }

  // 認証状態を `Astro.locals` に設定して、ページコンポーネントに渡す
  context.locals.isAuthenticated = isAuthenticated;

  return next();
});

// 複数のミドルウェアをチェーンすることも可能
export const onRequest = sequence(authMiddleware);