import { isSortStrategy, SortStrategy } from "./sortStrategy";

export const filterDefaults = {
  sort: SortStrategy.Name,
  ageFrom: 0,
  ageTo: 100,
  pageNum: 1,
};

export const filterLimits = {
  ageFrom: { min: 0, max: 100 },
  ageTo: { min: 0, max: 100 },
  category: { min: 1, max: 2_000_000 },
  size: { min: 1, max: 1_000 },
  pageNum: { min: 1, max: 2_000_000 },
};

export interface Filters {
  sticky: boolean;
  sort: SortStrategy;
  ageFrom: number;
  ageTo: number;
  categories: number[];
  size: number;
  pageNum: number;
}

export interface Config {
  sticky?: boolean;
  size: number;
}

export function parseParams(
  url: URL,
  { sticky, size }: Config,
): Config & Filters {
  const params = url.searchParams;
  const sortParam = params.get("sort");

  const categories = params
    .getAll("category")
    .map((id) => parseNum(id, filterLimits.category, undefined))
    .filter((id) => id !== undefined);

  return {
    sticky: sticky ?? params.get("sticky") === "true",
    sort: isSortStrategy(sortParam) ? sortParam : filterDefaults.sort,
    ageFrom: parseNum(
      params.get("age_from"),
      filterLimits.ageFrom,
      filterDefaults.ageFrom,
    ),
    ageTo: parseNum(
      params.get("age_to"),
      filterLimits.ageTo,
      filterDefaults.ageTo,
    ),
    categories,
    size: parseNum(params.get("size"), filterLimits.size, size),
    pageNum: parseNum(
      params.get("page_num"),
      filterLimits.pageNum,
      filterDefaults.pageNum,
    ),
  };
}

function parseNum<T>(
  candidate: string | null,
  limits: { min: number; max: number },
  def: T,
): number | T {
  if (candidate === null) return def;
  const num = Number.parseInt(candidate);
  if (Number.isSafeInteger(num) && limits.min <= num && num <= limits.max)
    return num;
  return def;
}
