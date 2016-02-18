"use strict";

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

exports.createWindow = function(cookie) {

    var mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });


    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('file://' + __dirname + '/template/index.html');

    mainWindow.isAlwaysOnTop(true);
    mainWindow.center();

    mainWindow.on('closed',function() {
        mainWindow = null;
    });

    return mainWindow;
};