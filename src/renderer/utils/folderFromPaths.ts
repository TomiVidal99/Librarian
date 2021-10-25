export const helperGetFolderFromPath = (path: string): string => {
  const folder = path.split('/')[path.split('/').length - 1];
  // console.log('folder: ', folder);
  return folder;
};
