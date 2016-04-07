const Menu = require("menu");
const MenuItem = require('menu-item');
const Tray = require('tray');
const BrowserWindow = require('browser-window');


exports.create = function (favicon) {
    var appIcon = new Tray(favicon);

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
};

