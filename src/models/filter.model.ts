export interface IFilter {
  type: FilterType;
  content: string;
  priority: number;
  id: string;
}

export type FilterType = "format" | "name" | "regex";
