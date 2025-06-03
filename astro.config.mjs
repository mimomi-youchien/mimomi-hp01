// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never', // ← URLの末尾スラッシュなしを明示
  publicDir: './public',
});
