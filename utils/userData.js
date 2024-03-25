const fs = require("fs");
const { app, dialog } = require("electron");
const path = require("path");

function writeTokenInUserData(token) {
  const filePath = path.join(app.getAppPath(), "userData", "userData.json");
  fs.writeFileSync(filePath, JSON.stringify({ jwtToken: token }), (err) => {
    if (err) {
      dialog.showErrorBox(
        "User Credentials Error",
        "We cannot save your login credentials at the moment. Please try again"
      );
    }
  });
}
function getTokenFromUserData() {
  const filePath = path.join(app.getAppPath(), "userData", "userData.json");
  const file = JSON.parse(fs.readFileSync(filePath));
  return file.jwtToken;
}
module.exports = { writeTokenInUserData, getTokenFromUserData };
