const express = require("express");
const expressApp = express();
const port = 5000;
const path = require("path");
const ip = require("ip");
const { BrowserWindow } = require("electron");

expressApp.use(express.static(path.join(__dirname, "student")));
expressApp.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"));
});
expressApp.get("/counter", (req, res) => {
  res.status(200).sendFile(path.join(__dirname,"student", "counter.html"));
});
const server = expressApp.listen(port, (req, res) => {
  console.log("Starting server: ", port);
});

const getIPAddress = () => {
  BrowserWindow.getAllWindows()[0].webContents.send("IPAddress", ip.address());
};
/**function startServer() {
  if (!server) {
    expressApp.listen(port, () => {
      console.log("Starting server: ", port);
      console.log("server listening on port " + port);
      const currentIp = ip.address();
      BrowserWindow.getAllWindows()[0].webContents.send(
        "serverStarted",
        currentIp
      );
    });
  } else {
    console.log("Already listening");
  }
}
function isServerActive() {
  const status = server ? true : false;
  BrowserWindow.getAllWindows()[0].webContents.send("checkedServer", status);
}
function getIpAddress() {
  BrowserWindow.getAllWindows()[0].webContents.send("IPAddress", ip.address());
}
function stopServer() {
  server.close();
  BrowserWindow.getAllWindows()[0].webContents.send("stoppedServer");
  server = null;
}

function getExpressApp() {
  return expressApp;
} */

module.exports = {
  getIPAddress,
  server,
};
