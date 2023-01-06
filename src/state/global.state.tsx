import { createContext, useContext } from "react";
import { LanguageType } from "../utils";
import {
  IDestinationFolder,
  IOriginFolder,
  IRecentlyMovedFolder,
} from "./../models";

export interface IGlobalState {
  recentlyMovedFolders: IRecentlyMovedFolder[];
  originFolders: IOriginFolder[];
  destinationFolders: IDestinationFolder[];
  language: LanguageType; // TODO: Update this to a type
  appVersion: string;
  autoLaunch: boolean;
  canMoveFiles: boolean;
  generalNotifications: boolean;
  archivesNotifications: boolean;
}

export type IGlobalStateContext = {
  state: IGlobalState;
  setState: (c: IGlobalState) => void;
};

export const initialState: IGlobalState = {
  canMoveFiles: true,
  autoLaunch: true,
  recentlyMovedFolders: [],
  originFolders: [],
  destinationFolders: [],
  language: "en-US",
  generalNotifications: true,
  archivesNotifications: true,
  appVersion: "2.0.0",
};

// TODO: get the intial state from the JSON config file.
export const StateContext = createContext<IGlobalStateContext>({
  state: initialState, // set a default value
  setState: () => {
    return;
  },
});

export const useStateContext = () => useContext(StateContext);
