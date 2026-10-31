import { useMemo } from "react";
import { selectAdapters } from "../shared/types/selectAdapters";

export interface SelectOption {
    value: string; 
    label: string;
}

export default function useOptions(
  items: any[],
  adapterKey: keyof typeof selectAdapters
): SelectOption[] {
  const { getValue, getLabel } = selectAdapters[adapterKey];

  return useMemo(
    () =>
      items.map((item) => ({
        value: getValue(item),
        label: getLabel(item),
      })),
    [items, adapterKey]
  );
}