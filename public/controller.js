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
        $scope.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmE3N2E3MGQyZGI0YTJiZjI3NTcwNzQiLCJpYXQiOjE2NTU2NTY2MjEsImV4cCI6MTY1NTY3NDYyMX0.cFstifqoYkuAzn94al4OwUBgFhOBc6EsmqbgVs8DB18";

        $scope.cerrarSesion = function () {
            console.log('ESTAMOS CON ANGULAR');
            sessionStorage.clear()
            // sessionStorage.removeItem('tokenUser');
            window.location.href = "login.html";
        }
    })

    .controller("usuarios", function ($scope, $http) {
        $scope.user = {};
        $scope.usuarios = [];


        $scope.modificarUsuario = function () {

            $http({
                method: 'PUT',
                url: $scope.host + '/api/users/' + $scope.user.uid,
                data: JSON.stringify($scope.user),
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.user = {};
                // console.log(response);
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
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.user = {};
                // console.log(response);
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
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.usuarios = response.data.productos;
                // console.log(response);
            }).catch(function (error) {
                console.error(error);
            })
        };


        $scope.borrarUsuario = function () {

            navigator.clipboard.readText()
                .then(text => {

                    const ok = window.confirm("Asegurese de que ha copiado el ID el usuario correctamente\n" + 
                    "¿Está seguro de que deseas eliminar al usuario " + text + "?");
                    if (ok) {
                        $http({
                            method: 'DELETE',
                            url: $scope.host + '/api/users/' + text,
                            headers: {
                                'Content-Type': 'Application/json',
                                'Authorization': 'Bearer ' + $scope.token
                            }
                        }).then(function (response) {
                            $scope.user = {};
                            // console.log(response);
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
    })

    .controller("categorias", function ($scope, $http) {
        $scope.categoria = {};
        $scope.categorias = [];

        $scope.getCategorias = function () {
            // console.log('CONTROLADOR FUNCIONANDO EN TABS');

            $http({
                method: 'GET',
                url: $scope.host + '/api/categories',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.categoria = {};
                // console.log(response);
                $scope.categorias = response.data.productos;
            })
                .catch(function (error) { console.log(error); })

        }

        $scope.crearCategoria = function () {
            $http({
                method: 'POST',
                url: $scope.host + '/api/categories',
                data: JSON.stringify($scope.categoria),
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.categoria = {};
                // console.log(response);
                $scope.getCategorias();
            })
                .catch(function (error) { console.log(error); })
        };

        $scope.borrarCategoria = function () {
            console.log('Borrar categoria');
            navigator.clipboard.readText()
                .then(text => {

                    const ok = window.confirm("Asegurese de que ha copiado el ID de la categoria correctamente\n" + 
                    "¿Está seguro de que deseas eliminar la categoria " + text + "?");
                    if (ok) {
                        $http({
                            method: 'DELETE',
                            url: $scope.host + '/api/categories/' + text,
                            headers: {
                                'Content-Type': 'Application/json',
                                'Authorization': 'Bearer ' + $scope.token
                            }
                        }).then(function (response) {
                            $scope.categoria = {};
                            // console.log(response);
                            $scope.getCategorias();
                        }).catch(function (error) {
                            console.log(error);
                        })
                    }
                    console.log('Pasted content: ', text);
                })
                .catch(err => {

                    console.error('Failed to read clipboard contents: ', err);


                });
        };

        $scope.verCategoria = function (id, nombre) {
            console.log('Ver categoria');
            //TODO: hacer que se de valor al objeto categoria (scope.categoria) para que se muestre en el modal 
            // NO FUNCIONA 
            // console.log(id);
            // console.log(nombre);
            // $scope.categoriaShow._id = id;
            // $scope.categoriaShow.nombre = nombre;
            // console.log($scope.categoriaShow);
        };

        $scope.modificarCategoria = function () {
            // console.log('Modificar categoria');
            $http({
                method: 'PUT',
                url: $scope.host + '/api/categories/' + $scope.categoria._id,
                data: JSON.stringify($scope.categoria),
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.categoria = {};
                // console.log(response);
                $scope.getCategorias();
            }).catch(function (error) {
                console.log(error);
            })
        };

        $scope.getCategorias();
    })

    .controller("videos", function ($scope, $http) {
        $scope.videos = [];
        $scope.categorias = [];
        $scope.video = {};

        $scope.getVideos = async function () {
            /**
             * Necesito recuperar las categorias para hacer el select, 
             * esto se podria optimizar con un servicio en el controlador
             */
            await $http({
                method: 'GET',
                url: $scope.host + '/api/categories',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.video = {};
                console.log(response);
                $scope.categorias = response.data.productos;
            })
                .catch(function (error) { console.log(error); })

            console.log($scope.categorias);

            /**
             * Obtencion de los videos
             */
            $http({
                method: 'GET',
                url: $scope.host + '/api/videos',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.video = {};
                console.log(response);
                $scope.videos = response.data.productos;
            })
                .catch(function (error) { console.log(error); })
        };

        $scope.crearVideo = function () {
            console.log('Creando video...');
            // console.log($scope.categorias);
            console.log('El valor de la categoria seleccionada es: ');
            console.log($scope.video.categoria);

            console.log('url previa: ' + $scope.video.url);
            $scope.video.url = $scope.video.url.replace("watch?v=", "embed/");
            console.log('url posterior: ' + $scope.video.url);

            $http({
                method: 'POST',
                url: $scope.host + '/api/videos',
                data: JSON.stringify($scope.video),
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.video = {};
                console.log(response);
                $scope.getVideos();
            })
                .catch(function (error) { console.log(error); })
        };

        $scope.modificarVideo = function () {
            $http({
                method: 'PUT',
                url: $scope.host + '/api/videos/' + $scope.video._id,
                data: JSON.stringify($scope.video),
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.video = {};
                // console.log(response);
                $scope.getVideos();
            }).catch(function (error) {
                console.log(error);
            })
        };
        $scope.borrarVideo = function () {
            console.log('Borrar Video');
            navigator.clipboard.readText()
                .then(text => {

                    const ok = window.confirm("Asegurese de que ha copiado el ID del video correctamente\n" + 
                    "¿Está seguro de que deseas eliminar el video " + text + "?");
                    if (ok) {
                        $http({
                            method: 'DELETE',
                            url: $scope.host + '/api/videos/' + text,
                            headers: {
                                'Content-Type': 'Application/json',
                                'Authorization': 'Bearer ' + $scope.token
                            }
                        }).then(function (response) {
                            $scope.video = {};
                            // console.log(response);
                            $scope.getVideos();
                        }).catch(function (error) {
                            console.log(error);
                        })
                    }
                })
                .catch(err => {
                    console.error('Failed to read clipboard contents: ', err);
                });
        };


        $scope.getVideos();
    })
