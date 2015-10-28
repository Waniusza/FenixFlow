(function () {
    'use strict';
    App.controller('FotoController', FotoController);

    FotoController.$inject = ['$scope', 'resourceService'];

    function FotoController($scope, resourceService) {

        $scope.title = "Foto";
        $scope.fotoData = {};
        var dataSource = "/FenixFlow/assets/data/jsons/foto.json";
        (function init() {
            console.log("FotoController init");
            resourceService.getFileDate(dataSource).then(function (result) {
                $scope.fotoData = result;
                console.log("FotoController fotoData", $scope.fotoData);
            });
        })();
    }
    ;
})();