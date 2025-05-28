import type { AstroCookies } from "astro";
import { getPassword } from "../library/microcms";

// クッキーに保存された認証情報とCMSのパスワードを照合
export async function isAuthenticated(cookies: AstroCookies): Promise<boolean> {
  const stored = cookies.get('auth')?.value;
  const cmsPasswordData = await getPassword(); // PasswordData型を取得
  return stored === cmsPasswordData.password;
}
