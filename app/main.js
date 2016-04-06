'use strict';

const electron = require('electron');
const app = electron.app;
const ipcMain = require('electron').ipcMain;
const dialog = require('electron').dialog;

const loginWindow = require('./mainProcesses/login.window.js');
const mainWindow = require('./mainProcesses/chat.window.js');

const angularDir = 'file://' + __dirname + '/front/';


app.on('ready', function(){

    var login = loginWindow.createWindow(angularDir);

    ipcMain.on('closeLogin', function(e, authData) {
        login.close();
        mainWindow.createWindow(angularDir, authData);
    });

});


ipcMain.on('errorLogin', function(event, arg) {
    console.log(arg);
    dialog.showErrorBox(arg.title, arg.message);
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