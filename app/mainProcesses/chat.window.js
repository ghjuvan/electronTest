"use strict";

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const fs = require("fs");

exports.createWindow = function(dirName, authData) {

    fs.writeFile('./app/local/credential.json', JSON.stringify(authData));

    var mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: dirName + '/img/garage56.png'
    });


    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(dirName + '/chat/chat.html');

    mainWindow.isAlwaysOnTop(true);
    mainWindow.center();

    mainWindow.on('closed',function() {
        mainWindow = null;
    });

    return mainWindow;
};