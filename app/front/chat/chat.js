"use strict";

const ipcRenderer = require('electron').ipcRenderer;



angular
    .module('main', ["firebase"])
    .controller('loginController', function ($scope, $firebaseArray) {
        console.log('test');
        var ref = new Firebase("https://electronjs.firebaseio.com/rooms");

        $scope.rooms = $firebaseArray(ref);
        $scope.newRoom = '';


        $scope.createRoom = function (name) {
            console.log('rooms');
            $scope.rooms.$add({name: name})
        };

        /*$scope.addMessage = function(message) {
            $scope.messages.$add({
                text: message
            });

            $scope.newMessage = "";
        };
        $scope.dialogMessage = '';


        $scope.testDialog = function () {
            ipcRenderer.send('openDialog', $scope.dialogMessage);
        }*/

    });