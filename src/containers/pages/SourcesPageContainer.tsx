import { SelectChangeEvent } from "@mui/material";
import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import SourcesPage, { ViewSource } from "../../components/pages/SourcesPage";
import { Source, sourcesState, Unit } from "../../recoil/sources";
import Big from "big.js";
import { StringToBig, toNum } from "../../utils/stringUtils";

const SourcesPageContainer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [unitSaltWeight, setUnitSaltWeight] = useState(0);
  const [change, isChange] = useState(false);
  const sources = useRecoilValue(sourcesState);
  const setSources: SetterOrUpdater<Array<Source>> =
    useSetRecoilState(sourcesState);

  useEffect(() => {
    if (change) {
      localStorage.setItem("sources", JSON.stringify(sources));
    }
  }, [sources, change]);

  const newSource: ViewSource = useMemo(
    () => ({
      name: "",
      unit: Unit.Amount,
      unitSaltWeight: 0,
      amount: "",
      saltWeight: "",
    }),
    []
  );

  const [targetSource, setTargetSource] = useState<ViewSource>({
    ...newSource,
  });

  useEffect(() => {
    if (toNum(targetSource.amount) !== 0) {
      const saltWeight = StringToBig(targetSource.saltWeight);
      const result = saltWeight.div(StringToBig(targetSource.amount));
      setUnitSaltWeight(result.round(10).toNumber());
    }
  }, [targetSource]);

  const registerOpen = useCallback(() => {
    setModalOpen(true);
    setIsRegister(true);
    setTargetSource({ ...newSource });
  }, [newSource]);

  const modalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const lineDelete = useCallback(
    (name: string) => {
      const newSouces = [...sources].filter((source) => source.name !== name);
      setSources(newSouces);
      isChange(true);
    },
    [setSources, sources]
  );

  const updateOpen = useCallback(
    (name: string) => {
      const newTargetSource = sources.find((source) => source.name === name);
      if (newTargetSource) {
        setTargetSource({
          name: newTargetSource.name,
          unit: newTargetSource.unit,
          unitSaltWeight: newTargetSource.unitSaltWeight,
          amount: String(newTargetSource.amount),
          saltWeight: String(newTargetSource.saltWeight),
        });
        setModalOpen(true);
        setIsRegister(false);
      }
    },
    [sources]
  );

  const onChangeName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetSource({
        ...targetSource,
        name: event.target.value,
      });
    },
    [targetSource]
  );
  const onChangeUnit = useCallback(
    (event: SelectChangeEvent<Unit>, child: ReactNode) => {
      setTargetSource({
        ...targetSource,
        unit: event.target.value as Unit,
      });
    },
    [targetSource]
  );

  const onChangeAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetSource({
        ...targetSource,
        amount: event.target.value,
      });
    },
    [targetSource]
  );

  const onChangeSaltWeight = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTargetSource({
        ...targetSource,
        saltWeight: event.target.value,
      });
    },
    [targetSource]
  );

  const register = useCallback(() => {
    if (isRegister) {
      const newSouces = [...sources];
      newSouces.push({
        name: targetSource.name,
        unit: targetSource.unit,
        amount: toNum(targetSource.amount),
        saltWeight: toNum(targetSource.saltWeight),
        unitSaltWeight,
      });
      setSources(newSouces);
    } else {
      const newSouces = [...sources].map((source) =>
        source.name === targetSource.name
          ? {
              name: targetSource.name,
              unit: targetSource.unit,
              amount: toNum(targetSource.amount),
              saltWeight: toNum(targetSource.saltWeight),
              unitSaltWeight,
            }
          : source
      );
      setSources(newSouces);
    }
    isChange(true);
    setModalOpen(false);
  }, [isRegister, setSources, sources, targetSource, unitSaltWeight]);

  const alreadyRegistered = useMemo(() => {
    return (
      isRegister && sources.some((source) => source.name === targetSource.name)
    );
  }, [isRegister, sources, targetSource.name]);

  const disabled = useMemo(() => {
    return (
      targetSource.name === "" ||
      toNum(targetSource.amount) === 0 ||
      toNum(targetSource.saltWeight) === 0 ||
      alreadyRegistered
    );
  }, [
    alreadyRegistered,
    targetSource.amount,
    targetSource.name,
    targetSource.saltWeight,
  ]);

  const props = {
    sources,
    modalOpen,
    isRegister,
    registerOpen,
    modalClose,
    targetSource,
    lineDelete,
    updateOpen,
    onChangeName,
    onChangeUnit,
    onChangeAmount,
    onChangeSaltWeight,
    register,
    disabled,
    alreadyRegistered,
  };
  return <SourcesPage {...props} />;
};

export default SourcesPageContainer;
