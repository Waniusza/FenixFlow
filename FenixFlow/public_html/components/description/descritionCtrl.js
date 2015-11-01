(function () {
    'use strict';
    App.controller('DescriptionController', DescriptionController);
    
    DescriptionController.$inject = ['$scope', 'resourceService', 'APP_CONFIG'];
    
    function DescriptionController($scope, resourceService, APP_CONFIG) {

            $scope.title = "Description";
            $scope.descData = {};
            var dataSource = APP_CONFIG.FILE_PREFIX + "/assets/data/jsons/descrition.json";
            (function init() {
                console.log("DescriptionController init");
                resourceService.getFileDate(dataSource).then(function(result) {
                    $scope.descData = result;
                });
                console.log("DescriptionController descData", $scope.descData);
            })();
        };
})();