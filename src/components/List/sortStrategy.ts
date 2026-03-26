import { asc, type SQL } from "drizzle-orm";
import { category, person } from "../../../drizzle/schema";

export const SortStrategy = {
  Name: "name",
  Age: "age",
  Category: "category",
} as const;
export type SortStrategy = (typeof SortStrategy)[keyof typeof SortStrategy];

export const sortName: { [K in SortStrategy]: string } = {
  [SortStrategy.Name]: "Name",
  [SortStrategy.Age]: "Age",
  [SortStrategy.Category]: "Category",
};

export const sortFunctions: { [K in SortStrategy]: SQL[] } = {
  [SortStrategy.Name]: [asc(person.name)],
  [SortStrategy.Age]: [asc(person.age), asc(person.name)],
  [SortStrategy.Category]: [asc(category.name), asc(person.name)],
};

export function isSortStrategy(candidate: unknown): candidate is SortStrategy {
  return Object.values(SortStrategy).includes(candidate as SortStrategy);
}
