"use strict";

const remote = require('electron').remote;
const dialog = remote.dialog;
const notifier = require('node-notifier');
const path = require('path');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');

angular
    .module('main', ['firebase'])
    .controller('loginController', function ($scope, $firebaseArray, $http) {

        $scope.notify = function (title, message) {
            notifier.notify({ title: title,
                message: message,
                sound: true,
                contentImage:  '/Users/ghjuvan/Documents/projectsWS/electronTest/app/front/img/garage56.png',
                icon:  '/Users/ghjuvan/Documents/projectsWS/electronTest/app/front/img/garage56.png',
                wait: false
            });
        };

        var menu = new Menu();
        menu.append(new MenuItem({
            label: 'Notifier', click: function () {
                $scope.notify('Super Notification', 'il fait beau')
            }
        }));


        window.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            menu.popup(remote.getCurrentWindow());
        }, false);

        var ref = new Firebase('https://electronjs.firebaseio.com/rooms');

         $http.get('../../../local/credential.json').success(function (user) {
             $scope.user = user.password.email;
         });

        $scope.rooms = $firebaseArray(ref);
        $scope.newRoom = '';

        $scope.createRoom = function (name) {
            $scope.rooms.$add({name: name}).then(function () {
                dialog.showMessageBox({ message: `La room ${name} a bien été créée`, buttons: [`CIMER ALBERT`] });
            });
        };
    });