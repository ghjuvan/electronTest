"use strict";

const ipcRenderer = require('electron').ipcRenderer;

angular
    .module('login', ['firebase'])
    .controller('loginController', function ($scope) {
        var ref = new Firebase('https://electronjs.firebaseio.com');

        $scope.user = {
            email: '',
            password: ''
        };

        $scope.wait = false;

        $scope.connect = function () {
            if ($scope.user.email && $scope.user.password) {
                $scope.wait = true;

                ref.authWithPassword({
                    email: $scope.user.email,
                    password: $scope.user.password
                }, function (error, authData) {
                    if (error) {
                        ipcRenderer.send('errorLogin', {message: error.code, title: 'Login Failed!'});
                        $scope.$apply(function () {
                            $scope.wait = false;
                        })
                    } else {
                        ref.child("users")
                            .child(authData.uid)
                            .set({
                                provider: authData.provider,
                                mail: authData.password.email
                            }, function () {
                                ipcRenderer.send('closeLogin', authData);
                            });
                    }
                });
            }

        };

    });