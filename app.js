const {app, BrowserWindow} = require('electron');

let appWindow;

function createWindow() {
    appWindow = new BrowserWindow({
        width: 1280,
        height: 720,
    })
    appWindow.loadFile('./dist/fastbites/browser/index.html');

    appWindow.on('closed', function() {
        appWindow = null
    });
}

app.whenReady().then(() => {
    createWindow()
});