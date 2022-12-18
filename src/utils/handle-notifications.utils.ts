import { Notification } from "electron";
import path from "path";
import { store } from "..";
import { getState } from ".";
import { INotification } from "../models";

export const sendNotification = (data: INotification): void => {
  const { title, body, type, clickcallback } = data;
  const state = getState(store);

  // only enable the notification if the user has it enabled
  if (!state.generalNotifications && type !== "move-file") return;
  if (!state.archivesNotifications && type === "move-file") return;

  const noti = new Notification({
    title,
    body,
    icon: path.join(__dirname, "assets/icons/64x64.png"),
  });
  if (clickcallback) {
    noti.addListener("click", () => {
      console.log("clicked the notification");
      clickcallback(data);
    });
  }
  noti.show();
};
