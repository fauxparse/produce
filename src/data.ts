import { keys, uniq } from "lodash-es";
import data from "./data.json";

export type Availability = "available" | "limited" | "unavailable";
export type Source = "local" | "imported";
export type Month = keyof (typeof data)[number]["months"];
export type Produce = (typeof data)[number] & {
  months: { [key in Month]: "unavailable" | `${Availability}.${Source}` };
};
export type Group = Produce["group"];

export const MONTHS = keys(data[0].months) as Month[];
export const GROUPS = uniq(data.map((p) => p.group)) as Group[];
export const AVAILABILITY = [
  "available",
  "limited",
  "unavailable",
] as Availability[];
export const SOURCES = ["local", "imported"] as Source[];

export default data as Produce[];
