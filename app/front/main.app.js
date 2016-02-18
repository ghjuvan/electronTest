"use strict";

const ipcRenderer = require('electron').ipcRenderer



angular
    .module('main', ["firebase"])
    .controller('loginController', function ($scope, $firebaseArray) {
        var ref = new Firebase("https://addstones.firebaseio.com/example");

        $scope.messages = $firebaseArray(ref);

        $scope.newMessage = "";

        $scope.addMessage = function(message) {
            $scope.messages.$add({
                text: message
            });

            $scope.newMessage = "";
        };

        $scope.testDialog = function () {
            ipcRenderer.send('openDialog', 'super message');
        }

    });