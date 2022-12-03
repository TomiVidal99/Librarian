export interface IFilter {
  id: string;
  type: FilterType;
  content: string;
  priority: number;
}

export type FilterType = "format" | "name" | "regex";
