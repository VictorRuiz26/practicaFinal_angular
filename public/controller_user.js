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
        $scope.token =  window.sessionStorage.getItem("tokenUser");

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
                    let categoriaArray = new Array();
                    $scope.array[indice.nombre] = categoriaArray 
                });
            })
                .catch(function (error) {  window.location.href="login.html" })

          
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
                let cats =  response.data.productos;
                cats.forEach( indice => {
                    if ($scope.array[indice.categoria.nombre] != null) $scope.array[indice.categoria.nombre].push(indice.url); 
                });
            })
                .catch(function (error) {   window.location.href="login.html"})
        };

        $scope.getVideos();
    })
