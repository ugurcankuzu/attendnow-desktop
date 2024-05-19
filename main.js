const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const express = require("express");
const path = require("path");
const expressApp = express();
const port = 5000;
const { createWindow } = require("./utils/windowFunctions");
const {
  createUserDataFileIfNotExists,
  writeTokenInUserData,
  getTokenFromUserData,
} = require("./utils/userData");
const {
  startServer,
  stopServer,
  isServerActive,
  getIpAddress,
  getIPAddress,
  server,
} = require("./expressApp");
global.ipcMain = ipcMain;
const sourceURL = "https://attendnow-front.vercel.app";
app.whenReady().then(() => {
  const win = createWindow(1024, 768, "contextBridge.js", false);
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: app.name,
        submenu: [
          { role: "forceReload", label: "Reload Application" },
          { type: "separator" },
          { role: "quit", label: "Close AttendNow" },
        ],
      },
    ])
  );

  win.loadURL(sourceURL);
});

ipcMain.on("writeJWT", async (event, jwtToken) => {
  await writeTokenInUserData(jwtToken);
  BrowserWindow.getAllWindows()[0].webContents.send("writeJWTEnd");
});

ipcMain.on("getJWTFromUserData", async () => {
  const jwtToken = await getTokenFromUserData();
  BrowserWindow.getAllWindows()[0].webContents.send(
    "JWTFromUserData",
    jwtToken
  );
});

ipcMain.on("startServer", () => {
  startServer();
});
ipcMain.on("stopServer", () => {
  stopServer();
});
ipcMain.on("checkServer", () => {
  isServerActive();
});
ipcMain.on("getIPAddress", () => {
  getIPAddress();
});
