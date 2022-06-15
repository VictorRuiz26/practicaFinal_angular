'use strict';

const { get } = require("mongoose");

// al angula.module se le pone el nombre del módulo y como segundo argumento las dependencias de otros módulos de angular
/**
 * controller es otro objeto que se crea, contiene el scope que se encarga de cambiar las vistas y demás
 * Se le pasa como segundo parámetro una función a la que angular le pasará un objeto ($scope) que es 
 * donde se encargará de colocar los objetos del modelo que se hagan referencia en la vista
 */
angular.module("Trabajo", [])
    .controller("main_ctlr", function ($scope) {

        $scope.host = "http://localhost:8080";

        $scope.initialize = function () {
            $scope.nombre = "Juan";
            $scope.subjects = [
                { id: 504104013, name: 'LABORATORIO DE INGENIERÍA DE SOFTWARE', semester: 'C2', ects: 6, dpt: 'TIC' },
                { id: 504104014, name: 'TEORÍA DE ONDAS', semester: 'C1', ects: 6, dpt: 'Electromagnetismo' },
                { id: 504104015, name: 'CÁLCULO DIFERENCIAL', semester: 'C1', ects: 6, dpt: 'Matemáticas' }
            ];
        };

        $scope.cerrarSesion = function () {
            console.log('ESTAMOS CON ANGULAR LOCO');
            sessionStorage.clear()
            // sessionStorage.removeItem('tokenUser');
            window.location.href = "login.html";
        }

        /**
         * Cuidado que si pusiéramos en la linea de arriba }(); para ejecutar esa misma funcion lo que se hace
         * es asignar a la propiedad initialize el valor de retorno de la funcion.
         * Luego no podríamos ejecutar la funcion 
         *  
         */

        $scope.initialize();
    })

    .controller("usuarios", function ($scope, $http) {
        $scope.user = {};
        $scope.usuarios = [];

        $scope.crearUsuario = function () {

            $http({
                method: 'POST',
                url: $scope.host + '/api/users',
                data: JSON.stringify($scope.user),
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmE3N2E3MGQyZGI0YTJiZjI3NTcwNzQiLCJpYXQiOjE2NTUzMTEyOTUsImV4cCI6MTY1NTMyOTI5NX0.K8an0j7B044cRYwUFLETIUwZPvS00Euzafz057jH1fw'
                }
            }).then(function (response) { console.log(response);}) // if http code == 200
                .catch(function (error) { console.log(error); }) // else
        };

        $scope.getUsuarios = function() {
            $http({
                method: get,
                url: $scope.host + 'api/users',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmE3N2E3MGQyZGI0YTJiZjI3NTcwNzQiLCJpYXQiOjE2NTUzMTEyOTUsImV4cCI6MTY1NTMyOTI5NX0.K8an0j7B044cRYwUFLETIUwZPvS00Euzafz057jH1fw'
                }
            })
        };

        $scope.getUsuarios();
    });