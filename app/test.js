console.log(process);

//console.log(nodeRequire.resolve('electron'));


const ipcRenderer = require('electron').ipcRenderer;


ipcRenderer.send('openDialog', 'ping');