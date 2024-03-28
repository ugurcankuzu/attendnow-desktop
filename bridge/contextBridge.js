const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("userEvents", {
  writeJWT: (jwtToken) => {
    ipcRenderer.send("writeJWT", jwtToken);
  },
  getJWTFromUserData: () => ipcRenderer.send("getJWTFromUserData"),
  onGetJWTFromUserData: (callback) =>
    ipcRenderer.on("JWTFromUserData", (event, jwtToken) => callback(jwtToken)),
  getIPAddress: () => ipcRenderer.send("getIPAddress"),
  onGetIPAddress: (callback) =>
    ipcRenderer.on("IPAddress", (event, address) => callback(address)),
});
