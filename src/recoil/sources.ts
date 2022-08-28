import { atom } from "recoil";

export const Unit = {
  Amount: "Amount",
  Weight: "Weight",
  Count: "Count",
} as const;
export type Unit = typeof Unit[keyof typeof Unit];

export interface Source {
  name: string;
  unit: Unit;
  amount: number;
  saltWeight: number;
  unitSaltWeight: number;
}

export const sourcesState = atom<Array<Source>>({
  key: "sources",
  default: [],
});
