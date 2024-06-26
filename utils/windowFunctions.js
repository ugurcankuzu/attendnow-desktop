const { BrowserWindow, app } = require("electron");
const path = require("path");
function createWindow(width = 800, height = 600, preload, resize = true) {
  const win = new BrowserWindow({
    icon: path.join(app.getAppPath(), "icons", "icon.icns"),
    width: width,
    height: height,
    resizable: resize,
    titleBarStyle: "hidden",
    webPreferences: {
      sandbox: true,
      nodeIntegration: true,
      preload: preload
        ? path.join(app.getAppPath(), "bridge", preload)
        : undefined,
    },
  });
  return win;
}

function closeWindow(win) {
  win.close();
}

module.exports = { createWindow };
