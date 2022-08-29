import Big from "big.js";

export const toNum = (num: string): number => {
  if (num === "") {
    return 0;
  }
  return Number(num);
};

export const StringToBig = (num: string): Big => new Big(toNum(num));
