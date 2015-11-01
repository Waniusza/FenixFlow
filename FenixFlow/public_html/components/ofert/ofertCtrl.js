(function () {
    'use strict';
    App.controller('OfertController', OfertController);

    OfertController.$inject = ['$scope', 'resourceService', 'APP_CONFIG'];

    function OfertController($scope, resourceService, APP_CONFIG) {

        $scope.title = "Oferta";
        $scope.ofertData = {};
        var dataSource = APP_CONFIG.FILE_PREFIX +"/assets/data/jsons/ofert.json";
        (function init() {
            console.log("OfertController init");
            resourceService.getFileDate(dataSource).then(function (result) {
                $scope.ofertData = result;
                console.log("OfertController ofertData", $scope.ofertData);
            });
        })();
    }
    ;
})();