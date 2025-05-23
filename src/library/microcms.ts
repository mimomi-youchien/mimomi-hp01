// SDK利用準備
// import type { arrayOutputType } from "astro:schema";
import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  // MicroCMSListResponse,
  // MicroCMSImage,
  // MicroCMSListContent,
} from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// ImageField
// 型定義
export type ImageField = {
  url: string;
  width: string;
  height: string;
};

// news
// 型定義
export type News = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  url: string;
  thumbnail?: { url: string };
  thumbnailAlt: string;
  category: string[];
  customDate: string;
  // is_recommended: boolean; // おすすめ記事フラグ
  // recommend_order: number; // 表示順
};
export type NewsResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: News[];
};
// APIの呼び出し
// 全ブログ記事取得
export const getNews = async (queries?: MicroCMSQueries) => {
  return await client.get<NewsResponse>({ endpoint: "news", queries });
};
// 特定のブログ記事取得
export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
  });
};

// otayori
// 型定義
export type Otayori = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  url: string;
  thumbnail?: { url: string };
  thumbnailAlt: string;
  category: string[];
  customDate: string;
  // is_recommended: boolean; // おすすめ記事フラグ
  // recommend_order: number; // 表示順
};
export type OtayoriResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Otayori[];
};
// APIの呼び出し
// 全ブログ記事取得
export const getOtayori = async (queries?: MicroCMSQueries) => {
  return await client.get<OtayoriResponse>({ endpoint: "otayori", queries });
};
// 特定のブログ記事取得
export const getOtayoriDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Otayori>({
    endpoint: "otayori",
    contentId,
    queries,
  });
};
