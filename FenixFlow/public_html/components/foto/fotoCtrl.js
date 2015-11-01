(function () {
    'use strict';
    App.controller('FotoController', FotoController);

    FotoController.$inject = ['$scope', '$timeout', 'resourceService', 'APP_CONFIG', 'lightboxService'];

    function FotoController($scope, $timeout, resourceService, APP_CONFIG, lightboxService) {

        $scope.title = "Foto";
        $scope.fotoData = {};
        var dataSource = APP_CONFIG.FILE_PREFIX + "/assets/data/jsons/foto.json";
        (function init() {
            console.log("FotoController init");
            resourceService.getFileDate(dataSource).then(function (result) {
                angular.forEach(result.albums, function(album) {
                    album.dest = APP_CONFIG.FILE_PREFIX + album.dest;
                });
                $scope.fotoData = result;
                
                console.log("FotoController fotoData", $scope.fotoData);
                $timeout(lightboxService.getLightbox, 1000);
//                console.log("lightboxService", lightboxService.getLightbox);

            });
        })();
    }
    ;
})();