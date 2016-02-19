'use strict';

const electron = require('electron');
const app = electron.app;
const ipcMain = require('electron').ipcMain;
const dialog = require('electron').dialog;

const loginWindow = require('./windows/login.window.js');
const mainWindow = require('./windows/main.window.js');


app.on('ready', function(){

    var login = loginWindow.createWindow();

    ipcMain.on('closeLogin', function(event, arg) {
        login.close();
        var main = mainWindow.createWindow(arg);
    });

});


ipcMain.on('openDialog', function(event, arg) {
    dialog.showMessageBox({ message: arg,
        buttons: ["OK"] });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

