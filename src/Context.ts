import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useReducer,
} from "react";
import { Availability, Group, Month, Source } from "./data";

type Filters = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  month: Month;
  groups: Set<Group>;
  availability: Set<Availability>;
  sources: Set<Source>;
  setMonth: Dispatch<SetStateAction<Month>>;
  toggleGroup: (group: Group) => void;
  toggleAvailability: (availability: Availability) => void;
  toggleSource: (source: Source) => void;
  nextMonth: () => void;
  previousMonth: () => void;
};

export const Context = createContext({} as Filters);

export const useFilterSet = <T>(initial: T[]): [Set<T>, (item: T) => void] =>
  useReducer((state: Set<T>, value: T) => {
    const newState = new Set(state);
    if (newState.has(value)) {
      newState.delete(value);
    } else {
      newState.add(value);
    }
    return newState;
  }, new Set<T>(initial));

export const useFilters = () => useContext(Context);

export default Context;
