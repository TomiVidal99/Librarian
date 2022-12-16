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
  // TODO: maybe add custom properties instead of just the foldername and the folderpath?
  // customProp: [string, string][] (string of tuples)
  // if (customProp) {
  //   customProp.forEach(([pattern, value]) => {
  //     body.replace(pattern, value)
  //   })
  // }
  window.api.popWarning(
    title.replace(/^\w/, (c) => c.toUpperCase()),
    fullBody
  );
};
