import { IGlobalState } from "../state";
import Store from "electron-store";

export const saveState = (
  store: Store<Record<string, unknown>>,
  state: IGlobalState
): void => {
  store.set("state", state);
};
