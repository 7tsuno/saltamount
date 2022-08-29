import { SelectChangeEvent } from "@mui/material";
import Big from "big.js";
import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import IndexPage, { ViewItem } from "../../components/pages/IndexPage";
import { Item, itemsState } from "../../recoil/items";
import { sourcesState, Unit } from "../../recoil/sources";
import { StringToBig, toNum } from "../../utils/stringUtils";

const IndexPageContainer: React.FC = () => {
  const sources = useRecoilValue(sourcesState);
  const items = useRecoilValue(itemsState);
  const setItems: SetterOrUpdater<Array<Item>> = useSetRecoilState(itemsState);

  const newItem = useMemo(
    () => ({
      source: sources.filter(
        (source) => !items.find((item) => item.source.name === source.name)
      )[0],
      saltAmount: 0,
      tableSpoon: "",
      teaSpoon: "",
      cup: "",
      amount: "",
      weight: "",
      count: "",
    }),
    [items, sources]
  );

  const [targetItem, setTargetItem] = useState<ViewItem>(newItem);
  const [isRegister, setIsRegister] = useState(false);
  const [saltAmount, setSaltAmount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const onChangeSource = useCallback(
    (event: SelectChangeEvent<string>, child: ReactNode) => {
      const newTargetSource = sources.find(
        (source) => source.name === event.target.value
      );
      if (newTargetSource) {
        setTargetItem({
          ...targetItem,
          source: newTargetSource,
        });
      }
    },
    [sources, targetItem]
  );

  useEffect(() => {
    if (targetItem.source) {
      const tableSpoon = StringToBig(targetItem.tableSpoon)
        .mul(15)
        .mul(targetItem.source.unitSaltWeight);
      const teaSpoon = StringToBig(targetItem.teaSpoon)
        .mul(5)
        .mul(targetItem.source.unitSaltWeight);
      const cup = StringToBig(targetItem.cup)
        .mul(200)
        .mul(targetItem.source.unitSaltWeight);
      const amount = StringToBig(targetItem.cup).mul(
        targetItem.source.unitSaltWeight
      );
      const weight = StringToBig(targetItem.weight).mul(
        targetItem.source.unitSaltWeight
      );
      const count = StringToBig(targetItem.count).mul(
        targetItem.source.unitSaltWeight
      );
      setSaltAmount(
        tableSpoon
          .add(teaSpoon)
          .add(cup)
          .add(amount)
          .add(weight)
          .add(count)
          .round(3)
          .toNumber()
      );
    }
  }, [targetItem]);

  const onChangeTableSpoon = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetItem({
        ...targetItem,
        tableSpoon: event.target.value,
      });
    },
    [targetItem]
  );

  const onChangeTeaSpoon = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetItem({
        ...targetItem,
        teaSpoon: event.target.value,
      });
    },
    [targetItem]
  );

  const onChangeCup = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetItem({
        ...targetItem,
        cup: event.target.value,
      });
    },
    [targetItem]
  );

  const onChangeAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetItem({
        ...targetItem,
        amount: event.target.value,
      });
    },
    [targetItem]
  );

  const onChangeWeight = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetItem({
        ...targetItem,
        weight: event.target.value,
      });
    },
    [targetItem]
  );

  const onChangeCount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetItem({
        ...targetItem,
        count: event.target.value,
      });
    },
    [targetItem]
  );

  const upTableSpoon = useCallback(() => {
    setTargetItem({
      ...targetItem,
      tableSpoon: String(toNum(targetItem.tableSpoon) + 0.5),
    });
  }, [targetItem]);

  const downTableSpoon = useCallback(() => {
    const newValue = toNum(targetItem.tableSpoon) - 0.5;
    setTargetItem({
      ...targetItem,
      tableSpoon: newValue < 0 ? "0" : String(newValue),
    });
  }, [targetItem]);

  const upTeaSpoon = useCallback(() => {
    setTargetItem({
      ...targetItem,
      teaSpoon: String(toNum(targetItem.teaSpoon) + 0.5),
    });
  }, [targetItem]);

  const downTeaSpoon = useCallback(() => {
    const newValue = toNum(targetItem.teaSpoon) - 0.5;
    setTargetItem({
      ...targetItem,
      teaSpoon: newValue < 0 ? "0" : String(newValue),
    });
  }, [targetItem]);

  const upCup = useCallback(() => {
    setTargetItem({
      ...targetItem,
      cup: String(toNum(targetItem.cup) + 0.5),
    });
  }, [targetItem]);

  const downCup = useCallback(() => {
    const newValue = toNum(targetItem.cup) - 0.5;
    setTargetItem({
      ...targetItem,
      cup: newValue < 0 ? "0" : String(newValue),
    });
  }, [targetItem]);

  const upCount = useCallback(() => {
    setTargetItem({
      ...targetItem,
      count: String(toNum(targetItem.count) + 0.5),
    });
  }, [targetItem]);

  const downCount = useCallback(() => {
    const newValue = toNum(targetItem.count) - 0.5;
    setTargetItem({
      ...targetItem,
      count: newValue < 0 ? "0" : String(newValue),
    });
  }, [targetItem]);

  const register = useCallback(() => {
    if (isRegister) {
      const newItems = [...items];

      newItems.push({
        source: targetItem.source,
        tableSpoon: toNum(targetItem.tableSpoon),
        teaSpoon: toNum(targetItem.teaSpoon),
        cup: toNum(targetItem.cup),
        amount: toNum(targetItem.amount),
        weight: toNum(targetItem.weight),
        count: toNum(targetItem.count),
        saltAmount,
      });

      setItems(newItems);
    } else {
      const newItems = [...items].map((item) =>
        item.source.name === targetItem.source.name
          ? {
              source: targetItem.source,
              tableSpoon: toNum(targetItem.tableSpoon),
              teaSpoon: toNum(targetItem.teaSpoon),
              cup: toNum(targetItem.cup),
              amount: toNum(targetItem.amount),
              weight: toNum(targetItem.weight),
              count: toNum(targetItem.count),
              saltAmount,
            }
          : item
      );

      setItems(newItems);
    }
    setModalOpen(false);
  }, [isRegister, items, saltAmount, setItems, targetItem]);

  const registerOpen = useCallback(() => {
    setModalOpen(true);
    setIsRegister(true);
    setTargetItem({ ...newItem });
  }, [newItem]);

  const modalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const lineDelete = useCallback(
    (name: string) => {
      const newItems = [...items].filter((item) => item.source.name !== name);
      setItems(newItems);
    },
    [items, setItems]
  );

  const updateOpen = useCallback(
    (name: string) => {
      const newTargetItem = items.find((item) => item.source.name === name);
      if (newTargetItem) {
        setTargetItem({
          source: newTargetItem.source,
          tableSpoon: String(newTargetItem.tableSpoon),
          teaSpoon: String(newTargetItem.teaSpoon),
          cup: String(newTargetItem.cup),
          amount: String(newTargetItem.amount),
          weight: String(newTargetItem.weight),
          count: String(newTargetItem.count),
          saltAmount: newTargetItem.saltAmount,
        });
        ({ ...newTargetItem });
        setModalOpen(true);
        setIsRegister(false);
      }
    },
    [items]
  );

  const allDelete = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const disabled = useMemo(() => {
    if (!targetItem.source) {
      return false;
    }
    return (
      (targetItem.source.unit === Unit.Amount &&
        toNum(targetItem.tableSpoon) === 0 &&
        toNum(targetItem.teaSpoon) === 0 &&
        toNum(targetItem.cup) === 0 &&
        toNum(targetItem.amount) === 0) ||
      (targetItem.source.unit === Unit.Weight &&
        toNum(targetItem.weight) === 0) ||
      (targetItem.source.unit === Unit.Count && toNum(targetItem.count) === 0)
    );
  }, [targetItem]);

  const props = {
    sources,
    items,
    targetItem,
    onChangeTableSpoon,
    upTableSpoon,
    downTableSpoon,
    onChangeTeaSpoon,
    upTeaSpoon,
    downTeaSpoon,
    onChangeCup,
    upCup,
    downCup,
    onChangeAmount,
    onChangeWeight,
    onChangeCount,
    upCount,
    downCount,
    isRegister,
    register,
    modalOpen,
    registerOpen,
    modalClose,
    lineDelete,
    updateOpen,
    allDelete,
    onChangeSource,
    saltAmount,
    disabled,
  };
  return <IndexPage {...props} />;
};

export default IndexPageContainer;
