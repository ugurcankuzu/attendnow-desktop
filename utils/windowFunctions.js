const { BrowserWindow } = require("electron");
function createWindow(width = 800, height = 600, resize = true) {
  const win = new BrowserWindow({
    width: width,
    height: height,
    resizable: resize,
    webPreferences: {
      sandbox: true,
      nodeIntegration: true,
    },
  });
  return win;
}

module.exports = {createWindow}