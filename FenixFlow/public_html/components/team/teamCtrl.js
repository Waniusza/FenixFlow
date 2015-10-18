(function () {
    'use strict';
    App.controller('TeamController', TeamController);
    
    TeamController.$inject = ['$scope', 'resourceService'];
    
    function TeamController($scope, resourceService) {

            $scope.title = "Description";
            $scope.teamData = {};
            var dataSource = "/FenixFlow/assets/data/jsons/team.json";
            (function init() {
                console.log("TeamController init");
                resourceService.getFileDate(dataSource).then(function(result) {
                    $scope.teamData = result;
                });
                console.log("TeamController teamData", $scope.teamData);
            })();
        };
})();