"use strict";

const remote = require('electron').remote;
const dialog = remote.dialog;


angular
    .module('main', ['firebase'])
    .controller('loginController', function ($scope, $firebaseArray, $http) {

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