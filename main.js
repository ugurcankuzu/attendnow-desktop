const { app, BrowserWindow, ipcMain } = require("electron");
const { createWindow } = require("./utils/windowFunctions");
const {
  createUserDataFileIfNotExists,
  writeTokenInUserData,
  getTokenFromUserData,
} = require("./utils/userData");
global.ipcMain = ipcMain;
const sourceURL = "http://localhost:3000";

app.whenReady().then(() => {
  const win = createWindow(1024, 768, "contextBridge.js", false);
  win.loadURL(sourceURL);
});

ipcMain.on("writeJWT", (event, jwtToken) => {
  writeTokenInUserData(jwtToken);
});

ipcMain.on("getJWTFromUserData", () => {
  const jwtToken = getTokenFromUserData();
  BrowserWindow.getAllWindows()[0].webContents.send(
    "JWTFromUserData",
    jwtToken
  );
});
