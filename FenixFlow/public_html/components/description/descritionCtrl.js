(function () {
    'use strict';
    App.controller('DescriptionController', DescriptionController);

    DescriptionController.$inject = ['$scope', 'resourceService', 'APP_CONFIG'];

    function DescriptionController($scope, resourceService, APP_CONFIG) {
        $scope.descData = {};
        var dataSource = APP_CONFIG.FILE_PREFIX + "/assets/data/jsons/descrition";
        (function init() {
            console.log("DescriptionController init");
            resourceService.getFileDate(dataSource, 'json', true).then(function (result) {
                $scope.descData = result;
            });
            console.log("DescriptionController descData", $scope.descData);
        })();



        $scope.oneAtATime = true;

        $scope.groups = [
            {
                title: 'Dynamic Group Header - 1',
                content: 'Dynamic Group Body - 1'
            },
            {
                title: 'Dynamic Group Header - 2',
                content: 'Dynamic Group Body - 2'
            }
        ];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function () {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

    }
    ;
})();