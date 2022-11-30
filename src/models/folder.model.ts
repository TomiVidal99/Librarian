import { IFilter } from "./filter.model";

export interface IRecentlyMovedFolder {
  id: string;
  name: string;
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
  folder: string;
  path: string;
  date: Date | string;
  filters: IFilter[];
}
