'use strict';

angular.module("Trabajo_login", [])
    .controller("main_ctlr", function ($scope, $http) {

        $scope.host = "http://localhost:8080";
        // $scope.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmE3N2E3MGQyZGI0YTJiZjI3NTcwNzQiLCJpYXQiOjE2NTU2MjQwMDEsImV4cCI6MTY1NTY0MjAwMX0.3M9ITt3shDmMgT7tULFtfCNPGtvOaTeEUns-lxQqaGM";

        $scope.hola = function() {
            console.log('HOLA');
        }
        
        $scope.log = function () {
            console.log($scope.login.correo);
            console.log($scope.login.text);

            const obj = {
                correo: $scope.login.correo,
                password: $scope.login.password.$viewValue
            }

            console.log(obj);
            $http({
                method: 'POST',
                url: $scope.host + '/api/auth/login',
                data: JSON.stringify(obj),
            }).then(function (result) {
                console.log(result);
                if (result.data.hasOwnProperty('msg')) {
                    alert('CREDENCIALES INVÁLIDOS');
                } else {
                    if (result.data.usuario.rol == "ADMIN_ROLE") {
                        sessionStorage.setItem("tokenAdmin", result.data.token)
                        window.location.href = "CRUD.html";
                    }
                    else {
                        sessionStorage.setItem("tokenUser", result.data.token)
                        window.location.href = "videos.html";
                    }
                }
            })
                .catch(function (error) { console.log(error); })
        }

    });