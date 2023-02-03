import { IFilter } from "./filter.model";

export interface IRecentlyMovedFolder {
  id: string;
  name: string;
  filter: IFilter;
  origin: string;
  destination: string;
  time: Date;
}
export interface IOriginFolder {
  id: string;
  name: string;
  path: string;
  date: Date;
}
export interface IDestinationFolder {
  id: string;
  name: string;
  path: string;
  date: Date | string;
  filters: IFilter[];
}
