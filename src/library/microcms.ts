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
  is_recommended: boolean; // おすすめ記事フラグ
  recommend_order: number; // 表示順
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
// おすすめ記事（最大3件）取得
export const getRecommendedNews = async () => {
  return await client.get<NewsResponse>({
    endpoint: "News",
    queries: {
      filters: "is_recommended[equals]true",
      orders: "recommend_order",
      limit: 3,
    },
  });
};

// 最新のブログ記事を取得する関数
export const getLatestNewsPost = async () => {
  const response = await client.get<NewsResponse>({
    endpoint: "News",
    queries: {
      orders: "-publishedAt", // 公開日で降順にソート
      limit: 1, // 1件だけ取得
    },
  });
  return response.contents[0]; // 最新の記事を返す
};
