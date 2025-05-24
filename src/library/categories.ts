export const CATEGORY_MAP: Record<string, string> = {
  information: "ご連絡",
  recruitment: "募集案内",
  mimomiNikki: "みもみ日記",
  firstYear: "年少クラス",
  SecondYear: "年中クラス",
  ThirdYear: "年長クラス",
  kindergartenNews: "園だより園だより",
};

export const CATEGORY_SLUG_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_MAP).map(([slug, name]) => [name, slug])
);
