const { app, BrowserWindow, ipcMain, dialog } = require('electron')
var crypto = require("crypto-js");

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: __dirname + '/resources/icons/winicon.ico'
    })

    // and load the index.html of the app.
    win.loadFile('index.html')

    win.on('close', (event) => {
        var choice = dialog.showMessageBox({
            message: "Are you sure you want to close this window?",
            buttons: ["Yes", "No"],
            title: 'Close window'
        });
        if (choice == 1) {
            event.preventDefault();
        }
    })
}

ipcMain.on('form-submission', (event, reqObj) => {
    var response;
    if (reqObj.userAction == "encrypt") {
        response = encryptMe(reqObj.text, reqObj.key)
    } else {
        response = decryptMe(reqObj.text, reqObj.key)
    }
    event.sender.send('form-submission-response', response)
})

app.on('ready', createWindow)

function encryptMe(data, key) {
    var encryptedData = crypto.AES.encrypt(data, key);
    var encryptedStr = encryptedData.toString();
    return encryptedStr;
}

function decryptMe(encryptedData, key) {
    var decryptedData = crypto.AES.decrypt(encryptedData, key);
    var decryptedDataStr = decryptedData.toString(crypto.enc.Utf8);
    return decryptedDataStr;
}
