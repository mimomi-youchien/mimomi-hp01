export const CATEGORY_MAP: Record<string, string> = {
  information: "ご連絡",
  "mi-shuen-jievent": "未就園児イベント",
  visit: "見学案内",
  recruitment: "募集案内",
  "mimomi-nikki": "みもみ日記",
  firstYear: "年少クラス",
  secondYear: "年中クラス",
  thirdYear: "年長クラス",
  all: "全クラス",
};

export const CATEGORY_SLUG_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_MAP).map(([slug, name]) => [name, slug])
);
