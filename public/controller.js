'use strict';

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

        // $scope.initialize();
    })

    .controller("usuarios", function ($scope, $http) {
        $scope.user = {};
        $scope.usuarios = [];

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmE3N2E3MGQyZGI0YTJiZjI3NTcwNzQiLCJpYXQiOjE2NTU0ODAzMDcsImV4cCI6MTY1NTQ5ODMwN30.LjmJ_ANQwEygDJ_lQ5K5dmm1uav-fh82CbyGqeMMrVI";

        $scope.modificarUsuario = function () {

            $http({
                method: 'PUT',
                url: $scope.host + '/api/users/' + $scope.user.uid,
                data: JSON.stringify($scope.user),
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(function (response) {
                $scope.user = {};
                console.log(response);
                $scope.getUsuarios();
            }).catch(function (error) {
                console.log(error);
            })

        };

        $scope.crearUsuario = function () {

            $http({
                method: 'POST',
                url: $scope.host + '/api/users',
                data: JSON.stringify($scope.user),
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(function (response) {
                $scope.user = {};
                console.log(response);
                $scope.getUsuarios();
            })
                .catch(function (error) { console.log(error); })
        };

        $scope.getUsuarios = function () {

            $http({
                method: "GET",
                url: $scope.host + '/api/users',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(function (response) {
                $scope.usuarios = response.data.productos;
                console.log(response);
            }).catch(function (error) {
                console.error(error);
            })
        };


        $scope.borrarUsuario = function () {

            navigator.clipboard.readText()
            .then(text => {
                
                    const ok = window.confirm("¿Estás seguro de que deseas eliminar al usuario " + text + "?");
                    if (ok) {
                        $http({
                            method: 'DELETE',
                            url: $scope.host + '/api/users/' + text,
                            headers: {
                                'Content-Type': 'Application/json',
                                'Authorization': 'Bearer ' + token
                            }
                        }).then(function (response) {
                            $scope.user = {};
                            console.log(response);
                            $scope.getUsuarios();
                        }).catch(function (error) {
                            console.log(error);
                        })
                    }
                    console.log('Pasted content: ', text);
                })
                .catch(err => {
                    
                    console.error('Failed to read clipboard contents: ', err);


                });


        }


        $scope.getUsuarios();
    });