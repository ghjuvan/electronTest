"use strict";

const remote = require('electron').remote;
const dialog = remote.dialog;


angular
    .module('main', ['firebase'])
    .controller('loginController', function ($scope, $firebaseArray) {

        var ref = new Firebase('https://electronjs.firebaseio.com/rooms');

        $scope.rooms = $firebaseArray(ref);
        $scope.newRoom = '';


        $scope.createRoom = function (name) {
            $scope.rooms.$add({name: name}).then(function () {
                dialog.showMessageBox({ message: `La room ${name} a bien été créée`, buttons: [`CIMER ALBERT`] });
            });
        };


    });