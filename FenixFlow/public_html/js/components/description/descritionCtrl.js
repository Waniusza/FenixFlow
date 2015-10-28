(function () {
    'use strict';
    App.controller('DescriptionController', DescriptionController);
    
    DescriptionController.$inject = ['$scope', 'resourceService'];
    
    function DescriptionController($scope, resourceService) {

            $scope.title = "Description";
            $scope.descData = {};
            var dataSource = "/FenixFlow/assets/data/jsons/descrition.json";
            (function init() {
                console.log("DescriptionController init");
                resourceService.getFileDate(dataSource).then(function(result) {
                    $scope.descData = result;
                });
                console.log("DescriptionController descData", $scope.descData);
            })();
        };
})();