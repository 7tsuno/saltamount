export const PAGE = {
  index: {
    path: "/",
    name: "食塩量計算",
  },
  sources: {
    path: "/sources",
    name: "調味料一覧・編集",
  },
} as const;
export interface Page {
  path: string;
  name: string;
}
