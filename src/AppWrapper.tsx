import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { Source, sourcesState, Unit } from "./recoil/sources";
import { useEffect } from "react";
import Big from "big.js";

const calcUnit = (amount: number, salt: number) =>
  new Big(salt).div(amount).round(10).toNumber();

function RecoilStateInitializer() {
  const setSources: SetterOrUpdater<Array<Source>> =
    useSetRecoilState(sourcesState);
  useEffect(() => {
    const sources = localStorage.getItem("sources");

    if (sources) {
      setSources(JSON.parse(sources));
    } else {
      setSources([
        {
          name: "塩(重さ)",
          unit: Unit.Weight,
          unitSaltWeight: 1,
          amount: 1,
          saltWeight: 1,
        },
        {
          name: "塩(量)",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(15, 18),
          amount: 15,
          saltWeight: 18,
        },
        {
          name: "濃口しょうゆ",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(15, 2.4),
          amount: 15,
          saltWeight: 2.4,
        },
        {
          name: "薄口しょうゆ",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(15, 2.8),
          amount: 15,
          saltWeight: 2.8,
        },
        {
          name: "みそ",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(15, 2.2),
          amount: 15,
          saltWeight: 2.2,
        },
        {
          name: "めんつゆ(ストレート)",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(15, 0.6),
          amount: 15,
          saltWeight: 0.6,
        },
        {
          name: "めんつゆ(2倍希釈)",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(15, 1.2),
          amount: 15,
          saltWeight: 1.2,
        },
        {
          name: "めんつゆ(3倍希釈)",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(100, 12),
          amount: 100,
          saltWeight: 12,
        },
        {
          name: "固形コンソメ",
          unit: Unit.Count,
          unitSaltWeight: 2.3,
          amount: 1,
          saltWeight: 2.3,
        },
        {
          name: "和風だしの素",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(5, 1.3),
          amount: 5,
          saltWeight: 1.3,
        },
        {
          name: "顆粒ガラスープ",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(5, 1.3),
          amount: 5,
          saltWeight: 1.3,
        },
        {
          name: "料理酒",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(15, 0.4),
          amount: 15,
          saltWeight: 0.4,
        },
        {
          name: "みりん",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(15, 0.3),
          amount: 15,
          saltWeight: 0.3,
        },
        {
          name: "ウスターソース",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(15, 1.5),
          amount: 15,
          saltWeight: 1.5,
        },
        {
          name: "ケチャップ",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(15, 0.5),
          amount: 15,
          saltWeight: 0.5,
        },
        {
          name: "マヨネーズ",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(15, 0.2),
          amount: 15,
          saltWeight: 0.2,
        },
        {
          name: "にんにくチューブ",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(5, 0.3),
          amount: 5,
          saltWeight: 0.3,
        },
        {
          name: "しょうがチューブ",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(5, 0.1),
          amount: 5,
          saltWeight: 0.1,
        },
        {
          name: "粉チーズ",
          unit: Unit.Amount,
          unitSaltWeight: calcUnit(15, 0.2),
          amount: 15,
          saltWeight: 0.2,
        },
        {
          name: "有塩バター",
          unit: Unit.Weight,
          unitSaltWeight: calcUnit(10, 0.15),
          amount: 10,
          saltWeight: 0.15,
        },
      ]);
    }
  }, [setSources]);
  return <></>;
}

export default RecoilStateInitializer;
