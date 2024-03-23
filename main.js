const { app, BrowserWindow } = require("electron");
const { createWindow } = require("./utils/windowFunctions");
const sourceURL = "http://localhost:3000";

app.whenReady().then(() => {
  const win = createWindow(1024, 768, false);
  win.loadURL(sourceURL);
});
