export const getFolderName = (path: string): string => {
  const name = path.match(/([^\/]*)\/*$/)[1];
  return name;
};
