"use strict";

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;


exports.createWindow = function(dirName) {

    var insertWindow = new BrowserWindow({
        width: 500,
        height: 500
    });


    insertWindow.webContents.openDevTools();
    insertWindow.loadURL(dirName + '/login/login.html');

    insertWindow.isAlwaysOnTop(true);
    insertWindow.center();

    insertWindow.on('closed',function() {
        insertWindow = null;
    });

    return insertWindow;
};