'use strict';

const electron = require('electron');
const app = electron.app;
const ipcMain = require('electron').ipcMain;
const dialog = require('electron').dialog;

const Menu = require("menu");
const MenuItem = require('menu-item');
const Tray = require('tray');

const BrowserWindow = require('browser-window');
const templateMenu = require('./mainProcesses/menus');
const loginWindow = require('./mainProcesses/login.window');
const mainWindow = require('./mainProcesses/chat.window');

const angularDir = 'file://' + __dirname + '/front/';


app.on('ready', function(){

    var appIcon = new Tray(__dirname + '/favicon/favicon.png');

    var trayContextMenu = new Menu();

    trayContextMenu.append(new MenuItem({ label: 'Toggle Developer Tool', click: function() {
        var targetWindow = BrowserWindow.getAllWindows()[0];
        targetWindow.toggleDevTools(); }
    }));
    trayContextMenu.append(new MenuItem({ label: 'Reload',
        click: function() {
            var targetWindow = BrowserWindow.getAllWindows()[0];
            targetWindow.reload(); }
    }));
    trayContextMenu.append(new MenuItem({ label: 'Quit',
        click: function() { app.quit();
        } }));

    appIcon.setToolTip('Garage 56 Chat');
    appIcon.setContextMenu(trayContextMenu);


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