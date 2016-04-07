"use strict";

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;


exports.createWindow = function(dirName) {

    var loginWindow = new BrowserWindow({
        width: 500,
        height: 500
    });

    loginWindow.loadURL(dirName + '/login/login.html');

    loginWindow.isAlwaysOnTop(true);
    loginWindow.center();

    loginWindow.on('closed',function() {
        loginWindow = null;
    });

    return loginWindow;
};