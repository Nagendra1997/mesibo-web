// app.js
//Single Instance of Main Application
const MesiboDemoApp = new MesiboAppCore();

const MESIBO_ACCESS_TOKEN = "e60d6f7b32f5508e9b95696ef53c1a1d09baf4896e3e33ff2d8";
const MESIBO_APP_ID = "console";

MesiboDemoApp.setAccessToken(MESIBO_ACCESS_TOKEN);
MesiboDemoApp.setAppId(MESIBO_APP_ID);

MesiboDemoApp.init()
MesiboDemoApp.start();
