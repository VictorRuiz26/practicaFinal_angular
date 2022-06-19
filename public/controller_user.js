'use strict';

// al angula.module se le pone el nombre del módulo y como segundo argumento las dependencias de otros módulos de angular
/**
 * controller es otro objeto que se crea, contiene el scope que se encarga de cambiar las vistas y demás
 * Se le pasa como segundo parámetro una función a la que angular le pasará un objeto ($scope) que es 
 * donde se encargará de colocar los objetos del modelo que se hagan referencia en la vista
 */
angular.module("Videos", []).filter('trusted', ['$sce', function ($sce) {
    return $sce.trustAsResourceUrl;
 }])
    .controller("main_ctlr", function ($scope) {

        $scope.host = "http://localhost:8080";
        $scope.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmFmM2VkZmYxZTk5MTBlNzJkOWYwZjciLCJpYXQiOjE2NTU2NTIxMTQsImV4cCI6MTY1NTY3MDExNH0.EzonNuTtLCBZyapTgVp38mU4rcgTbYRj_8sC2y1v4OM";

        $scope.cerrarSesion = function () {
            console.log('ESTAMOS CON ANGULAR');
            sessionStorage.clear()
            // sessionStorage.removeItem('tokenUser');
            window.location.href = "login.html";
        }
    })
    .controller("videos", function ($scope, $http) {
        
        $scope.array = {};

        $scope.getVideos = async function () {
            /**
             * Necesito recuperar las categorias para hacer el select, 
             * esto se podria optimizar con un servicio en el controlador
             */
            await $http({
                method: 'GET',
                url: $scope.host + '/api/categories/padre',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.video = {};
                let cats =  response.data.productos;
                cats.forEach( indice => {
                    console.log(indice.nombre);
                    let categoriaArray = new Array();
                    $scope.array[indice.nombre] = categoriaArray 
                });
            })
                .catch(function (error) { console.log(error); })

            console.log($scope.categorias);

            /**
             * Obtencion de los videos
             */
            $http({
                method: 'GET',
                url: $scope.host + '/api/videos/padre',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + $scope.token
                }
            }).then(function (response) {
                $scope.video = {};
                console.log(response);
                let cats =  response.data.productos;
                console.log(cats);
                cats.forEach( indice => {
                    console.log(indice.categoria.nombre);
                    if ($scope.array[indice.categoria.nombre] != null) $scope.array[indice.categoria.nombre].push(indice.url); 
                });
                console.log( $scope.array);
            })
                .catch(function (error) { console.log(error); })
        };

        $scope.getVideos();
    })
