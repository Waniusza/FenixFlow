(function () {
    'use strict';
    App.controller('DescriptionController', DescriptionController);
    
    DescriptionController.$inject = ['$scope', 'resourceService', 'APP_CONFIG'];
    
    function DescriptionController($scope, resourceService, APP_CONFIG) {
            $scope.descData = {};
            var dataSource = APP_CONFIG.FILE_PREFIX + "/assets/data/jsons/descrition";
            (function init() {
                console.log("DescriptionController init");
                resourceService.getFileDate(dataSource, 'json', true).then(function(result) {
                    $scope.descData = result;
                });
                console.log("DescriptionController descData", $scope.descData);
            })();
        };
})();