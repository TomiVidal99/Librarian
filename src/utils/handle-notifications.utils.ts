import { Notification } from "electron";
import path from "path";
import { INotification } from "../models";

export const sendNotification = (data: INotification): void => {
  const { title, body, clickcallback } = data;
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
