(function () {
    'use strict';
    App.controller('FotoController', FotoController);

    FotoController.$inject = ['$scope', '$timeout', 'resourceService', 'APP_CONFIG', 'lightboxService'];
/*
 * https://developers.google.com/youtube/player_parameters#Parameters
 * https://github.com/brandly/angular-youtube-embed
 */
    function FotoController($scope, $timeout, resourceService, APP_CONFIG, lightboxService) {

        $scope.title = "Foto";
        $scope.fotoData = {};
        var dataSource = APP_CONFIG.FILE_PREFIX + "/assets/data/jsons/foto";
        (function init() {
            console.log("FotoController init");
            resourceService.getFileDate(dataSource, 'json', true).then(function (result) {
                angular.forEach(result.albums, function (album) {
                    if (album.movie === false) {
                        album.dest = APP_CONFIG.FILE_PREFIX + album.dest;
                    }
                });
                $scope.fotoData = result;

                console.log("FotoController fotoData", $scope.fotoData);

            });
        })();
    }
    ;
})();