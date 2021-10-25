declare type FiltersType = 'format' | 'name' | 'regex';
declare interface FilterType {
  type: FiltersType;
  content: string;
  id: string;
}
declare interface StateType {
  recentlyMoved: RecentlyMovedType[];
  watchedFolders: WatchedFolderType[];
  destinationFolders: DestinationFolderType[];
  appVersion: string;
  language: string;
  generalNotifications: boolean;
  archivesNotifications: boolean;
}
declare interface RecentlyMovedType {
  name: string;
  origin: string;
  destination: string;
  time: Date;
}
declare interface WatchedFolderType {
  name: string;
  path: string;
  date: Date;
}
declare interface DestinationFolderType {
  folder: string;
  path: string;
  date: Date | string;
  filters: FilterType[];
}
declare interface SelectedFoldersType {
  canceled: boolean;
  filePaths: string[];
}
declare type ChannelType = string;

// TODO declare better types on this interface
declare interface IpcRendererMethodsType {
  send: (arg0: ChannelType) => void;
  clearState: () => void;
  openFolder: (arg0: ChannelType) => void;
  onNewRecentlyMoved: (arg0: any) => void;
  removeWatched: () => void;
  getWatched: () => void;
  selectFolders: (arg0: any, arg1: any) => void;
  notification: (arg0: string, arg1: string) => void;
  onNewDestinationFolder: (arg0: any) => void;
  sendNewDestinationFolder: (arg0: any) => void;
  openDestinationFolderMenu: () => void;
  uploadState: (arg0: StateType) => void;
  getInitialState: (arg0: any) => void;
  on: (arg0: ChannelType, arg1: any) => void;
  once: (arg0: ChannelType, arg1: any) => void;
}
