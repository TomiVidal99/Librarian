import Store from "electron-store";
import { IGlobalState } from "../state";
import { getState } from ".";

export const resetState = (store: Store<Record<string, unknown>>): IGlobalState => {
  store.delete("state");
  return getState(store);
};
