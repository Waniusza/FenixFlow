(function () {
    'use strict';
    App.controller('TeamController', TeamController);

    TeamController.$inject = ['$scope', 'resourceService', 'APP_CONFIG'];

    function TeamController($scope, resourceService, APP_CONFIG) {

        $scope.title = "Team";
        $scope.teamData = {};
        var dataSource = APP_CONFIG.FILE_PREFIX + "/assets/data/jsons/team.json";
        (function init() {
            console.log("TeamController init");
            resourceService.getFileDate(dataSource).then(function (result) {
                angular.forEach(result, function (person) {
                    person.data.imageName = APP_CONFIG.FILE_PREFIX + person.data.imageName;
                });
                $scope.teamData = result;
            });
            console.log("TeamController teamData", $scope.teamData);
        })();
    }
    ;
})();