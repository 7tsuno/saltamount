import { atom } from "recoil";
import { Source } from "./sources";

export interface Item {
  source: Source;
  saltAmount: number;
  tableSpoon: number;
  teaSpoon: number;
  cup: number;
  amount: number;
  weight: number;
  count: number;
}

export const itemsState = atom<Array<Item>>({
  key: "items",
  default: [],
});
