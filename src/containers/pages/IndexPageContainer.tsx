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
import IndexPage from "../../components/pages/IndexPage";
import { Item, itemsState } from "../../recoil/items";
import { sourcesState, Unit } from "../../recoil/sources";

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
      tableSpoon: 0,
      teaSpoon: 0,
      cup: 0,
      amount: 0,
      weight: 0,
      count: 0,
    }),
    [items, sources]
  );

  const [targetItem, setTargetItem] = useState<Item>(newItem);
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
      const tableSpoon = new Big(targetItem.tableSpoon)
        .mul(15)
        .mul(targetItem.source.unitSaltWeight);
      const teaSpoon = new Big(targetItem.teaSpoon)
        .mul(5)
        .mul(targetItem.source.unitSaltWeight);
      const cup = new Big(targetItem.cup)
        .mul(200)
        .mul(targetItem.source.unitSaltWeight);
      const amount = new Big(targetItem.cup).mul(
        targetItem.source.unitSaltWeight
      );
      const weight = new Big(targetItem.weight).mul(
        targetItem.source.unitSaltWeight
      );
      const count = new Big(targetItem.count).mul(
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
        tableSpoon: Number(event.target.value),
      });
    },
    [targetItem]
  );

  const onChangeTeaSpoon = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetItem({
        ...targetItem,
        teaSpoon: Number(event.target.value),
      });
    },
    [targetItem]
  );

  const onChangeCup = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetItem({
        ...targetItem,
        cup: Number(event.target.value),
      });
    },
    [targetItem]
  );

  const onChangeAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetItem({
        ...targetItem,
        amount: Number(event.target.value),
      });
    },
    [targetItem]
  );

  const onChangeWeight = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetItem({
        ...targetItem,
        weight: Number(event.target.value),
      });
    },
    [targetItem]
  );

  const onChangeCount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetItem({
        ...targetItem,
        count: Number(event.target.value),
      });
    },
    [targetItem]
  );

  const upTableSpoon = useCallback(() => {
    setTargetItem({
      ...targetItem,
      tableSpoon: Number(targetItem.tableSpoon + 0.5),
    });
  }, [targetItem]);

  const downTableSpoon = useCallback(() => {
    const newValue = Number(targetItem.tableSpoon - 0.5);
    setTargetItem({
      ...targetItem,
      tableSpoon: newValue < 0 ? 0 : newValue,
    });
  }, [targetItem]);

  const upTeaSpoon = useCallback(() => {
    setTargetItem({
      ...targetItem,
      teaSpoon: Number(targetItem.teaSpoon + 0.5),
    });
  }, [targetItem]);

  const downTeaSpoon = useCallback(() => {
    const newValue = Number(targetItem.teaSpoon - 0.5);
    setTargetItem({
      ...targetItem,
      teaSpoon: newValue < 0 ? 0 : newValue,
    });
  }, [targetItem]);

  const upCup = useCallback(() => {
    setTargetItem({
      ...targetItem,
      cup: Number(targetItem.cup + 0.5),
    });
  }, [targetItem]);

  const downCup = useCallback(() => {
    const newValue = Number(targetItem.cup - 0.5);
    setTargetItem({
      ...targetItem,
      cup: newValue < 0 ? 0 : newValue,
    });
  }, [targetItem]);

  const upCount = useCallback(() => {
    setTargetItem({
      ...targetItem,
      count: Number(targetItem.count + 0.5),
    });
  }, [targetItem]);

  const downCount = useCallback(() => {
    const newValue = Number(targetItem.count - 0.5);
    setTargetItem({
      ...targetItem,
      count: newValue < 0 ? 0 : newValue,
    });
  }, [targetItem]);

  const register = useCallback(() => {
    if (isRegister) {
      const newItems = [...items];
      newItems.push({ ...targetItem, saltAmount });
      setItems(newItems);
    } else {
      const newItems = [...items].map((item) =>
        item.source.name === targetItem.source.name
          ? { ...targetItem, saltAmount }
          : item
      );
      console.log(newItems);

      setItems(newItems);
    }
    setModalOpen(false);
  }, [isRegister, items, saltAmount, targetItem]);

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
    [items]
  );

  const updateOpen = useCallback(
    (name: string) => {
      const newTargetItem = items.find((item) => item.source.name === name);
      if (newTargetItem) {
        setTargetItem({ ...newTargetItem });
        ({ ...newTargetItem });
        setModalOpen(true);
        setIsRegister(false);
      }
    },
    [items]
  );

  const allDelete = useCallback(() => {
    setItems([]);
  }, []);

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
  };
  return <IndexPage {...props} />;
};

export default IndexPageContainer;
