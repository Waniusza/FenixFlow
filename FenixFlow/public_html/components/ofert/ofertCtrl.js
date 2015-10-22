(function () {
    'use strict';
    App.controller('OfertController', OfertController);

    OfertController.$inject = ['$scope', 'resourceService'];

    function OfertController($scope, resourceService) {

        $scope.title = "Oferta";
        $scope.ofertData = {};
        var dataSource = "/FenixFlow/assets/data/jsons/ofert.json";
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