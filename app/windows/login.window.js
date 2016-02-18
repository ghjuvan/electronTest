"use strict";

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;


exports.createWindow = function() {

    var insertWindow = new BrowserWindow({
        width: 500,
        height: 300
    });


    insertWindow.webContents.openDevTools();
    insertWindow.loadURL('file://' + __dirname + '/template/login.html');

    insertWindow.isAlwaysOnTop(true);
    insertWindow.center();

    insertWindow.on('closed',function() {
        insertWindow = null;
    });

    return insertWindow;
};