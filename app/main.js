'use strict';

const electron = require('electron');
const app = electron.app;
const ipcMain = require('electron').ipcMain;
const dialog = require('electron').dialog;
const Menu = require("menu");

const trayManager = require('./mainProcesses/trayManager');
const templateMenu = require('./mainProcesses/menus');
const loginWindow = require('./mainProcesses/login.window');
const mainWindow = require('./mainProcesses/chat.window');

const angularDir = 'file://' + __dirname + '/front/';


app.on('ready', function(){

    trayManager.create(__dirname + '/favicon/favicon.png');
    
    var login = loginWindow.createWindow(angularDir);

    ipcMain.on('closeLogin', function(e, authData) {
        login.close();
        mainWindow.createWindow(angularDir, authData);
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate(templateMenu.menu));

});


ipcMain.on('errorLogin', function(event, arg) {
    console.log(arg);
    dialog.showErrorBox(arg.title, arg.message);
});

ipcMain.on('openDialog', function(event, arg) {
    dialog.showMessageBox({ message: arg, buttons: ["OK"] });
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