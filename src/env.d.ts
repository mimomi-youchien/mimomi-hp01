// Astroの自動生成型定義への参照
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Astro.locals にカスタムプロパティを追加するための型拡張
declare namespace App {
  interface Locals {
    isAuthenticated: boolean;
    errorMessage?: string; // エラーメッセージはオプションなので ? をつける
  }
}