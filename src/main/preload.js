const { contextBridge, ipcRenderer } = require('electron');

const ipcRendererMethods = {
  getAppVersion(callback) {
    const channel = 'get-app-version';
    ipcRenderer
      .invoke(channel)
      .then((response) => {
        callback(response);
        return true;
      })
      .catch((err) => {
        throw err;
      });
  },
  clearState() {
    const channel = 'delete-state';
    ipcRenderer.send(channel);
  },
  openFolder(folder) {
    const channel = 'open-folder';
    ipcRenderer.send(channel, folder);
  },
  onNewRecentlyMoved(callback) {
    const channel = 'get-recently-moved';
    ipcRenderer.on(channel, (event, data) => {
      callback(data);
    });
  },
  removeWatched() {
    const channel = 'remove-watched';
    ipcRenderer.send(channel);
  },
  getWatched() {
    const channel = 'get-watched';
    ipcRenderer
      .invoke(channel)
      .then((response) => {
        console.log('Watched folders: ', response);
        return true;
      })
      .catch((err) => {
        throw err;
      });
  },
  selectFolders(options, callback) {
    const channel = 'open-dialog-folders';
    ipcRenderer
      .invoke(channel, options)
      .then((res) => {
        callback(res);
        return true;
      })
      .catch((err) => {
        throw err;
      });
    ipcRenderer.removeAllListeners(channel);
  },
  notification(title, body) {
    const channel = 'notification';
    ipcRenderer.send(channel, title, body);
  },
  onNewDestinationFolder(callback) {
    const channel = 'main-to-renderer-destination-folder';
    ipcRenderer.on(channel, (event, folder) => {
      // console.log('got destination folder...', folder);
      callback(folder);
    });
  },
  sendNewDestinationFolder(folder) {
    const channel = 'renderer-to-main-destination-folder';
    ipcRenderer.send(channel, folder);
  },
  openDestinationFolderMenu() {
    const channel = 'open-destination-folder-menu';
    ipcRenderer.send(channel);
  },
  uploadState(newState) {
    const channel = 'upload-state';
    ipcRenderer.send(channel, newState);
  },
  getInitialState(callback) {
    const channel = 'get-initial-state';
    ipcRenderer
      .invoke(channel)
      .then((res) => {
        callback(res);
        return true;
      })
      .catch((err) => {
        throw err;
      });
    ipcRenderer.removeAllListeners(channel);
  },
  on(channel, func) {
    const validChannels = ['ipc-example', 'update-app-state'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  once(channel, func) {
    const validChannels = ['ipc-example'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
};
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRendererMethods,
});
