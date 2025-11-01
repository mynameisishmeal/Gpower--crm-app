// renderer.js
const { electron } = window;

const ipcRenderer = electron.ipcRenderer;

// Example IPC communication from renderer to main process
ipcRenderer.send('some-message', data);

// Example IPC communication from main process to renderer
ipcRenderer.on('some-reply', (event, arg) => {
  console.log('Received reply from main process:', arg);
});
