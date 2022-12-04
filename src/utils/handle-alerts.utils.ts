export const warningAlert = ({
  title,
  body,
  foldername,
  folderpath,
}: {
  title: string;
  body: string;
  foldername: string;
  folderpath: string;
}): void => {
  const fullBody = body
    .replace("%foldername", foldername)
    .replace("%folderpath", folderpath)
    .replace(/^\w/, (c) => c.toUpperCase());
  window.api.popWarning(title, fullBody);
};
