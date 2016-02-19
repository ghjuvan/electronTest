'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create({path:'app/main.js'});

gulp.task('serve', function () {

    // Start browser process
    electron.start();

    // Restart browser process
    gulp.watch(['app/windows/**.js', 'app/main.js'], electron.restart);

    // Reload renderer process
    gulp.watch(['app/front/**.js', 'app/windows/**/**.html'], electron.reload);
});