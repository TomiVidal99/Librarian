import { IFilter } from "./filter.model";

export interface IRecentlyMovedFolder {
  name: string;
  origin: string;
  destination: string;
  time: Date;
}
export interface IOriginFolder {
  name: string;
  path: string;
  date: Date;
}
export interface IDestinationFolder {
  folder: string;
  path: string;
  date: Date | string;
  filters: IFilter[];
}
