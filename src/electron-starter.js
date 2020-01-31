// @ts-ignore
let { app, BrowserWindow, Menu, MenuItem, webContents } = require('electron')


function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true
    }
  })


  // and load the index.html of the app.
  win.loadURL('http://localhost:3000/')
}

app.on('ready', createWindow)